import React from "react";
import { Link } from "react-router-dom";

const Card = ({
  _id,
  imgSrc,
  title,
  category,
  price,
  description,
  onAdd,
  onDelete,
  onEdit,
  groupname,
}) => {
  return (
    <div className="card mb-3 w-100">
      <Link to={`/article/details/${_id}`}>
        <img
          src={imgSrc}
          className="card-img"
          alt={title}
          style={{
            height: "250px",
            padding: ".75em",
            objectFit: "contain",
          }}
        />
      </Link>

      <div className="card-header" style={{ backgroundColor: "white" }}>
        <h5 className="card-title mb-0 mt-2">{title}</h5>
      </div>
      <div className="card-body">
        <p className="card-text mb-1" style={{ fontWeight: "bold" }}>
          {price} €
        </p>
        <p className="card-text m-0">Kategorie: {category}</p>
        <p className="card-text m-0">Info: {description}</p>
      </div>

      <div className="m-3">
        {groupname === "admin" && (
          <div className="row mb-4">
            <div className="col d-grid ">
              <button
                type="button"
                className="btn btn-outline-secondary d-flex justify-content-center gap-2"
                onClick={onEdit}
              >
                <i className="bi bi-pencil"></i>
                <div className="d-none d-sm-block">Artikel bearbeiten</div>
                <div className="d-sm-none">bearbeiten</div>
              </button>
            </div>
            <div className="col d-grid">
              <button
                type="button"
                className="btn btn-outline-danger d-flex justify-content-center gap-2"
                onClick={onDelete}
              >
                <i className="bi bi-trash"></i>
                <div className="d-none d-sm-block">Artikel löschen</div>
                <div className="d-sm-none">löschen</div>
              </button>
            </div>
          </div>
        )}
        <div className="col d-grid">
          <button
            type="button"
            className="btn btn-outline-dark d-flex justify-content-center gap-2"
            onClick={onAdd}
          >
            <i className="bi bi-cart-plus"></i>
            <div>zum Warenkorb hinzufügen</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
