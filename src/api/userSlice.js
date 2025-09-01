import { createSlice } from "@reduxjs/toolkit";
import {
  getUserFromLocal,
  removeUserFromLocal,
  setUserToLocal,
} from "../store/localStorage.jsx";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: getUserFromLocal(),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      setUserToLocal(state.user);
    },
    removeUser: (state) => {
      state.user = "";
      removeUserFromLocal();
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
