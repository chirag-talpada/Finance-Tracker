import React, { createContext,useState } from "react";
import { getData } from "../services/localStorage";

export const appContext = createContext();

const AppState = ({ children }) => {

  const [transactions,setTransaction]=useState(getData("transaction"));

  const updateTransactionData=(data)=>{
      setTransaction(data)
  } 

  return <appContext.Provider value={{transactions,updateTransactionData}}>
    {children}
    </appContext.Provider>;
};

export default AppState;
