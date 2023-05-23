import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticle } from "../services/articleService";

const ArticleDetails = (props) => {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    src: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id === undefined) return;

    async function fetchData() {
      try {
        const article = await getArticle(id);
        setData(article.data);
      } catch {
        alert("Achtung, Artikel nicht mehr in der Datenbank zu finden!");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <img
            src={data.src}
            className="img-thumbnail"
            width="600"
            alt=""
          ></img>
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col">
              <h3>{data.name}</h3>
            </div>
            <div className="col">
              <h4 className="text-end">{data.price} €</h4>
            </div>
          </div>

          <hr></hr>
          <h4>
            Info zu diesem Artikel: <br />
            <br /> {data.description}
          </h4>
          <div className="row pt-5">
            <div className="col">
              <button
                className="btn btn-outline-danger"
                onClick={() => navigate("/article")}
              >
                <i className="bi bi-arrow-left"></i> zurück
              </button>
            </div>
            <div className="col text-end">
              <button
                onClick={() => props.onAdd(data)}
                type="button"
                className="btn btn-outline-dark"
              >
                <i className="bi bi-cart4"></i> hinzufügen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
