/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./ShowTransaction.css";
import { getData } from "../../services/localStorage";

import MainTable from "./components/MainTable/MainTable";
import GroupTable from "./components/GroupTable/GroupTable";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";

import { GroupByOption } from "../../utils/constant";
import { sortingData } from "../../utils/sorting";


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
  const [groupBy, setGroupBy] = useState("none");
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

  return (
    <div className="transection-container">
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

      {groupBy === "none" && (
        <MainTable sortColumn={sortColumn} setTransactionData={setTransactionData} transactionData={transactionData} />
      )}

      {groupBy !== "none" && (
        <GroupTable groupBy={groupBy} transactionData={transactionData} />
      )}
    </div>
  );
};

export default ShowTransaction;
