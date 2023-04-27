import React from 'react'
import './PaginationFooter.css'

const PaginationFooter = ({setPage,page}) => {

    const changePage=(pageNumber)=>{
        setPage((prev)=>{
            return {...prev,current:pageNumber}
        })
      
        
    }
 
  return (
    <div className='pagination-raw'>
        <div className='pagination-section'>
            {!(page.current-1)<=0 ? <button className='pbtn' onClick={()=>{changePage(page.current-1)}} >Previous page</button> :<div style={{visibility:"hidden"}}>previous</div>}
            <div className='current-page'>Page {page.current}</div>
            {(page.current+1)<=page.total_page ? <button className='pbtn' onClick={()=>{changePage(page.current+1)}}>Next Page</button>:<div style={{visibility:"hidden"}}>next</div>}
           
        </div>
    </div>
  )
}

export default PaginationFooter