/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./ShowTransaction.css";
import { getData } from "../../services/localStorage";

import {DateColumnsName,charactesColumnsName,numberColumnsName} from "../../utils/constant";

const ShowTransaction = () => {
  const initialValues = {
    transactionDate: 1,
    monthYear: 1,
    transactionType: 1,
    fromAccount: 1,
    toAccount: 1,
    amount: 1,
    notes: 1,
  };

  const [transactionData, setTransactionData] = useState([]);
  const [toggleSort, setToggleSort] = useState(initialValues);

  const getIntialData = () => {
    let data = JSON.parse(getData("transaction"));
    return data.data;
  };

  useEffect(() => {
    const data = getIntialData();
    setTransactionData(data);
  }, []);

  const sortColumn = (column) => {
    let sorted;

    if (DateColumnsName.includes(column)) {
      if (toggleSort[column] === 1) {
        sorted = [...transactionData].sort((a, b) => {
          return new Date(a[column]) - new Date(b[column]);
        });
      }
      if (toggleSort[column] === 2) {
        sorted = [...transactionData].sort((a, b) => {
          return new Date(b[column]) - new Date(a[column]);
        });
      }
      if (toggleSort[column] === 3) {
        sorted = [...getIntialData()];
      }
    }

    if (charactesColumnsName.includes(column)) {
      if (toggleSort[column] === 1) {
        sorted = [...transactionData].sort((a, b) => {
          return a[column].localeCompare(b[column]);
        });
      }
      if (toggleSort[column] === 2) {
        sorted = [...transactionData].sort((a, b) => {
          return b[column].localeCompare(a[column]);
        });
      }
      if (toggleSort[column] === 3) {
        sorted = [...getIntialData()];
      }
    }
    
    if (numberColumnsName.includes(column)) {
      if (toggleSort[column] === 1) {
        sorted = [...transactionData].sort((a, b) => {
          return a[column]-b[column];
        });
      }
      if (toggleSort[column] === 2) {
        sorted = [...transactionData].sort((a, b) => {
          return b[column]-a[column];
        });
      }
      if (toggleSort[column] === 3) {
        sorted = [...getIntialData()];
      }
    }



    setTransactionData(sorted);

    setToggleSort((prev) => {
      let num = prev[column] === 3 ? 1 : prev[column] + 1;
      return { ...prev, [column]: num };
    });
  };

  return (
    <div className="transection-container">
      <h3>All Transaction</h3>

      <table className="transaction-table">
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
              <span className="tab-sort-btn"
                onClick={() => {
                  sortColumn("monthYear");
                }}>Month Year</span>
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
          {transactionData.map((raw, i) => {
            return (
              <tr key={i}>
                <td>{raw.id}</td>
                <td>{raw.transactionDate}</td>
                <td>{raw.monthYear}</td>
                <td>{raw.transactionType}</td>
                <td>{raw.fromAccount}</td>
                <td>{raw.toAccount}</td>
                <td>{raw.amount}</td>
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
                  <button className="viewbtn">View</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShowTransaction;
