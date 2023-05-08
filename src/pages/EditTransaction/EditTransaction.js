import React, { useState, useEffect } from "react";
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
import { getUserID } from "../../services/authentication";


const EditTransaction = () => {
 
  const [formValues, setFormValues] = useState(initialValues);
  const [transactionFile, setTransactionFile] = useState(null);
  const [transaction, setTransaction] = useState({});
  const navigate=useNavigate();

 
  const { id } = useParams();

  useEffect(() => {
    let  data  = getData("transaction");
    let userID=getUserID();
    
    let [editedTransaction] = data[userID].filter((raw) => raw.id === Number(id));
    

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

   

    // if (isValid) {
    //   let transactionData = { ...formValues };
    //   let userID=getUserID();

    //   if(!formValues.receipt.extension){
    //     let img = await getImageData(formValues.receipt);
    //     transactionData.receipt = img;
    //   }

    //   transactionData.id = Number(id);

    //   let allTransactions = {...transaction};

    //   allTransactions[userID][Number(id) - 1] = { ...transactionData };
      
    //   addData("transaction", JSON.stringify(allTransactions));
    //   navigate(`/transaction/${id}`,{state:{toast:true,msg:'Transaction updated!'}});
    // }
  };

  return (
    <div className="container">
      <div className="add-form">
        <Header></Header>

        <div className="feilds-container">
          <Form
            onSubmitMethod={editTransaction}
            buttonText="Update"
          />
        </div>
      </div>
    </div>
  );
};

export default EditTransaction;
