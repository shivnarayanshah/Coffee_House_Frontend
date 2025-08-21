import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "../api/mainApi.jsx";
import { userSlice } from "../api/userSlice.js";

const reduxStore = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([mainApi.middleware]),
});

export default reduxStore;
