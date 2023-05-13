import { createSlice } from "@reduxjs/toolkit";
import { getData } from "../services/localStorage";

const initialState = getData("transaction");
// const initialState={};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    add(state, action) {

        if(state[action.payload.userID]){
            state[action.payload.userID] = [...state[action.payload.userID],action.payload.data];
        }else{
            state[action.payload.userID] = [action.payload.data];
        }
    },
    remove(state, action) {
      
      state[action.payload.userID]=[...state[action.payload.userID]].filter((x) => x.id !== action.payload.id);
     
    },
    update(state,action){
        state[action.payload.userID][Number(action.payload.id) - 1] = { ...action.payload.data };
    }
  },
});

export const { add, remove,update } = transactionSlice.actions;
export default transactionSlice.reducer;
