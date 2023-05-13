import React,{useState,useEffect} from "react";
import "./SerachMainTable.css";
import { getUserID } from "../../../../services/authentication";

import { useSelector } from "react-redux";

const SearchMainTable = ({setTransactionData}) => {


  const [searchTransactionData,setSearchTransactionData]=useState([]);
  const {transactions}=useSelector((state)=>{
    return state
  });

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

    
    setTransactionData((prev)=>{
      return {...prev,[getUserID()]:searchedResults}
    });
    
    
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
