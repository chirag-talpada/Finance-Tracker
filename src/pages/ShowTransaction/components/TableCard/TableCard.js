import React, { useState,useEffect } from "react";
import "./TableCard.css";
import { useNavigate } from "react-router-dom";

import { sortingData } from "../../../../utils/sorting/index";
import { useDispatch } from "react-redux";
import { remove } from "../../../../redux/transactionSlice";
import { getUserID } from "../../../../services/authentication";

const TableCard = ({ tableHeader, tableBody }) => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
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
    navigate(`/transaction/${id}`,{state:{toast:false}});
  };

  const editTransaction=(id)=>{
    navigate(`/transaction/edit/${id}`);
  }
  
  const getIntialData = () => {
    return tableBody;
  };

  const sortColumn = (column) => {
    sortingData(
      column,
      toggleSort,
      getIntialData,
      tableData,
      setToggleSort,
      setTableData
    );
  };

  const transactionHeader = [
    {
      title: "ID",
    },
    { title: "Transaction Date", onClick: () => sortColumn("transactionDate") },
    { title: "Month Year", onClick: () => sortColumn("monthYear") },
    { title: "Transaction Type", onClick: () => sortColumn("transactionType") },
    { title: "From Account", onClick: () => sortColumn("fromAccount") },
    { title: "To Account", onClick: () => sortColumn("toAccount") },
    { title: "Amount", onClick: () => sortColumn("amount") },
    { title: "Receipt" },
    { title: "Notes", onClick: () => sortColumn("notes") },
    { title: "Action" },
  ];

  useEffect(()=>{
    setTableData(tableBody)
  },[tableBody])
 
  const deleteTransaction = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?") === true) {
      dispatch(remove({userID:getUserID(),id}));
      
    }
  };
  

  return (
    <div>
      <div className="group-table-div">
        <span className="group-table-title">{tableHeader}</span>
      </div>
      <table className="group-table-card">
        <thead>
          <tr>
            {transactionHeader.map((header, i) => {
              return (
                <td key={i}>
                  {header?.onClick !== undefined ? (
                    <span className="tab-sort-btn" onClick={header.onClick}>
                      {header.title}
                    </span>
                  ) : (
                    <span className="tab-sort-btn">
                      {header.title}
                    </span>
                  )}
                </td>
              );
            })}
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
                <div className="tableflex">
                  <button
                    className="viewbtn"
                    onClick={() => {
                      viewCard(raw.id);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="editbtn"
                    onClick={() => {
                      editTransaction(raw.id);
                    }}
                  >
                    edit
                  </button>
                  <button
                      className="deletebtn"
                      onClick={() => {
                        deleteTransaction(raw.id);
                      }}
                    >
                      delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {tableData.length===0 && <tr><td colSpan={10}>Data Not Found</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default TableCard;
