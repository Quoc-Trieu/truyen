import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInfo, getALLUser } from "./../../services/userServies";
import { getALLTreeByCondition } from './../../services/treeServices';

const initialState = {
  phone: null,
  userDetails: {},
  userInfo: {},
  infoALLUser: [],
  inoALLTree: [],
  loading: false,
  error: null,
};

export const getInfoUser = createAsyncThunk("user/getInfoUser", async (phone) => {
  const response = await getInfo(phone);
  return response?.data;
});

export const getALLInfoUser = createAsyncThunk("user/getALLInfoUser", async () => {
  const response = await getALLUser({ page: 1, limit: 10, userRole: "ADMIN" });
  console.log(response?.data);
  return response?.data;
});

export const getALLTree = createAsyncThunk("user/getALLTree", async () => {
  const response = await getALLTreeByCondition({ page: 1, limit: 10,});
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
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    resetUser: (state) => {
      return { ...initialState, phone: state.phone, userInfo: state.userInfo, infoALLUser: state.infoALLUser };
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
    });
    builder.addCase(getInfoUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getALLInfoUser.fulfilled, (state, action) => {
      state.infoALLUser = action.payload;
    });
    builder.addCase(getALLTree.fulfilled, (state, action) => {
      state.inoALLTree = action.payload;
    });
  },
});


// sử dụng useSelector để lấy dữ liệu từ store này
export const userInfoSelector = (state) => state.user.userInfo;
export const phoneUserSelector = (state) => state.user.phone;
export const userDetailsSelector = (state) => state.user.userDetails;
export const infoALLUserSelector = (state) => state.user.infoALLUser;
export const infoALLTreeSelector = (state) => state.user.inoALLTree;


export const { setPhone, clearPhone, setUserDetails } = userSlice.actions;
export default userSlice.reducer;
