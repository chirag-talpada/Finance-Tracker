/* eslint-disable no-useless-computed-key */

import React, { useEffect, useState } from "react";
import "./GroupTable.css";

import TableCard from "../TableCard/TableCard";
import PaginationFooter from "../PaginationFooter/PaginationFooter";
import SearchGroupTable from "../SerachTable/SearchGroupTable";
import { PAGE_LIMIT } from "../../../../utils/constant";
import { pagination } from "../../../../utils/pagination";
import { getUserID } from "../../../../services/authentication";
import { useSelector } from "react-redux";

const groupColumns = {
  ["Month Year"]: "monthYear",
  ["Transaction Type"]: "transactionType",
  ["From Account"]: "fromAccount",
  ["To Account"]: "toAccount",
};

const GroupTable = ({ groupBy }) => {

  const [groupDataTable, setGroupDataTable] = useState({});
  const [searchGroupDataTable, setSearchGroupDataTable] = useState({});
  const [page, setPage] = useState({});
  
  const {transactions}=useSelector((state)=>{
    return state
  });
  const [transactionData, setTransactionData] = useState(transactions[getUserID()]);

  useEffect(()=>{
    setTransactionData(transactions[getUserID()])
    
    
  },[transactions])

  useEffect(() => {
    let groupData = {};

    for (const data of transactionData) {
      if (groupData[data[groupColumns[groupBy]]] === undefined) {
        groupData[data[groupColumns[groupBy]]] = [data];
      } else {
        groupData[data[groupColumns[groupBy]]].push(data);
      }
    }

    setGroupDataTable(groupData);
    setSearchGroupDataTable(groupData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupBy,transactionData]);

  useEffect(() => {
    if (Object.keys(groupDataTable).length) {
      let pageData = {};
      pageData.current = 1;
      pageData.total_page = Math.ceil(
        Object.keys(groupDataTable).length / PAGE_LIMIT
      );
      setPage(pageData);
    }
  }, [groupDataTable]);

  return (

    <div className="group-tables-row">
      <SearchGroupTable searchGroupDataTable={searchGroupDataTable} setGroupDataTable={setGroupDataTable} />
      {pagination(Object.keys(groupDataTable), page.current).map((key, i) => {
        let data = groupDataTable[key];
        
        return <TableCard key={i} tableHeader={key} tableBody={data} />;
      })}
      <PaginationFooter page={page} setPage={setPage} />
    </div>
  );
};

export default GroupTable;
