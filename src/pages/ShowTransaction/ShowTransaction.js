/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ShowTransaction.css";
import { getData } from "../../services/localStorage";

import MainTable from "./components/MainTable/MainTable";
import GroupTable from "./components/GroupTable/GroupTable";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";

import { GroupByOption } from "../../utils/constant";
import { sortingData } from "../../utils/sorting";
import {  getUserID, loggedout } from "../../services/authentication";


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
  const [transactionDataCount, setTransactionDataCount] = useState(0);
  const [groupBy, setGroupBy] = useState("none");
  const [toggleSort, setToggleSort] = useState(initialValues);
  const navigate=useNavigate();

  const getIntialData = () => {
    let data = getData("transaction");
    let userID=getUserID();
    return data[userID]??[];
  };

  useEffect(() => {
    const data = getIntialData();
    setTransactionData(data);
    setTransactionDataCount(data.length)
  }, []);

  const sortColumn = (column) => {
    sortingData(
      column,
      toggleSort,
      getIntialData,
      transactionData,
      setToggleSort,
      setTransactionData
    );
  };

  const onChangeHandler = (e) => {
    setGroupBy(e.target.value);
  };

  const logoutApp=()=>{
    loggedout();
    navigate('/')
  }

  return (
    <div className="transection-container">
      <button className="add-transaction-btn" onClick={()=>{navigate('/transaction/add')}}>ADD +</button>
      <button className="logout-btn" onClick={()=>{logoutApp()}}> logout</button>
      <h1>All Transaction</h1>

      <div className="groupBy-row">
        <div>
          <SelectDropDown
            name="groupBy"
            optionValue={GroupByOption}
            handler={onChangeHandler}
            type={2}
            cssClass="groupBy-ddl"
          />
        </div>
       
      </div>

    
      {groupBy === "none" &&  (   
        <MainTable sortColumn={sortColumn} transactionDataCount={transactionDataCount} setTransactionData={setTransactionData} transactionData={transactionData} />
      )}

      {groupBy !== "none" && (transactionData.length!==0) && (
        <GroupTable groupBy={groupBy} transactionData={transactionData} />
      )}

      {groupBy !== "none" && transactionData.length===0 && (<h1 className="empty-data">there is no data</h1>)}
    </div>
  );
};

export default ShowTransaction;
