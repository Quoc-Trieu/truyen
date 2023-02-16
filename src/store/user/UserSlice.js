import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInfo } from "./../../services/userServies";

const initialState = {
  phone: null,
  userInfo: {},
  loading: false,
  error: null,
};

export const getInfoUser = createAsyncThunk("user/getInfoUser", async (phone) => {
  const response = await getInfo(phone);
  return response?.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    resetUser: (state) => {
      return { ...initialState, phone: state.phone, userInfo: state.userInfo };
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
  },
});


// sử dụng useSelector để lấy dữ liệu từ store này
export const userInfoSelector = (state) => state.user.userInfo;
export const phoneUserSelector = (state) => state.user.phone;

export const { setPhone, clearPhone } = userSlice.actions;
export default userSlice.reducer;
