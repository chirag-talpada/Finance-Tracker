import React, { useState } from "react";
import "./TableCard.css";
import { useNavigate } from "react-router-dom";

import {sortingData} from "../../../../utils/sorting/index";

const TableCard = ({ tableHeader, tableBody }) => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState(tableBody);

  const initialValues = {
    transactionDate: 1,
    monthYear: 1,
    transactionType: 1,
    fromAccount: 1,
    toAccount: 1,
    amount: 1,
    notes: 1,
  };

  const [toggleSort, setToggleSort] = useState(initialValues);

  const viewCard = (id) => {
    navigate(`/transactions/${id}`);
  };

  const getIntialData=()=>{
    return tableBody
  }

  const sortColumn = (column) => {
    sortingData(column,toggleSort,getIntialData,tableData,setToggleSort,setTableData);
  };

  return (
    <div>
      <div className="group-table-div">
        <span className="group-table-title">{tableHeader}</span>
      </div>
      <table className="group-table-card">
        <thead>
          <tr>
            <td>ID</td>
            <td>
              <span
                className="tab-sort-btn"
                onClick={() => {
                  sortColumn("transactionDate");
                }}
              >
                Trasaction Date
              </span>
            </td>
            <td>
              <span
                className="tab-sort-btn"
                onClick={() => {
                  sortColumn("monthYear");
                }}
              >
                Month Year
              </span>
            </td>
            <td>
              <span
                className="tab-sort-btn"
                onClick={() => {
                  sortColumn("transactionType");
                }}
              >
                Transaction Type
              </span>
            </td>
            <td>
              <span
                className="tab-sort-btn"
                onClick={() => {
                  sortColumn("fromAccount");
                }}
              >
                From Account
              </span>
            </td>
            <td>
              <span
                className="tab-sort-btn"
                onClick={() => {
                  sortColumn("toAccount");
                }}
              >
                To Account
              </span>
            </td>
            <td>
              <span
                className="tab-sort-btn"
                onClick={() => {
                  sortColumn("amount");
                }}
              >
                Amount
              </span>
            </td>
            <td>Receipt</td>
            <td>
              <span
                className="tab-sort-btn"
                onClick={() => {
                  sortColumn("notes");
                }}
              >
                Notes
              </span>
            </td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {tableData.map((raw, i) => {
            let rupees = new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(raw.amount);

            return (
              <tr key={i}>
                <td>{raw.id}</td>
                <td>{raw.transactionDate}</td>
                <td>{raw.monthYear}</td>
                <td>{raw.transactionType}</td>
                <td>{raw.fromAccount}</td>
                <td>{raw.toAccount}</td>
                <td>{rupees}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={`data:image/${raw.receipt.extension};base64,${raw.receipt.base24String}`}
                      alt="img"
                      className="receipt-img"
                    />
                  </div>
                </td>
                <td>{raw.notes}</td>
                <td>
                  <button
                    className="viewbtn"
                    onClick={() => {
                      viewCard(raw.id);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableCard;
