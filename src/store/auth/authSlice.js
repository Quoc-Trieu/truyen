import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getInfo } from './../../services/userServies';
import { getPhoneLocalStorage } from './../../utils/localStorage';
import ROLES from './../../constants/roles';

const initialState = {
  userInfo: {},
  role: null,
  permissionEdit: true,
  loading: false,
  error: null,
};

export const getInfoUser = createAsyncThunk(
  'auth/getInfoUser',
  async (phone = getPhoneLocalStorage()) => {
    const response = await getInfo(phone);
    return response?.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: (state) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getInfoUser.fulfilled, (state, action) => {
      state.loading = false;
      // Add user to the state array
      state.userInfo = action.payload;
      // set role từ api
      state.role = action.payload?.role.join();
      //dựa vào role để set quyền chỉnh sửa user 
      state.permissionEdit = Object.values(ROLES).find((role) => role.value === action.payload?.role.join())?.editUser;
      console.log('ROLE: ', action.payload?.role.join());
    });
    builder.addCase(getInfoUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// sử dụng useSelector để lấy dữ liệu từ store này
export const userInfoSelector = (state) => state.auth.userInfo;
export const roleUserSelector = (state) => state.auth.role;
export const permissionEdiSelector = (state) => state.auth.permissionEdit;
// export const { } = authSlice.actions;

export default authSlice.reducer;
