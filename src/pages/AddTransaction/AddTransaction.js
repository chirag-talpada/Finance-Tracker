import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddTransaction.css";



import Header from "./components/Header/Header";
import Form from "../../components/Form";

import { initialValues } from "../../utils/constant";

import { addData, getData } from "../../services/localStorage";
import { getImageData } from "../../services/ImageBase24";
import { getUserID } from "../../services/authentication";

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
      let userID=getUserID();
      transactionData.receipt = img;
     

      let allUserData=getData("transaction");
    

      if (allUserData[userID]===undefined) {
  
        transactionData.id = 1;
        id=1;
        allUserData[userID]=[transactionData]
        addData("transaction", JSON.stringify(allUserData));
      } else {
        let prevData = getData("transaction");
        transactionData.id = prevData[userID].length + 1;
        id=prevData[userID].length + 1;
        prevData[userID].push(transactionData);
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
