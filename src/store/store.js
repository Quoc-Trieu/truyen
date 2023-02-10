import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import navResReducer from './navRes/navResSlice'

const store = configureStore({
  reducer: {
    navRes: navResReducer,
    auth: authSlice,
  },
});

export default store;
