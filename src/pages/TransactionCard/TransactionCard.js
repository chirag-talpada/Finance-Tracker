import React, { useEffect, useState } from "react";
import "./TransactionCard.css";

import { useParams } from "react-router-dom";
import { getData } from "../../services/localStorage";

import Card from "./components/Card/Card";

const TransactionCard = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState({});

  
  useEffect(() => {
    let { data } = JSON.parse(getData("transaction"));
    let [x] = data.filter((raw) => raw.id === Number(id));
    setTransaction(x);
    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    {<Card transaction={transaction}/>}
    </>
  );
};

export default TransactionCard;
