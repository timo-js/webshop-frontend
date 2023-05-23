import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "./common/select";
import Input from "./common/input";
import Modal from "./common/modal";
import { deleteCategory, editCategory } from "../services/categoryService";

function EditCategoryForm({ categorys }) {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState();
  const [inputValue, setInputValue] = useState();

  const [modalTriggered, setModalTriggered] = useState(false);
  const [secModalTriggered, setSecModalTriggered] = useState(false);

  const handleModalTrigger = () => setModalTriggered(!modalTriggered);
  const handleSecModalTrigger = () => setSecModalTriggered(!secModalTriggered);

  const getId = (value) => {
    const found = categorys.find((element) => element.name === value);
    return found._id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = getId(selectedCategory);

    try {
      await editCategory(id, inputValue);
    } catch (err) {
      alert(err);
    }

    handleSecModalTrigger();
    navigate("/article");
  };

  const handleDelete = () => {
    const id = getId(selectedCategory);
    deleteCategory(id);

    handleModalTrigger();
    navigate("/article");
  };

  const selectCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const setInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Select
          label="Kategorie auswählen:"
          name="öffnen"
          options={categorys}
          onChange={selectCategory}
        />

        <Input label="Neuer Name: " onChange={setInput} />
        <div className="container-flex mt-4">
          <div className="row">
            <div className="col 6">
              <button
                type="button"
                onClick={handleSecModalTrigger}
                className={`btn btn-outline-danger ${
                  !selectedCategory || !inputValue ? `disabled` : null
                }`}
              >
                Kategorie ändern
              </button>
            </div>
            <div className="col 6">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  type="button"
                  onClick={handleModalTrigger}
                  className={`btn btn-outline-secondary ${
                    !selectedCategory || inputValue ? `disabled` : null
                  }`}
                >
                  Kategorie löschen
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Modal
        modalTitle="Kategorie löschen?"
        modalBody={`Löscht "${selectedCategory}" dauerhaft aus der Datenbank! Denk daran die Webseite zu refreshen um die Änderung wirksam zu machen!`}
        onModalTriggered={handleModalTrigger}
        modalTriggered={modalTriggered}
        onSafe={handleDelete}
        safeButton="Kategorie löschen"
      />
      <Modal
        modalTitle="Kategorie bearbeiten?"
        modalBody={`Ändert "${selectedCategory}" in der Datenbank zu: "${inputValue}" Denk daran die Webseite zu refreshen um die Änderung wirksam zu machen!`}
        onModalTriggered={handleSecModalTrigger}
        modalTriggered={secModalTriggered}
        onSafe={handleSubmit}
        safeButton="Kategorie ändern"
      />
    </div>
  );
}

export default EditCategoryForm;
