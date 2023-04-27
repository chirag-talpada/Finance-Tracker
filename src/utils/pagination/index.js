import { PAGE_LIMIT } from "../constant"

export const pagination=(transactionData,currentPage)=>{
    return transactionData.slice((currentPage-1)*PAGE_LIMIT,PAGE_LIMIT+(currentPage-1)*PAGE_LIMIT)
}