import { createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../services/localStorage";

const initialState = getUserData();
// const initialState=[];

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUSer(state, action) {
      if (state.length) {
        console.log("yes", action.payload);
        console.log("data", [...state, action.payload]);

        state = [...state, action.payload];
      } else {
        state = [action.payload];
      }
      return state;
    },
  },
});

export const { addUSer } = usersSlice.actions;
export default usersSlice.reducer;
