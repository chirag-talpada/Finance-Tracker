import React, { useState } from "react";
import "./AddTransaction.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header/Header";
import Form from "../../components/SelectDropDown/Form";

import { initialValues, toastOption } from "../../utils/constant";

import { addData, getData } from "../../services/localStorage";
import { getImageData } from "../../services/ImageBase24";

import { isValidateForm } from "../../utils/Validation/index";

const AddTransaction = () => {
  
  const [formErr, setFormErr] = useState({});
  const [formValues, setFormValues] = useState(initialValues);

  const AddTransaction = async (e) => {
    e.preventDefault();

    let isValid = isValidateForm(formValues, setFormErr);

    if (isValid) {
      let img = await getImageData(formValues.receipt);
      let transactionData = { ...formValues };
      transactionData.receipt = img;

      if (getData("transaction") === null) {
        transactionData.id = 1;
        addData("transaction", JSON.stringify({ data: [transactionData] }));
      } else {
        let prevData = JSON.parse(getData("transaction"));
        transactionData.id = prevData.data.length + 1;
        prevData.data.push(transactionData);
        addData("transaction", JSON.stringify(prevData));
      }

      toast("Transaction Added!", toastOption);
      setFormValues({ ...initialValues });
    }
  };



  return (
    <div className="container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
