import React, { useState,useEffect } from "react";
import SelectDropDown from "./SelectDropDown/SelectDropDown";
import { useNavigate } from "react-router-dom";

import {
  MonthYear as MonthYearValues,
  TransactionType,
  FromToAccount,
} from "../utils/constant";

const Form = ({
  onSubmitMethod,
  buttonText,
  setFormValues,
  formValues,
  formErr,
  fileInput,
}) => {
  const [img, setImg] = useState("");
  const navigate=useNavigate();

  useEffect(()=>{
    if(formValues.receipt?.extension){
      let imgString=`data:image/${formValues.receipt.extension};base64,${formValues.receipt.base24String}`;
      setImg(imgString); 
    }

    if(formValues.receipt===null){
      setImg('');
    }

  },[formValues.receipt])

  const onChangeHandler = (e) => {
    const { name, value, files } = e.target;
    if (typeof setFormValues === "function") {
      if (e.target.getAttribute("type") === "file") {
        setFormValues((prev) => {
          return { ...prev, [name]: files[0] };
        });

        let imgURL = URL.createObjectURL(files[0]);
        setImg(imgURL);
        
      } else {
        setFormValues((prev) => {
          return { ...prev, [name]: value };
        });
      }
    }
  };

  
  const removeImage=()=>{
    setImg('');
    setFormValues(prev=>{
      return { ...prev, receipt: null };
    })

  }

  return (
    <div>
      <form onSubmit={onSubmitMethod}>
        <div className="row">
          <div className="feild-title">Transaction Date:</div>
          <div className="feild-input">
            <input
              type="date"
              name="transactionDate"
              className="form-input"
              onChange={onChangeHandler}
              value={formValues.transactionDate}
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
              defaultDDLValue={formValues.monthYear}
              handler={onChangeHandler}
              type={1}
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
              defaultDDLValue={formValues.transactionType}
              handler={onChangeHandler}
              type={1}
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
              defaultDDLValue={formValues.fromAccount}
              handler={onChangeHandler}
              type={1}
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
              defaultDDLValue={formValues.toAccount}
              handler={onChangeHandler}
              type={1}
            />
            {<span className="err">{formErr.toAccount}</span>}
          </div>
        </div>

        <div className="row">
          <div className="feild-title">Amount:</div>
          <div className="feild-input">
            <input
              name="amount"
              type="number"
              value={formValues.amount}
              onChange={onChangeHandler}
              className="form-input"
            />
            {<span className="err">{formErr.amount}</span>}
          </div>
        </div>

        <div className="row">
          <div className="feild-title">Receipt:</div>
          <div className="feild-input">
            
            {img === "" && formValues.receipt===null ? 
            (
              <input
                name="receipt"
                type="file"
                className="form-input file-input"
                ref={fileInput}
                onChange={onChangeHandler}
                accept="image/png , image/jpeg , image/jpg"
                value={
                  formValues.receipt !== null
                    ? formValues?.receipt?.filename
                    : ""
                }
              />
          
              
              
            ) : (
              <div className="flex-preview">

                <div className="preview-div">
                  <img src={img} className="preview-img" alt="img" />
                </div>


                <div>
                    <button onClick={removeImage} className="rm-imgBtn">&#10006;</button>
                </div>
              </div>
            )}

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
              value={formValues.notes}
            />
            {<span className="err">{formErr.notes}</span>}
          </div>
        </div>

        <div className="row">
          <input
            type="submit"
            name="submit"
            value={buttonText}
            className="addbtn"
          />
          <input
            type="button"
            value="cancel"
            className="btn"
            onClick={()=>{navigate('/transactions')}}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
