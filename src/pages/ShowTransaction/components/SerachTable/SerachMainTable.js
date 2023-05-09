import React,{useState,useEffect, useContext} from "react";
import "./SerachMainTable.css";
import { getUserID } from "../../../../services/authentication";
import { appContext } from "../../../../context/AppContext";

const SearchMainTable = ({setTransactionData}) => {


  const [searchTransactionData,setSearchTransactionData]=useState([]);
  const {transactions}=useContext(appContext);

  useEffect(()=>{
    let data = transactions;
    let userID=getUserID();
    setSearchTransactionData(data[userID])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const searchData=(pattern)=>{
  
    let searchedResults=[...searchTransactionData].filter((data)=>{
        let dataString=Object.keys(data).filter(Allkey=>Allkey!=='receipt').map(key=>data[key]).join(' ');
        return dataString.toLowerCase().includes(pattern.toLowerCase())
    });
    
    setTransactionData(searchedResults);
    
    
  }
  const setSearchInput=(e)=>{
    searchData(e.target.value.trim())
  }

  return (
    <div className="flex">
      <input type="text" name="search" onChange={setSearchInput} placeholder="Search..." className="search-input" />
     
    </div>
  );
};

export default SearchMainTable;
