import React, { useState,useEffect } from "react";
import SelectDropDown from "./SelectDropDown/SelectDropDown";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  MonthYear as MonthYearValues,
  TransactionType,
  FromToAccount,
} from "../utils/constant";
import { validationShema } from "../utils/Validation";



const Form = ({ onSubmitMethod, buttonText, formValues }) => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationShema),
    
  });

useEffect(()=>{

  if(formValues.receipt){
    let imgString=`data:image/${formValues.receipt.extension};base64,${formValues.receipt.base24String}`;
      setImg(imgString); 
      setValue('receipt',imgString);
  }

// eslint-disable-next-line react-hooks/exhaustive-deps
},[formValues]);
  

  const [img, setImg] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { files } = e.target;

    if (e.target.getAttribute("type") === "file") {
      let imgURL = URL.createObjectURL(files[0]);
      setImg(imgURL);
    }
  };

  const removeImage = () => {
    setImg("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitMethod)}>
        <div className="row">
          <div className="feild-title">Transaction Date:</div>
          <div className="feild-input">
            <input
              type="date"
              {...register("transactionDate")}
              name="transactionDate"
              className="form-input"
              defaultValue={formValues?.transactionDate}
            ></input>

            {<span className="err">{errors?.transactionDate?.message}</span>}
          </div>
        </div>

        <div className="row">
          <div className="feild-title">Month Year:</div>
          <div className="feild-input">
            <SelectDropDown
              register={register}
              name="monthYear"
              selectName="Month Year"
              optionValue={MonthYearValues}
              handler={onChangeHandler}
              defaultValue={formValues?.monthYear}
              type={1}
            />

            {<span className="err">{errors?.monthYear?.message}</span>}
          </div>
        </div>

        <div className="row">
          <div className="feild-title">Transaction Type:</div>
          <div className="feild-input">
            <SelectDropDown
              register={register}
              name="transactionType"
              selectName="Transaction Type"
              optionValue={TransactionType}
              handler={onChangeHandler}
              defaultValue={formValues?.transactionType}
              type={1}
            />

            {<span className="err">{errors?.transactionType?.message}</span>}
          </div>
        </div>

        <div className="row">
          <div className="feild-title">From Account:</div>
          <div className="feild-input">
            <SelectDropDown
              name="fromAccount"
              register={register}
              selectName="From Account"
              optionValue={FromToAccount}
              handler={onChangeHandler}
              defaultValue={formValues?.fromAccount}
              type={1}
            />
            {<span className="err">{errors?.fromAccount?.message}</span>}
          </div>
        </div>

        <div className="row">
          <div className="feild-title">To Account:</div>
          <div className="feild-input">
            <SelectDropDown
              name="toAccount"
              selectName="To Account"
              optionValue={FromToAccount}
              register={register}
              handler={onChangeHandler}
              defaultValue={formValues?.toAccount}
              type={1}
            />
            {<span className="err">{errors?.toAccount?.message}</span>}
          </div>
        </div>

        <div className="row">
          <div className="feild-title">Amount:</div>
          <div className="feild-input">
            <input
              name="amount"
              type="number"
              {...register("amount")}
              className="form-input"
              defaultValue={formValues?.amount}
            />
            {<span className="err">{errors?.amount?.message}</span>}
          </div>
        </div>

        <div className="row">
          <div className="feild-title">Receipt:</div>
          <div className="feild-input">
            {img === "" ? (
              <input
                name="receipt"
                type="file"
                {...register("receipt", {
                  onChange: (e) => {
                    onChangeHandler(e);
                  },
                })}
                className="form-input file-input"
                accept="image/png , image/jpeg , image/jpg"
              />
            ) : (
              <div className="flex-preview">
                <div className="preview-div">
                  <img src={img} className="preview-img" alt="img" />
                </div>

                <div>
                  <button onClick={removeImage} className="rm-imgBtn">
                    &#10006;
                  </button>
                </div>
              </div>
            )}

            {<span className="err">{errors?.receipt?.message}</span>}
          </div>
        </div>

        <div className="row">
          <div className="feild-title">Notes:</div>
          <div className="feild-input">
            <textarea
              style={{ height: "100px" }}
              name="notes"
              {...register("notes")}
              className="form-input file-input"
              placeholder="remarks..."
              defaultValue={formValues?.notes}
            />
            {<span className="err">{errors?.notes?.message}</span>}
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
            onClick={() => {
              navigate("/transactions");
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
