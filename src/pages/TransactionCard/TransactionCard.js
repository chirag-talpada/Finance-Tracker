import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TransactionCard.css";

import { useParams } from "react-router-dom";


import Card from "./components/Card/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOption } from "../../utils/constant";
import { getUserID } from "../../services/authentication";
import { appContext } from "../../context/AppContext";

const TransactionCard = () => {
  const { id } = useParams();
  const location = useLocation();
  const [transaction, setTransaction] = useState({});
  const navigate=useNavigate();
  const {transactions}=useContext(appContext);
  
  useEffect(() => {
    let data = transactions;
    let userID=getUserID();
    
    const [transactionCardData]=data[userID].filter(tran=>tran.id===Number(id))
    
    
    setTransaction(transactionCardData);

    if(location.state?.toast){
      toast(location.state?.msg, toastOption);
      navigate(location.pathname, { replace: true })
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
