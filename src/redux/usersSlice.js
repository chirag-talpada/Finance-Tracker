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
