import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import ShoppingcartTable from "./shoppingcartTable";
import Accounting from "./accounting";
import Modal from "./common/modal";
import { saveOrder } from "../services/shoppingcartService";

const Shoppingcart = ({ articles, onIncrease, onRemove, user, onOrder }) => {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState([
    { id: 1, area: "", account: "", percent: 100 },
  ]);
  const [orderDone, setOrderDone] = useState(false);
  const [orderDoneResponse, setOrderDoneResponse] = useState();
  const [modalTriggered, setModalTriggered] = useState(false);
  const [secModalTriggered, setSecModalTriggered] = useState(false);

  const handleModalTrigger = () => setModalTriggered(!modalTriggered);
  const handleSecModalTrigger = () => setSecModalTriggered(!secModalTriggered);

  const getSum = () => {
    let sum = 0;

    articles.map((obj) => {
      sum += obj.amount * obj.price;
    });

    return sum;
  };

  const getTotalPercantage = () => {
    let value = 0;

    for (let i = 0; i < selected.length; i++) {
      value = value + selected[i].percent;
    }

    return value;
  };

  const totalPercantage = getTotalPercantage();

  const setPercentage = () => {
    getTotalPercantage();
    if (totalPercantage < 100) addToSelected();
    else if (totalPercantage > 100)
      toast.error("Gesamtprozent ist über 100%, bitte reduzieren");
    else if (totalPercantage === 100)
      toast.error("Gesamtprozent ist bereits 100%");
  };

  const addToSelected = () => {
    const lastItem = selected[selected.length - 1];
    const newObject = {
      id: lastItem.id + 1,
      area: "",
      account: "",
      percent: 100 - totalPercantage,
    };

    const newState = [...selected, newObject];
    setSelected(newState);
  };

  const handleAccountingChange = (newValue, name, id) => {
    const newState = selected.map((obj) => {
      if (obj.id === id) {
        let newObj = { ...obj };
        newObj[name] = newValue;

        return newObj;
      }

      return obj;
    });
    setSelected(() => newState);
  };

  const handleRowDelete = () => {
    const origState = [...selected];
    const deleted = origState.pop();
    origState[origState.length - 1]["percent"] += deleted.percent;

    setSelected(origState);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleOrder = async (articles) => {
    handleModalTrigger();
    handleSecModalTrigger();
    const origArticles = articles;

    onOrder([]);

    try {
      let response = await saveOrder(
        articles,
        value,
        selected,
        user,
        getSum()
      ).catch((e) => {
        throw e;
      });
      setOrderDoneResponse(response.data);
      setOrderDone(true);
    } catch (err) {
      if (err) onOrder(origArticles);
      return;
    }
  };

  const totalCount = articles.length;

  const emptyDropdowns = () => {
    const value = selected.map((obj) => {
      if (obj.area === "" || obj.account === "") return false;
    });
    if (value.find((e) => e === false) === false) return false;
    return true;
  };

  let btnClass = "btn btn-outline-danger ";
  if (totalPercantage !== 100 || !emptyDropdowns()) {
    btnClass += "disabled";
  }

  return (
    <div>
      <ShoppingcartTable
        articles={articles}
        onIncrease={onIncrease}
        onRemove={onRemove}
      />
      {totalCount === 0 ? null : (
        <div className="container">
          <p>Weitere Informationen:</p>

          <div className="container form-floating mb-4">
            <textarea
              className="form-control pt-2"
              style={{ height: "100px" }}
              value={value}
              onChange={handleChange}
            ></textarea>
            <label className="ps-4">
              {!value &&
                "z. B. genauer Einsatzstandort, Ansprechpartner für Auslieferung, etc."}
            </label>
          </div>

          <p>Kostenstelle welcher die Bestellung angehört:</p>

          {selected.map((obj) => (
            <div className="mb-4" key={obj.id}>
              <Accounting
                objId={obj.id}
                accountingLength={selected.length}
                selectedPercantage={obj.percent}
                selectedArea={obj.area}
                selectedAccount={obj.account}
                onAccountingChange={handleAccountingChange}
                onRowDelete={handleRowDelete}
                onSetPercentage={setPercentage}
              />
              {obj.id < selected.length ? <hr></hr> : null}
            </div>
          ))}

          <div className="mt-2 d-md-flex justify-content-md-end">
            <button className={btnClass} onClick={handleModalTrigger}>
              Bestellung übermitteln
            </button>
          </div>
        </div>
      )}
      <Modal
        modalTitle="Sicher?"
        modalBody={
          <div>
            <div className="mb-3">
              <span>
                Bestellung verbindlich übermitteln? Folgende Artikel werden
                kostenpflichtig auf die angegebene(n) Kostenstelllen verbucht:
              </span>
            </div>
            <ul>
              {articles.map((obj) => {
                return <li key={obj._id}>{`${obj.amount}x ${obj.name}`}</li>;
              })}
            </ul>
            <span>{`Gesamtbetrag: ${getSum()} €`}</span>
          </div>
        }
        onModalTriggered={handleModalTrigger}
        modalTriggered={modalTriggered}
        onSafe={() => handleOrder(articles)}
        safeButton="Bestellung übermitteln"
      />
      <Modal
        modalTitle="Ihre Bestellung:"
        modalBody={
          <div>
            {!orderDone ? (
              <div className="mb-3 d-flex justify-content-center">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Lädt...</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-3 d-flex justify-content-center">
                  <i
                    className="bi bi-check-lg"
                    style={{
                      fontSize: "3rem",
                      color: "red",
                    }}
                  ></i>
                </div>
                <br />
                <span>
                  Bestellung erfolgreich übermittelt!
                  <br />
                </span>
              </div>
            )}
          </div>
        }
        onModalTriggered={handleSecModalTrigger}
        modalTriggered={secModalTriggered}
      />
      <ToastContainer className="mt-5" />
    </div>
  );
};

export default Shoppingcart;
