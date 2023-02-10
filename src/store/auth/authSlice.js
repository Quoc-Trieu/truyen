import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin, getUserInformation } from "./authThunk";
import Notiflix from "notiflix";

const initialState = {
  user: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      Notiflix.Notify.success("Đăng xuất thành công");
      return {
        ...state,
        user: null,
      };
    },
  },
  extraReducers: {
    // [fetchLogin.pending]: (state) => ({
    //   ...state,
    //   isLoading: true,
    // }),
    // [fetchLogin.fulfilled]: (state, action) => ({
    //   ...state,
    //   isLoading: false,
    //   user: { ...action.payload },
    // }),
    // [fetchLogin.rejected]: (state) => ({
    //   ...state,
    //   isLoading: false,
    // }),
    [getUserInformation.fulfilled]: (state, action) => ({
      ...state,
      user: { ...action.payload },
      isLoading: false,
    }),
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
