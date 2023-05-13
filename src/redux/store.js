import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from './transactionSlice'
import usersSlice from "./usersSlice";

const store=configureStore({
    reducer:{
        transactions:transactionReducer,
        users:usersSlice
    },
});

export default store;