import React from "react";

function shoppingcartTable({ articles, onIncrease, onRemove }) {
  const totalCount = articles.length;
  return (
    <div>
      {totalCount === 0 ? (
        <p className="mx-auto d-block">
          Es befinden sich keine Artikel im Warenkorb.
        </p>
      ) : (
        <div>
          <p>Sie haben {totalCount} Artikel im Warenkorb</p>
          {articles.map((article) => (
            <div className="card text-bg-dark mb-3" key={article._id}>
              <div className="row g-0">
                <div className="col-sm-4 col-md-3 d-flex justify-content-center align-items-center border-end ">
                  <img
                    alt=""
                    height="125"
                    className="p-2"
                    src={article.src}
                  ></img>
                </div>
                <div className="col-sm-8 col-md-9">
                  <div className="card-header bg-transparent border-secondary-emphasis d-flex justify-content-between align-items-center">
                    <h6 className="m-0">{article.name}</h6>
                    <button
                      onClick={() => onRemove(article)}
                      className="btn btn-outline-danger"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="card-text">
                      Einzelpreis: {article.price} €
                    </div>
                    <div className="card-text">
                      Gesamtpreis: {article.amount * article.price} €
                    </div>
                  </div>
                  <div className="card-footer bg-transparent border-secondary-emphasis d-flex">
                    <div className="card-text">
                      <button
                        onClick={() => onIncrease(article, "increase")}
                        className="btn btn-outline-secondary btn"
                      >
                        <i className="bi bi-arrow-up"></i>
                      </button>
                      <button className="btn btn-outline-dark btn disabled">
                        {article.amount} x
                      </button>
                      <button
                        onClick={() => onIncrease(article, "decrease")}
                        className="btn btn-outline-secondary btn"
                      >
                        <i className="bi bi-arrow-down"> </i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default shoppingcartTable;
