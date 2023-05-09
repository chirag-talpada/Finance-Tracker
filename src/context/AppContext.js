import React, { createContext,useState } from "react";
import { getData } from "../services/localStorage";

export const appContext = createContext();

const AppState = ({ children }) => {

  const [transactions,setTransaction]=useState(getData("transaction"));

  const updateTransactionData=(data)=>{
      setTransaction(data)
  } 

  const deleteUserTransaction=(userID,transactionId)=>{
    let data={...transactions};
    // let filterData=data[userID].filter(x=>x.id!==transactionId);
    
    data[userID]=data[userID].filter(x=>x.id!==transactionId);

    setTransaction(data);
    
    
     
    
  }

  return <appContext.Provider value={{transactions,updateTransactionData,deleteUserTransaction}}>
    {children}
    </appContext.Provider>;
};

export default AppState;
