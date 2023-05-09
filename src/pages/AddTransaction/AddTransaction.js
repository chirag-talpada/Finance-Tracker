import React from "react";
import { useNavigate } from "react-router-dom";
import "./AddTransaction.css";

import Header from "./components/Header/Header";
import Form from "../../components/Form";

import { addData, getData } from "../../services/localStorage";
import { getImageData } from "../../services/ImageBase24";
import { getUserID } from "../../services/authentication";
import { convertDate } from "../../helper/date";


const AddTransaction = () => {
  const navigate = useNavigate();

  const initialFormValues = {
    transactionDate: "",
    monthYear: "",
    transactionType: "",
    fromAccount: "",
    toAccount: "",
    amount: "",
    notes: "",
  };

  const AddTransaction = async (data) => {
    let img = await getImageData(data.receipt[0]);

    let transactionData = { ...data };
    let id;
    let userID = getUserID();
    transactionData.receipt = img;
    transactionData.transactionDate = convertDate(
      transactionData.transactionDate
    );

    let allUserData = getData("transaction");

    if (allUserData[userID] === undefined) {
      transactionData.id = 1;
      id = 1;
      allUserData[userID] = [transactionData];
      addData("transaction", JSON.stringify(allUserData));
    } else {
      let prevData = getData("transaction");
      transactionData.id = prevData[userID].length + 1;
      id = prevData[userID].length + 1;
      prevData[userID].push(transactionData);
      addData("transaction", JSON.stringify(prevData));
    }

    navigate(`/transaction/${id}`, {
      state: { toast: true, msg: "Transaction Added!" },
    });
  };

  return (
    <div className="container">
      <div className="add-form">
        <Header></Header>

        <div className="feilds-container">
          <Form
            onSubmitMethod={AddTransaction}
            buttonText="Add"
            formValues={initialFormValues}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
