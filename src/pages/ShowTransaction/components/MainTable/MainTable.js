import React from "react";

import { useNavigate } from "react-router-dom";

function MainTable({sortColumn,transactionData}) {

  const navigate=useNavigate();

  const viewCard=(id)=>{
    navigate(`/transactions/${id}`);
  }

  return (

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
        {transactionData.map((raw, i) => {
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
                <button className="viewbtn" onClick={()=>{viewCard(raw.id)}}>View</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    
  );
}

export default MainTable;
