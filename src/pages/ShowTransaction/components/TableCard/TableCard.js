import React from "react";
import './TableCard.css'

const TableCard = ({ tableHeader, tableBody }) => {
  return (
    <div >
      <div className="group-table-div"><span className="group-table-title">{tableHeader}</span></div>
      <table className="group-table-card">
        <thead>
          <tr>
            <td>ID</td>
            <td>Trasaction Date</td>
            <td>Month Year</td>
            <td>Transaction Type</td>
            <td>From Account</td>
            <td>To Account</td>
            <td>Amount</td>
            <td>Receipt</td>
            <td>Notes</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {tableBody.map((raw, i) => {
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

export default TableCard;
