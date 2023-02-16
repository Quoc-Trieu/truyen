import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import navResReducer from './navRes/navResSlice'
import userSlice from './user/UserSlice';

const store = configureStore({
  reducer: {
    navRes: navResReducer,
    auth: authSlice,
    user: userSlice,
  },
});

export default store;
