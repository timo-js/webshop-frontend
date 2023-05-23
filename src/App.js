import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { paginate } from "./utils/paginate";
import { getCategorys } from "./services/categoryService";
import { getArticles, deleteArticle } from "./services/articleService";

import NavBar from "./components/navBar";
import Article from "./components/article";
import ArticleForm from "./components/articleForm";
import ArticleDetails from "./components/articleDetails";
import CategoryForm from "./components/categoryForm";
import EditCategoryForm from "./components/editCategoryForm";
import ShoppingCart from "./components/shoppingcart";

import LoginForm from "./components/loginForm";
import NotFound from "./components/notFound";

import config from "./config.js";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [pageSize, setPageSize] = useState(config.pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });
  const [cartArticles, setCartArticles] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [user, setUser] = useState({
    loggedIn: "",
    username: "",
    groupname: "",
    mail: "",
    displayName: "",
  });

  const navigate = useNavigate();

  const getSessionStorage = () => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    const username = sessionStorage.getItem("username");
    const groupname = sessionStorage.getItem("groupname");
    const mail = sessionStorage.getItem("mail");
    const displayName = sessionStorage.getItem("displayName");

    setUser({ loggedIn, username, groupname, mail, displayName });
  };

  useEffect(() => {
    getSessionStorage();

    async function fetchCategorys() {
      const { data } = await getCategorys();
      setCategorys(data);
    }
    fetchCategorys();

    async function fetchArticles() {
      const { data: newArticles } = await getArticles();
      setArticles(newArticles);
    }
    fetchArticles();
  }, []);

  //handler for navbar

  const handleLogin = async () => {
    getSessionStorage();
  };

  const handleLogout = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("loggedIn", false);
    sessionStorage.setItem("username", "");
    sessionStorage.setItem("groupname", "");
    sessionStorage.setItem("mail", "");
    sessionStorage.setItem("displayName", "");

    setUser({
      username: "",
      loggedIn: false,
      groupname: "",
      displayName: "",
      mail: "",
    });

    navigate("/login");
  };

  //handler for article page
  const [query, setQuery] = useState("");

  const filteredArticles = articles.filter((article) => {
    return article.name.toLowerCase().includes(query.toLowerCase());
  });

  const handleDelete = async (article) => {
    const originalArticles = articles;
    const newArticles = originalArticles.filter((a) => a._id !== article._id);
    setArticles(newArticles);

    try {
      await deleteArticle(article._id);
      if (originalArticles.length - 1 === pageSize) setCurrentPage(1);
    } catch (err) {
      if (err.response && err.response.status === 404)
        alert("Dieser Artikel wurde bereits gelöscht!");

      setArticles(originalArticles);
    }
  };

  const handleAdd = (article) => {
    const origCart = [...cartArticles];

    if (!origCart.find((x) => x._id === article._id)) {
      origCart.push(article);

      let index = origCart.findIndex((e) => e._id === article._id);

      origCart[index]["amount"] = 1;
      setCartArticles(origCart);
      toast.error(`"${article.name}" wurde dem Warenkorb hinzugefügt!`, {
        icon: false,
      });
    } else toast.error(`"${article.name}" ist bereits im Warenkorb!`);
  };

  const handleEdit = (article) => {
    navigate(`/article/${article._id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategorySelect = (categories) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const getPagedData = () => {
    let filtered = [];

    selectedCategories.length > 0
      ? _.forEach(filteredArticles, (article) => {
          _.forEach(selectedCategories, (category) => {
            if (article.category === category.name) {
              filtered.push(article);
            }
          });
        })
      : (filtered = filteredArticles);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const pginatedArticles = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: pginatedArticles };
  };

  //handler for shoppingcart page

  const handleIncrease = (article, op) => {
    const origCart = [...cartArticles];
    let index = cartArticles.findIndex((e) => e._id === article._id);

    const value = origCart[index].amount;

    if (op === "increase") origCart[index]["amount"]++;
    else if (op === "decrease" && value > 1) origCart[index]["amount"]--;
    setCartArticles(origCart);
  };

  const handleRemove = (article) => {
    const origCart = cartArticles;
    const cart = origCart.filter((a) => a._id !== article._id);
    setCartArticles(cart);
  };

  const handleOrder = (articles) => {
    setCartArticles(articles);
  };

  return (
    <React.Fragment>
      <NavBar
        counter={cartArticles.length}
        user={user}
        onLogout={handleLogout}
      />
      <main className="content container">
        <Routes>
          <Route path="/category/new" element={<CategoryForm />} />
          <Route
            path="/category/edit"
            element={<EditCategoryForm categorys={categorys} />}
          />
          <Route path="/article/new" element={<ArticleForm />} />
          <Route path="/article/:id" element={<ArticleForm />} />
          <Route
            path="/article/details/:id"
            element={<ArticleDetails onAdd={handleAdd} />}
          />
          <Route
            path="/article"
            element={
              <Article
                articles={articles}
                categorys={categorys}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                sortColumn={sortColumn}
                // selectedCategory={selectedCategory}
                onDelete={handleDelete}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onPageChange={handlePageChange}
                onCategorySelect={handleCategorySelect}
                onSort={handleSort}
                getPagedData={getPagedData}
                user={user}
                query={query}
                setQuery={(e) => setQuery(e.target.value)}
              />
            }
          />
          <Route
            path="/shoppingcart"
            element={
              <ShoppingCart
                articles={cartArticles}
                onIncrease={handleIncrease}
                onRemove={handleRemove}
                onOrder={handleOrder}
                user={user}
              />
            }
          />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/*/*" element={<NotFound />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </main>
    </React.Fragment>
  );
};

export default App;
