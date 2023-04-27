import React,{useState,useEffect} from "react";
import "./SerachMainTable.css";
import { getData } from "../../../../services/localStorage";

const SearchMainTable = ({setTransactionData}) => {


  const [searchTransactionData,setSearchTransactionData]=useState([]);


  useEffect(()=>{
    let {data} = JSON.parse(getData("transaction"));
    setSearchTransactionData(data)
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
