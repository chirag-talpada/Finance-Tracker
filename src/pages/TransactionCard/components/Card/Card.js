import React from 'react'
import { useNavigate } from "react-router-dom";

const Card = ({transaction}) => {
    const navigate=useNavigate();
  return (
    <div className="transaction-card">
      <div className="transaction-img">
        {transaction?.receipt && <img
          src={`data:image/${transaction?.receipt?.extension};base64,${transaction?.receipt?.base24String}`}
          alt="img"
          className="transaction-card-img"
        />}
      </div>
      <table className="transaction-card-table">
        <tbody>
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
        </tbody>
      </table>
    <button className="gobackbtn" onClick={()=>{navigate('/transactions')}}>Go Back</button>
    </div>
  )
}

export default Card