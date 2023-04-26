import React,{useState} from "react";
import "./AddTransaction.css";
import Header from "./components/Header/Header";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";
import {
  MonthYear as MonthYearValues,
  TransactionType,
  FromToAccount,
} from "../../utils/constant";

const AddTransaction = () => {


  const initialValues={transactionDate:'',monthYear:'',transactionType:'',fromAccount:'',toAccount:'',amount:0,notes:'',receipt:null};
  const [formErr,setFormErr]=useState({});
  const [formValues,setFormValues]=useState(initialValues);

  const isValidateForm=() => {
    let err={};

    if(formValues.transactionDate===""){
      err.transactionDate = "Transaction Date is required";
    }
    if(formValues.monthYear===""){
      err.monthYear = "Month Year is required";
    }
    if(formValues.transactionType===""){
      err.transactionType = "Transaction Type is required";
    }
    if(formValues.fromAccount===""){
      err.fromAccount = "From Account is required";
    }
    if(formValues.toAccount===""){
      err.toAccount = "To Account Year is required";
    }else{
      if(formValues.toAccount===formValues.fromAccount){
        err.toAccount = "To Account and from account cannot be the same";
      }
    }

    if(formValues.amount===0){
      err.amount = "amount is required";
    }else{
      if(formValues.amount<=0){
        err.amount = "amount must be greater than 0";
      }
    }

    if(formValues.receipt===null){
      err.receipt = "receipt is required";
    }else{

      if(formValues.receipt.size>1048576){
        err.receipt = "file size should not exceed 1 MB";
      }

      let allowedExtensions = ['.jpg', '.jpeg', '.png'];

      let fileName = formValues.receipt.name.toLowerCase();
      let extension = fileName.substring(fileName.lastIndexOf('.'));
      if (!allowedExtensions.includes(extension)) {
        err.receipt ='Invalid file type. Only JPG, JPEG, and PNG files are allowed.';
      } 

    }

    if(formValues.notes===""){
      err.notes = "Notes is required";
    }else{
      if(formValues.notes.length>250){
        err.notes="Notes too long, Must be less than 250 characters";
      }
    }

    
    setFormErr(err);
    
    return (Object.keys(err).length>0)?false:true;

  }

  const AddTransaction=(e)=>{
    e.preventDefault();
    
    let x=isValidateForm();

    console.log(x);
    
  }

  const onChangeHandler = (e)=>{
    const {name,value,files}=e.target;

    if(e.target.getAttribute("type")==="file"){
      setFormValues(prev=>{
        return {...prev,[name]:files[0]}
      })
    }else{
      setFormValues(prev=>{
        return {...prev,[name]:value}
      })
    }
    
  }

  return (
    <div className="container">
      <div className="add-form">
        <Header></Header>

        <div className="feilds-container">
          <form onSubmit={AddTransaction}>
            <div className="row">
              <div className="feild-title">Transaction Date:</div>
              <div className="feild-input">
                <input
                  type="date"
                  name="transactionDate"
                  className="form-input"
                  onChange={onChangeHandler}
                ></input>
                {<span className="err">{formErr.transactionDate}</span>}
              </div>
            </div>

            <div className="row">
              <div className="feild-title">Month Year:</div>
              <div className="feild-input">
                <SelectDropDown
                  name="monthYear"
                  selectName="Month Year"
                  optionValue={MonthYearValues}
                  handler={onChangeHandler}
                  ></SelectDropDown>
                  {<span className="err">{formErr.monthYear}</span>}
              </div>
            </div>

            <div className="row">
              <div className="feild-title">Transaction Type:</div>
              <div className="feild-input">
                <SelectDropDown
                  name="transactionType"
                  selectName="Transaction Type"
                  optionValue={TransactionType}
                  handler={onChangeHandler}
                />
                {<span className="err">{formErr.transactionType}</span>}
              </div>
            </div>

            <div className="row">
              <div className="feild-title">From Account:</div>
              <div className="feild-input">
                <SelectDropDown
                  name="fromAccount"
                  selectName="From Account"
                  optionValue={FromToAccount}
                  handler={onChangeHandler}
                />
                {<span className="err">{formErr.fromAccount}</span>}
              </div>
            </div>

            <div className="row">
              <div className="feild-title">To Account:</div>
              <div className="feild-input">
                <SelectDropDown
                  name="toAccount"
                  selectName="To Account"
                  optionValue={FromToAccount}
                  handler={onChangeHandler}
                />
                {<span className="err">{formErr.toAccount}</span>}
              </div>
            </div>

            <div className="row">
              <div className="feild-title">Amount:</div>
              <div className="feild-input">
                <input name="amount" type="number" onChange={onChangeHandler} className="form-input" />
                {<span className="err">{formErr.amount}</span>}
              </div>
            </div>

            <div className="row">
              <div className="feild-title">Receipt:</div>
              <div className="feild-input">
                <input
                  name="receipt"
                  type="file"
                  className="form-input file-input"
                  onChange={onChangeHandler}
                  />
                  {<span className="err">{formErr.receipt}</span>}
              </div>
            </div>

            <div className="row">
              <div className="feild-title">Notes:</div>
              <div className="feild-input">
                <textarea
                  style={{ height: "100px" }}
                  name="notes"
                  className="form-input file-input"
                  placeholder="remarks..."
                  onChange={onChangeHandler}
                  />
                  {<span className="err">{formErr.notes}</span>}
              </div>
            </div>

            <div className="row">
              <input
                type="submit"
                name="submit"
                value="ADD"
                className="addbtn"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;