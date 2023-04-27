import React, { useEffect, useState } from "react";
import "./TransactionCard.css";

import { useParams,useNavigate } from "react-router-dom";
import { getData } from "../../services/localStorage";

const TransactionCard = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState({});
  const navigate=useNavigate();
  
  useEffect(() => {
    let { data } = JSON.parse(getData("transaction"));
    let [x] = data.filter((raw) => raw.id === Number(id));
    setTransaction(x);
    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="transaction-card">
      <div className="transaction-img">
        <img
          src={`data:image/${transaction?.receipt?.extension};base64,${transaction?.receipt?.base24String}`}
          alt="img"
          className="transaction-card-img"
        />
      </div>
      <table className="transaction-card-table">
        <tr>
            <td>ID</td>
            <td>: {transaction?.id}</td>
        </tr>
        <tr>
            <td>Transaction Date</td>
            <td>: {transaction?.transactionDate}</td>
        </tr>
        <tr>
            <td>Month Year</td>
            <td>: {transaction?.monthYear}</td>
        </tr>
        <tr>
            <td>Transaction Type</td>
            <td>: {transaction?.transactionType}</td>
        </tr>
        <tr>
            <td>From Account</td>
            <td>: {transaction?.fromAccount}</td>
        </tr>
        <tr>
            <td>To Account</td>
            <td>: {transaction?.toAccount}</td>
        </tr>
        <tr>
            <td>Amount</td>
            <td>: {transaction?.amount}</td>
        </tr>
        <tr>
            <td>Notes</td>
            <td>: {transaction?.notes}</td>
        </tr>
      </table>
    <button className="gobackbtn" onClick={()=>{navigate('/transactions')}}>Go Back</button>
    </div>
  );
};

export default TransactionCard;
