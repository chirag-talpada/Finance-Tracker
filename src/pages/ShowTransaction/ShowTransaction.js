/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./ShowTransaction.css";
import { getData } from "../../services/localStorage";

import MainTable from "./components/MainTable/MainTable";
import GroupTable from "./components/GroupTable/GroupTable";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";

import {
  DateColumnsName,
  charactesColumnsName,
  numberColumnsName,GroupByOption
} from "../../utils/constant";

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
  const [groupBy, setGroupBy] = useState('none');
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
          return a[column] - b[column];
        });
      }
      if (toggleSort[column] === 2) {
        sorted = [...transactionData].sort((a, b) => {
          return b[column] - a[column];
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

  const onChangeHandler=(e)=>{
    setGroupBy(e.target.value);
  }

  return (
    <div className="transection-container">
      <h1>All Transaction</h1>

      <div className="groupBy-row">
        <SelectDropDown
          name="groupBy"
          optionValue={GroupByOption}
          handler={onChangeHandler}
          type={2}
          cssClass="groupBy-ddl"
        />
      </div>

      {groupBy==="none" && <MainTable sortColumn={sortColumn} transactionData={transactionData} />}
      
      {groupBy!=="none" && <GroupTable groupBy={groupBy} transactionData={transactionData} />}


    </div>
  );
};

export default ShowTransaction;
