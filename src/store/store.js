import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import navResReducer from './navRes/navResSlice'
import treeSlice from "./tree/TreeSlice";
import userSlice from './user/UserSlice';
import assignmentSlice from './assignment/AssignmentSlice';

const store = configureStore({
  reducer: {
    navRes: navResReducer,
    auth: authSlice,
    user: userSlice,
    tree: treeSlice,
    assignment: assignmentSlice,
  },
});

export default store;
