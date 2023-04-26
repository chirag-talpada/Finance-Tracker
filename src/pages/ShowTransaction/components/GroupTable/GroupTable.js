/* eslint-disable no-useless-computed-key */

import React, { useEffect, useState } from "react";
import "./GroupTable.css";

import TableCard from "../TableCard/TableCard";

const groupColumns = {
  
  ["Month Year"]: "monthYear",
  ["Transaction Type"]: "transactionType",
  ["From Account"]: "fromAccount",
  ["To Account"]: "toAccount",
};


const GroupTable = ({ groupBy, transactionData }) => {
  const [groupDataTable, setGroupDataTable] = useState({});

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupBy]);

  return <div className="group-tables-row">

    {Object.keys(groupDataTable).map((key,i)=>{
        let data=groupDataTable[key];
        return <TableCard key={i} tableHeader={key} tableBody={data} />
    })}

  </div>;
};

export default GroupTable;
