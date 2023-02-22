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
  itemScaping: { land: null, row: null, startTree: null, endTree: null },
  listScaping: [],
  userAutoComplete: {},
  idUserPartition: null,
  namePartition: null,
};

export const getALLUserAutoComplete = createAsyncThunk("assignment/getALLUserAutoComplete", async () => {
  try {
    const response = await getALLUser({
      page: 1,
      limit: 1000,
      userRole: "ADMIN",
    });
    console.log(response?.data);
    const result = response?.data?.users;
    const resultReduce = result.reduce((acc, cur) => acc.concat({ _id: cur?._id, fullName: cur?.fullName, phone: cur?.phone, role: cur?.role }), []);
    return resultReduce;
  } catch (error) {
    console.log(error);
  }
});

export const getNumTreeAssignment = createAsyncThunk("assignment/getNumTreeAssignment", async (num,{ getState }) => {
  try {
    // lấy idRow từ store
    const idRow = await getState().assignment.itemScaping.row;
    const response = await getALLTreeByCondition({ page: 1, limit: 5, idRow: idRow });
    console.log(response?.data);
    return response?.data;
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
    setUserAutoComplete: (state, action) => {
      state.userAutoComplete = action.payload;
    },
    setSearchingAssignment: (state, action) => {
      state.searchingAssignment = action.payload;
    },
    setItemScaping: (state, action) => {
      console.log(state, action.payload);
      state.itemScaping = { ...state.itemScaping, ...action.payload };
    },
    setListScaping: (state, action) => {
      state.listScaping = action.payload
    },
    setIdUserPartition: (state, action) => {
      state.idUserPartition = action.payload
    },
    setNamePartition: (state, action) => {
      state.namePartition = action.payload
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
    builder.addCase(getNumTreeAssignment.fulfilled, (state, action) => {
      state.itemScaping = { ...state.itemScaping, endTree: action.payload?.total, startTree: 1 };
    });
  },
});

// sử dụng useSelector để lấy dữ liệu từ store này
export const pageCurrentAssignmentSelector = (state) => state.assignment.pageCurrentAssignment;
export const searchingAssignmentSelector = (state) => state.assignment.searchingAssignment;
export const userAutoCompleteSelector = (state) => state.assignment.userAutoComplete;
export const itemScapingSelector = (state) => state.assignment.itemScaping;
export const listScapingSelector = (state) => state.assignment.listScaping;
export const idUserPartitionSelector = (state) => state.assignment.idUserPartition;
export const namePartitionSelector = (state) => state.assignment.namePartition;

// sử dụng useDispatch để dispatch action
export const { setPageCurrentAssignment, setSearchingAssignment, setUserAutoComplete, setItemScaping, setListScaping, setIdUserPartition, setNamePartition } = AssignmentSlice.actions;
export default AssignmentSlice.reducer;
