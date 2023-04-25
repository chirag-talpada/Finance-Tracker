import React from "react";
import "./AddTransaction.css";
import Header from "./components/Header/Header";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";
import {
  MonthYear,
  TransactionType,
  FromToAccount,
} from "../../utils/constant";

const AddTransaction = () => {

  const AddTransaction=(e)=>{
    e.preventDefault();
    
    
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
                  name="transaction-date"
                  className="form-input"
                ></input>
              </div>
            </div>

            <div className="row">
              <div className="feild-title">Month Year:</div>
              <div className="feild-input">
                <SelectDropDown
                  name="month-year"
                  selectName="Month Year"
                  optionValue={MonthYear}
                ></SelectDropDown>
              </div>
            </div>

            <div className="row">
              <div className="feild-title">Transaction Type:</div>
              <div className="feild-input">
                <SelectDropDown
                  name="transaction-type"
                  selectName="Transaction Type"
                  optionValue={TransactionType}
                />
              </div>
            </div>

            <div className="row">
              <div className="feild-title">From Account:</div>
              <div className="feild-input">
                <SelectDropDown
                  name="from-account"
                  selectName="From Account"
                  optionValue={FromToAccount}
                />
              </div>
            </div>

            <div className="row">
              <div className="feild-title">To Account:</div>
              <div className="feild-input">
                <SelectDropDown
                  name="to-account"
                  selectName="To Account"
                  optionValue={FromToAccount}
                />
              </div>
            </div>

            <div className="row">
              <div className="feild-title">Amount:</div>
              <div className="feild-input">
                <input name="amount" type="number" className="form-input" />
              </div>
            </div>

            <div className="row">
              <div className="feild-title">Receipt:</div>
              <div className="feild-input">
                <input
                  name="receipt"
                  type="file"
                  className="form-input file-input"
                />
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
                />
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
