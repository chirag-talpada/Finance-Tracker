import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./TransactionCard.css";

import { useParams } from "react-router-dom";
import { getData } from "../../services/localStorage";

import Card from "./components/Card/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOption } from "../../utils/constant";

const TransactionCard = () => {
  const { id } = useParams();
  const location = useLocation();
  const [transaction, setTransaction] = useState({});

  
  useEffect(() => {
    let { data } = JSON.parse(getData("transaction"));
    let [x] = data.filter((raw) => raw.id === Number(id));
    setTransaction(x);

    if(location.state?.toast){
      toast(location.state?.msg, toastOption);
    }
    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    {<Card transaction={transaction}/>}
    </>
  );
};

export default TransactionCard;
