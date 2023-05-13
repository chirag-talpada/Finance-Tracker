import React from "react";
import { useNavigate } from "react-router-dom";
import "./AddTransaction.css";

import Header from "./components/Header/Header";
import Form from "../../components/Form";

import { useDispatch,useSelector } from "react-redux";
import { add } from "../../redux/transactionSlice";

import { getImageData } from "../../services/ImageBase24";
import { getUserID } from "../../services/authentication";
import { convertDate } from "../../helper/date";



const AddTransaction = () => {
  const navigate = useNavigate();
 
  const dispatch=useDispatch();
  
  const {transactions}=useSelector((state)=>{
    return state
  });


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

    
    let allUserData = transactions;
    

    if (allUserData[userID] === undefined) {
      transactionData.id = 1;
      id = 1;
      dispatch(add({data:transactionData,userID}))

    } else {
      let prevData = {...transactions};
      transactionData.id = prevData[userID].length + 1;
      id = prevData[userID].length + 1;   
      dispatch(add({data:transactionData,userID}))
      
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
