export const MonthYear = [
  "Jan 2023",
  "Feb 2023",
  "Mar 2023",
  "Apr 2023",
  "May 2023",
  "Jun 2023",
  "Jul 2023",
  "Aug 2023",
  "Sep 2023",
  "Oct 2023",
  "Nov 2023",
  "Dec 2023",
];
export const TransactionType = ["Home Expense", "Personal Expense", "Income"];
export const FromToAccount = [
  "Personal Account",
  "Real Living",
  "My Dream Home",
  "Full Circle",
  "Core Realtors",
  "Big Block",
];

export const GroupByOption=["Month Year","Transaction Type","From Account","To Account"];


export const toastOption = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
};

export const DateColumnsName=["transactionDate","monthYear"]
export const charactesColumnsName=["transactionType","fromAccount","toAccount","notes"]
export const numberColumnsName=["amount"];

export const PAGE_LIMIT=5 ;

export const searchedColumns = ["id","transactionDate","monthYear","transactionType","fromAccount","toAccount","notes","amount"];

export const initialValues = {
  transactionDate: "",
  monthYear: "",
  transactionType: "",
  fromAccount: "",
  toAccount: "",
  amount: "",
  notes: "",
  receipt: null,
};