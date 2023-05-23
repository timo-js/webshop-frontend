import React, { Component } from "react";

class OldShoppingcartTable extends Component {
  render() {
    const { articles, onIncrease, onRemove } = this.props;
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
            <table className="table align-middle mb-4">
              <thead>
                <tr>
                  <th></th>
                  <th>Artikelbezeichnung</th>
                  <th>Einzelpreis</th>
                  <th>Gesamtpreis</th>
                  <th>Anzahl</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <React.Fragment key={article._id}>
                    <tr>
                      <td>
                        <img alt="" height="125" src={article.src}></img>
                      </td>
                      <td>{article.name}</td>
                      <td>{article.price} €</td>
                      <td>{article.amount * article.price} €</td>
                      <td>
                        {article.amount + " "}
                        <button
                          onClick={() => onIncrease(article, "increase")}
                          className="btn btn-outline-secondary btn-sm"
                        >
                          <i className="bi bi-arrow-up"></i>
                        </button>{" "}
                        <button
                          onClick={() => onIncrease(article, "decrease")}
                          className="btn btn-outline-secondary btn-sm"
                        >
                          <i className="bi bi-arrow-down"> </i>
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => onRemove(article)}
                          className="btn btn-outline-danger"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default OldShoppingcartTable;
