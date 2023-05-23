import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ArticleTable from "./articleTable";
import Pagination from "./common/pagination";
import { ToastContainer } from "react-toastify";
import Select from "react-select";
import "../index.css";

function Article({
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  sortColumn,
  user,
  query,
  setQuery,
  getPagedData,
  onDelete,
  onAdd,
  onEdit,
  onPageChange,
  onSort,
  onCategorySelect,
  categorys,
}) {
  const { totalCount, data: articles } = getPagedData();

  const pageSizeOptions = [
    {
      value: 6,
      label: "max. 6 Artikel pro Seite",
    },
    {
      value: 10,
      label: "max. 10 Artikel pro Seite",
    },
    {
      value: 15,
      label: "max. 15 Artikel pro Seite",
    },
    {
      value: 20,
      label: "max. 20 Artikel pro Seite",
    },
    {
      value: 9999,
      label: "Alle Artikel anzeigen",
    },
  ];

  const sortOptions = [
    {
      label: "Artikelbezeichnung",
      value: "nameAsc",
      path: "name",
      order: "asc",
      icon: <i className="bi bi-caret-up-fill"></i>,
    },
    {
      label: "Kategorie",
      value: "categoryAsc",
      path: "category",
      order: "asc",
      icon: <i className="bi bi-caret-up-fill"></i>,
    },
    {
      label: "Preis",
      value: "priceAsc",
      path: "price",
      order: "asc",
      icon: <i className="bi bi-caret-up-fill"></i>,
    },
    {
      label: "Artikelbezeichnung",
      value: "nameDesc",
      path: "name",
      order: "desc",
      icon: <i className="bi bi-caret-down-fill"></i>,
    },

    {
      label: "Kategorie",
      value: "categoryDesc",
      path: "category",
      order: "desc",
      icon: <i className="bi bi-caret-down-fill"></i>,
    },

    {
      label: "Preis",
      value: "priceDesc",
      path: "price",
      order: "desc",
      icon: <i className="bi bi-caret-down-fill"></i>,
    },
  ];

  const preselectedMaxArticles = localStorage.getItem("max-items")
    ? Number(localStorage.getItem("max-items"))
    : pageSize;

  useEffect(() => {
    setPageSize(preselectedMaxArticles ? preselectedMaxArticles : pageSize);
  }, [pageSize, preselectedMaxArticles, setPageSize]);

  const handleChange = (e) => {
    setPageSize(Number(e.value));
    localStorage.setItem("max-items", e.value);
    setCurrentPage(1);
  };

  return (
    <div className="row ">
      <div className="col">
        {user.groupname === "admin" ? (
          <div className="row g-3 g-lg-4">
            <div className="col-lg">
              <Link to="/article/new" className="btn btn-outline-danger w-100">
                Artikel hinzufügen
              </Link>
            </div>
            <div className="col-lg">
              <Link to="/category/new" className="btn btn-outline-danger w-100">
                Kategorie hinzufügen
              </Link>
            </div>
            <div className="col-lg">
              <Link
                to="/category/edit"
                className="btn btn-outline-danger w-100"
              >
                Kategorien bearbeiten/löschen
              </Link>
            </div>
          </div>
        ) : null}

        <div>
          <div className="row justify-content-between mt-3">
            <div className="col-md">
              <Select
                options={pageSizeOptions}
                onChange={handleChange}
                placeholder="Auswählen"
                defaultValue={
                  pageSizeOptions.filter((option) => {
                    return option.value === preselectedMaxArticles;
                  })[0]
                }
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#d32a2a",
                    primary25: "#FF9898",
                  },
                })}
              />
            </div>
            <div className="col-md mt-3 mt-md-0">
              <Select
                options={categorys}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.name}
                isMulti
                onChange={(e) => onCategorySelect(e)}
                placeholder="Alle Kategorien"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#d32a2a",
                    primary25: "#FF9898",
                  },
                })}
              />
            </div>
            <div className="col-md mt-3 mt-md-0">
              <Select
                placeholder="Sortieren"
                options={sortOptions}
                getOptionLabel={(e) => (
                  <div>
                    {e.icon}
                    <span style={{ marginLeft: 5 }}>{e.label}</span>
                  </div>
                )}
                onChange={(e) => {
                  onSort(e);
                }}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#d32a2a",
                    primary25: "#FF9898",
                  },
                })}
              />
            </div>
          </div>
          <div className="row justify-content-between mt-3 mb-5">
            <div className="col-12 col-lg-8">
              <input
                value={query}
                onChange={setQuery}
                type="search"
                className="form-control"
                placeholder="Suche Artikelbezeichnung"
                // style={{
                //   border: "5px solid black",
                // }}
              />
            </div>
          </div>

          <ArticleTable
            articles={articles}
            onDelete={onDelete}
            onAdd={onAdd}
            onEdit={onEdit}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      <ToastContainer className="mt-5" />
    </div>
  );
}

export default Article;
