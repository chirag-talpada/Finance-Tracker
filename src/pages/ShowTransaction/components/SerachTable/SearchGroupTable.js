import React from 'react'
import './SearchGroupTable.css'

import { searchedColumns } from '../../../../utils/constant'

const SearchGroupTable = ({setGroupDataTable,searchGroupDataTable}) => {


    const searchData=(searchQuery)=>{

        let groupData={...searchGroupDataTable};
        Object.keys(groupData).forEach((key) => {
            let keysData=[...groupData[key]];

            let filteredData=keysData.filter(data=>{
                let valuesArray=searchedColumns.map(object_keys=>{
                    return data[object_keys];
                })

                let string=valuesArray.join(' ');
                return string.toLowerCase().includes(searchQuery.toLowerCase())
            });
            
            groupData[key]=filteredData;
            
        })

       setGroupDataTable(groupData);
      
       
        
        
    }

    const setInputField=(e)=>{
        searchData(e.target.value.trim())
    }

  return (
    <div className='search-group'>
        <input type="text" name="search" onChange={setInputField}  placeholder="Search..." className="search-input" />
    </div>
  )
}

export default SearchGroupTable