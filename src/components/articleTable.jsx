import React, { useState } from "react";
import Modal from "./common/modal";
import Card from "./common/card";

const ArticleTable = ({ articles, onDelete, onAdd, onEdit }) => {
  const [modalTriggered, setModalTriggered] = useState(false);
  const [currentArticle, setCurrentArticle] = useState();

  const handleModalTrigger = (article) => {
    setModalTriggered(!modalTriggered);
    setCurrentArticle(article);
  };

  const groupname = sessionStorage.getItem("groupname");

  return (
    <React.Fragment>
      <div className="row">
        {articles.map((article) => {
          return (
            <div
              className="col-lg-6 d-flex align-items-stretch"
              key={article._id}
            >
              <Card
                _id={article._id}
                onAdd={() => onAdd(article)}
                onDelete={() => handleModalTrigger(article)}
                onEdit={() => onEdit(article)}
                imgSrc={article.src}
                title={article.name}
                category={article.category}
                price={article.price}
                description={article.description}
                groupname={groupname}
              />
            </div>
          );
        })}
      </div>
      <Modal
        modalTitle="Sicher?"
        modalBody={`Löscht "${
          currentArticle ? currentArticle.name : ""
        }" endgültig aus der Datenbank`}
        onModalTriggered={handleModalTrigger}
        modalTriggered={modalTriggered}
        onSafe={() => onDelete(currentArticle) && handleModalTrigger()}
        safeButton="löschen"
      />
    </React.Fragment>
  );
};

export default ArticleTable;
