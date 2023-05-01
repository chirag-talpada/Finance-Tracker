import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./EditTransaction.css";
import Header from "../AddTransaction/components/Header/Header";
import Form from "../../components/Form";
import { isValidateForm } from "../../utils/Validation";
import { initialValues } from "../../utils/constant";
import { getData } from "../../services/localStorage";
import { getImageData } from "../../services/ImageBase24";
import { addData } from "../../services/localStorage";


const EditTransaction = () => {
  const [formErr, setFormErr] = useState({});
  const [formValues, setFormValues] = useState(initialValues);
  const [transactionFile, setTransactionFile] = useState(null);
  const [transaction, setTransaction] = useState({});
  const navigate=useNavigate();

  const fileInput = useRef();
  const { id } = useParams();

  useEffect(() => {
    let { data } = JSON.parse(getData("transaction"));
    let [editedTransaction] = data.filter((raw) => raw.id === Number(id));
    
    //let fileObject = getImageObject(editedTransaction);

    setTransactionFile(editedTransaction?.receipt);
    setEditFormValues(editedTransaction);
    setTransaction(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    
    setFormValues((prev) => {
      return { ...prev, receipt: transactionFile };
    });

  }, [transactionFile]);

  const setEditFormValues = (transaction) => {
    let mainKeys = Object.keys(transaction).filter((key) => {
      return key !== "receipt" && key !== "id";
    });

    mainKeys.forEach((key) => {
      setFormValues((prev) => {
        return { ...prev, [key]: transaction[key] };
      });
    });
  };

  const editTransaction = async (e) => {
    e.preventDefault();

    let isValid = isValidateForm(formValues, setFormErr);

    if (isValid) {
      let transactionData = { ...formValues };

      if(!formValues.receipt.extension){
        let img = await getImageData(formValues.receipt);
        transactionData.receipt = img;
      }

      transactionData.id = Number(id);

      let allTransactions = [...transaction];

      allTransactions[Number(id) - 1] = { ...transactionData };
      
      addData("transaction", JSON.stringify({"data":allTransactions}));
      // toast("Transaction updated!", toastOption);
      navigate(`/transaction/${id}`,{state:{toast:true,msg:'Transaction updated!'}});
    }
  };

  return (
    <div className="container">
      <div className="add-form">
        <Header></Header>

        <div className="feilds-container">
          <Form
            onSubmitMethod={editTransaction}
            setFormValues={setFormValues}
            formErr={formErr}
            formValues={formValues}
            fileInput={fileInput}
            buttonText="Update"
          />
        </div>
      </div>
    </div>
  );
};

export default EditTransaction;
