import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, login, loginFingerPrint } from "../../services/authServices";
import { setToken } from "../../utils/localStorage";
import Notiflix from "notiflix";

export const getUserInformation = createAsyncThunk(
  "auth/getUserInformation",
  async ({ setLoading }) => {
    try {
      const user = await getUser();
      if (setLoading) {
        setLoading(false);
      }
      
      return user.data;
    } catch (error) {
      if (setLoading) {
        setLoading(false);
      }
      throw new Error("getUserInformation -- error", error);
    }
  }
);
