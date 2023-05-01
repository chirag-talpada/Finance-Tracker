import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddTransaction.css";



import Header from "./components/Header/Header";
import Form from "../../components/Form";

import { initialValues } from "../../utils/constant";

import { addData, getData } from "../../services/localStorage";
import { getImageData } from "../../services/ImageBase24";

import { isValidateForm } from "../../utils/Validation/index";

const AddTransaction = () => {
  
  const [formErr, setFormErr] = useState({});
  const [formValues, setFormValues] = useState(initialValues);
  const navigate=useNavigate();

  const AddTransaction = async (e) => {
    e.preventDefault();

    let isValid = isValidateForm(formValues, setFormErr);

    if (isValid) {
      let img = await getImageData(formValues.receipt);
      let transactionData = { ...formValues };
      let id;
      transactionData.receipt = img;

      if (getData("transaction") === null) {
        transactionData.id = 1;
        id=1;
        addData("transaction", JSON.stringify({ data: [transactionData] }));
      } else {
        let prevData = JSON.parse(getData("transaction"));
        transactionData.id = prevData.data.length + 1;
        id=prevData.data.length + 1;
        prevData.data.push(transactionData);
        addData("transaction", JSON.stringify(prevData));
      }

      navigate(`/transaction/${id}`,{state:{toast:true,msg:'Transaction Added!'}});
      
    }
  };



  return (
    <div className="container">
     
      <div className="add-form">
        <Header></Header>

        <div className="feilds-container">
          <Form
            onSubmitMethod={AddTransaction}
            setFormValues={setFormValues}
            formErr={formErr}
            formValues={formValues}
            buttonText="Add"
          />
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
