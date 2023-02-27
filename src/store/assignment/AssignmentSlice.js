import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInfo, getALLUser } from "./../../services/userServies";
import { getALLTreeByCondition } from "./../../services/treeServices";
import { getPhoneLocalStorage } from "./../../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import Notiflix from "notiflix";

const initialState = {
  searchingAssignment: null,
  pageCurrentAssignment: 1,
  pageTotalAssignment: null,
  listScaping: [],
  userAutoComplete: {},
  idUserPartition: null,
  namePartition: null,
  catchError: {idUserPartitionError: "", namePartitionError:"", landError: "", rowError: ""},  // lưu trữ lỗi
  idScapingEdit: null,
  isEdit: false,
  listScapingFocusEdit: [],
};

export const getALLUserAutoComplete = createAsyncThunk("assignment/getALLUserAutoComplete", async (prop, { getState }) => {
  try {
    const response = await getALLUser({
      page: 1,
      limit: 1000,
      userRole: getState().user.role,
      userStatus: "ACTIVE",
    });
    console.log(response?.data);
    const result = response?.data?.users;
    const resultReduce = result.reduce((acc, cur) => acc.concat({ _id: cur?._id, fullName: cur?.fullName, phone: cur?.phone, role: cur?.role }), []);
    return resultReduce;
  } catch (error) {
    console.log(error);
  }
});

const AssignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    setPageCurrentAssignment: (state, action) => {
      state.pageCurrentAssignment = action.payload;
    },
    setSearchingAssignment: (state, action) => {
      state.searchingAssignment = action.payload;
    },
    setListScaping: (state, action) => {
      state.listScaping = action.payload;
    },
    setIdUserPartition: (state, action) => {
      state.idUserPartition = action.payload;
    },
    setNamePartition: (state, action) => {
      state.namePartition = action.payload;
    },
    setCatchError: (state, action) => {
      state.catchError = { ...state.catchError, ...action.payload };
    },
    clearError: (state, action) => {
      state.catchError = initialState.catchError;
    },
    setIdScapingEdit: (state, action) => {
      state.idScapingEdit = action.payload;
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setListScapingFocusEdit: (state, action) => {
      state.listScapingFocusEdit = action.payload;
    },
    resetSpacing: (state, action) => {
      state.catchError = initialState.catchError;
      state.idUserPartition = initialState.idUserPartition;
      state.namePartition = initialState.namePartition;
      state.listScaping = initialState.listScaping;
      state.isEdit = initialState.isEdit;
    },
    resetAssignment: (state) => {
      return {
        ...initialState,
        searchingAssignment: state.searchingAssignment,
        pageCurrentAssignment: state.pageCurrentAssignment,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getALLUserAutoComplete.fulfilled, (state, action) => {
      state.userAutoComplete = action.payload;
    });
  },
});

// sử dụng useSelector để lấy dữ liệu từ store này
export const pageCurrentAssignmentSelector = (state) => state.assignment.pageCurrentAssignment;
export const searchingAssignmentSelector = (state) => state.assignment.searchingAssignment;
export const userAutoCompleteSelector = (state) => state.assignment.userAutoComplete;
export const listScapingSelector = (state) => state.assignment.listScaping;
export const idUserPartitionSelector = (state) => state.assignment.idUserPartition;
export const namePartitionSelector = (state) => state.assignment.namePartition;
export const catchErrorSelector = (state) => state.assignment.catchError;
export const idScapingEditSelector = (state) => state.assignment.idScapingEdit;
export const isEditSelector = (state) => state.assignment.isEdit;
export const listScapingFocusEditSelector = (state) => state.assignment.listScapingFocusEdit;

// sử dụng useDispatch để dispatch action
export const {
  setPageCurrentAssignment,
  setSearchingAssignment,
  setListScaping,
  setIdUserPartition,
  setNamePartition,
  setCatchError,
  clearError,
  resetSpacing,
  setIdScapingEdit,
  setIsEdit,
  setListScapingFocusEdit,
} = AssignmentSlice.actions;
export default AssignmentSlice.reducer;
