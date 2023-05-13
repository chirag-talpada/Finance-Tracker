/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ShowTransaction.css";


import MainTable from "./components/MainTable/MainTable";
import GroupTable from "./components/GroupTable/GroupTable";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";

import { GroupByOption } from "../../utils/constant";
import {  getUserID, loggedout } from "../../services/authentication";

import { useSelector } from "react-redux";




const ShowTransaction = () => {
 

  const [transactionData, setTransactionData] = useState([]);
  const [groupBy, setGroupBy] = useState("none");

  const navigate=useNavigate();

  
  const {transactions}=useSelector((state)=>{
    return state
  });


  


  const getIntialData = () => { 
    let data = transactions;

    let userID=getUserID();
    return data[userID]??[];
  };

  useEffect(() => {
    const data = getIntialData();
    setTransactionData(data);

  }, []);

 
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
        <MainTable  />
      )}

      {groupBy !== "none" && (transactionData.length!==0) && (
        <GroupTable groupBy={groupBy} />
      )}

      {groupBy !== "none" && transactionData.length===0 && (<h1 className="empty-data">there is no data</h1>)}
    </div>
  );
};

export default ShowTransaction;
