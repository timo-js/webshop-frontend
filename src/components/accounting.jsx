import React, { useEffect, useState } from "react";
import Dropdown from "./common/dropdown";
import Input from "./common/input";
import { getAccounting } from "../services/accountingService";

const Accounting = ({
  selectedArea,
  selectedAccount,
  selectedPercantage,
  onAccountingChange,
  onRowDelete,
  onSetPercentage,
  objId,
  accountingLength,
}) => {
  const [area, setArea] = useState([]);
  const [account, setAccount] = useState([]);

  useEffect(() => {
    async function fetchAccountingData() {
      const { data } = await getAccounting();
      let newArea = [{ label: "", value: "" }];
      let newAccount = [{ label: "", value: "" }];

      for (let i = 0; i < data.length; i++) {
        if (!newArea.find((e) => e.value === data[i].FB_Bezeichnung)) {
          newArea.push({
            label: data[i].FB_Bezeichnung,
            value: data[i].FB_Bezeichnung,
          });
        }

        if (
          !newAccount.find((e) => e.value === data[i].KST) &&
          data[i].FB_Bezeichnung === selectedArea
        ) {
          newAccount.push({
            label: data[i].KST,
            value: data[i].KST,
          });
        }
      }
      setArea(newArea);
      setAccount(newAccount);
    }
    fetchAccountingData();
  }, [selectedArea]);

  const handleFocus = (event) => event.target.select();

  return (
    <div className="container">
      <div className="row justify-content-start">
        <div className="col-12 col-md-4">
          <Dropdown
            label="Geschäftsbereich: "
            options={area}
            value={selectedArea}
            onChange={(e) => onAccountingChange(e.target.value, "area", objId)}
          />
        </div>
        <div className="col-12 col-md-4">
          <Dropdown
            label="Kostenstelle: "
            options={account}
            value={selectedAccount}
            onChange={(e) =>
              onAccountingChange(e.target.value, "account", objId)
            }
          />
        </div>
        <div className="col-12 col-md-4">
          <div className="row">
            <div className="col-10 col-md-9 col-lg-10 pe-0">
              <Input
                name="percent"
                type="number"
                value={selectedPercantage}
                label="zu Prozent:"
                onFocus={handleFocus}
                onChange={(e) =>
                  onAccountingChange(Number(e.target.value), "percent", objId)
                }
              ></Input>
            </div>
            <div className="col-2 col-md-3 col-lg-2 mt-4 ps-0 ">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={onSetPercentage}
              >
                <i className="bi bi-check-lg"></i>
              </button>
            </div>
          </div>
        </div>
        {accountingLength > 1 && accountingLength === objId ? (
          <div className="col-1">
            <button
              onClick={onRowDelete}
              type="button"
              className="btn btn-outline-danger mt-4"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Accounting;
