import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./EditTransaction.css";
import Header from "../AddTransaction/components/Header/Header";
import Form from "../../components/Form";
import { addData, getData } from "../../services/localStorage";
import { getUserID } from "../../services/authentication";
import { convertDate } from "../../helper/date";
import { getImageData } from "../../services/ImageBase24";

const EditTransaction = () => {
  const [formValues, setFormValues] = useState({});
  const [transaction, setTransaction] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    let data = getData("transaction");
    let userID = getUserID();

    let [editedTransaction] = data[userID].filter(
      (raw) => raw.id === Number(id)
    );

    setFormValues(editedTransaction);
    setTransaction(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const editTransaction = async (data) => {
    let transactionData = { ...data };
    let userID = getUserID();

    if (typeof data.receipt === "string") {
      let extension = data.receipt.slice(
        data.receipt.indexOf("/") + 1,
        data.receipt.indexOf(";")
      );
      let base24String = data.receipt.slice(data.receipt.indexOf(",") + 1);
      transactionData.receipt = { extension, base24String };
    } else {
      let img = await getImageData(data.receipt[0]);
      transactionData.receipt = img;
    }

    transactionData.transactionDate = convertDate(
      transactionData.transactionDate
    );

    transactionData.id = Number(id);
    let allTransactions = { ...transaction };
    allTransactions[userID][Number(id) - 1] = { ...transactionData };
    addData("transaction", JSON.stringify(allTransactions));
    navigate(`/transaction/${id}`, {
      state: { toast: true, msg: "Transaction updated!" },
    });
  };

  return (
    <div className="container">
      <div className="add-form">
        <Header></Header>
        <div className="feilds-container">
          {Object.keys(formValues).length && (
            <Form
              onSubmitMethod={editTransaction}
              formValues={formValues}
              buttonText="Update"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTransaction;
