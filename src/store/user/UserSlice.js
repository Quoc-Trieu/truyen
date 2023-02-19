import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInfo, getALLUser } from "./../../services/userServies";
import { getALLTreeByCondition } from './../../services/treeServices';
import { getPhoneLocalStorage } from './../../utils/localStorage';
import { useSelector } from 'react-redux';

const initialState = {
  phone: null,
  role: null,
  pageCurrent: 1,
  pageTotal: null,
  userInfo: {},
  infoALLUser: [],
  loading: false,
  error: null,
};

export const getInfoUser = createAsyncThunk("user/getInfoUser", async (phone = getPhoneLocalStorage()) => {
  const response = await getInfo(phone);
  return response?.data;
});

export const getALLInfoUser = createAsyncThunk("user/getALLInfoUser", async (page) => {
  // const page = useSelector(pageCurrentUserSelector)
  const response = await getALLUser({ page: page, limit: 10, userRole: "ADMIN" });
  console.log(response?.data);
  return response?.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setPageCurrentUser: (state, action) => {
      state.pageCurrent = action.payload;
    },
    resetUser: (state) => {
      return { ...initialState, phone: state.phone, role: state.role, userInfo: state.userInfo, infoALLUser: state.infoALLUser };
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getInfo.fulfilled, (state, { payload }) => {
    //   state.userInfo = payload;
    // });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getInfoUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getInfoUser.fulfilled, (state, action) => {
      state.loading = false;
      // Add user to the state array
      state.userInfo = action.payload;
      state.role = action.payload?.role.join();
      state.pageTotal = action.payload?.totalPages;
    });
    builder.addCase(getInfoUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getALLInfoUser.fulfilled, (state, action) => {
      state.infoALLUser = action.payload;
    });
  },
});


// sử dụng useSelector để lấy dữ liệu từ store này
export const userInfoSelector = (state) => state.user.userInfo;
export const phoneUserSelector = (state) => state.user.phone;
export const roleUserSelector = (state) => state.user.role;

export const pageCurrentUserSelector = (state) => state.user.pageCurrent;
export const pageTotalUserSelector = (state) => state.user.pageTotal;

export const infoALLUserSelector = (state) => state.user.infoALLUser;

export const { setPhone, clearPhone, setPageCurrentUser } = userSlice.actions;
export default userSlice.reducer;
