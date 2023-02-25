import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInfo, getALLUser } from "./../../services/userServies";
import { getALLTreeByCondition } from "./../../services/treeServices";
import { getPhoneLocalStorage } from "./../../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import Notiflix from "notiflix";

const initialState = {
  phone: null,
  role: null,
  searching: null,
  pageCurrent: 1,
  pageTotal: null,
  userInfo: {},
  infoALLUser: {},
  filterUser: "ADMIN",
  loading: false,
  error: null,
};

export const getInfoUser = createAsyncThunk(
  "user/getInfoUser",
  async (phone = getPhoneLocalStorage()) => {
    const response = await getInfo(phone);
    return response?.data;
  }
);

export const getInfoUserBySearch = createAsyncThunk(
  "user/getInfoUserBySearch",
  async (text) => {
    try {
      const response = await getInfo(text);
      return response?.data;
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.code == "USER_NOT_FOUND") {
        Notiflix.Notify.info("Không tìm thấy người dùng");
      }
    }
  }
);

export const getALLInfoUser = createAsyncThunk(
  "user/getALLInfoUser",
  async (pageProp, { getState, dispatch }) => {
    // lấy trang hiện tại để reload List user
    const page = getState().user.pageCurrent;
    //kiểm tra người dùng có đang thực hiện search hay không, nếu thực hiện search thì lấy textSearch từ store gọi API search
    const searchText = getState().user.searching
    const role = getState().user.role;
    const fifter = getState().user.filterUser;

    let paramUserRole; //tham khảo cách trả về của BE để hiểu cách xử lý này
    if(role === "ADMIN"){
      paramUserRole = fifter; //chỉ có ADMIN mới đc lọc USER
    }else{
      if(role === "MANAGER"){
        paramUserRole = "MANAGER" //quản lý lấy tất cả USER
      }else{
        paramUserRole = "ADMIN" //
      }
    }

      try {
        const response = await getALLUser({
          page: pageProp ?? page,
          limit: 10,
          userRole: paramUserRole,
          query: searchText,
        });
        console.log(response?.data);
        return response?.data;
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.code == "PHONE_IS_EXIST") {
          Notiflix.Notify.info("Người dùng đã tồn tại");
        }
      }
    
  }
);

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
    setSearching: (state, action) => {
      state.searching = action.payload;
    },
    setFilterUser: (state, action) => {
      state.filterUser = action.payload;
    },
    resetUser: (state) => {
      return {
        ...initialState,
        phone: state.phone,
        role: state.role,
        userInfo: state.userInfo,
        infoALLUser: state.infoALLUser,
        searching: state.searching,
        pageCurrent: state.pageCurrent,
        pageTotal: state.pageTotal,
      };
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getInfoUser.fulfilled, (state, action) => {
      state.loading = false;
      // Add user to the state array
      state.userInfo = action.payload;
      state.role = action.payload?.role.join();
      console.log("ROLE: ",action.payload?.role.join());
      state.pageTotal = action.payload?.totalPages;
    });
    builder.addCase(getInfoUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getALLInfoUser.fulfilled, (state, action) => {
      state.infoALLUser = action.payload;
    });
    builder.addCase(getInfoUserBySearch.fulfilled, (state, action) => {
      // set object to array để cập nhập lại danh sách user
      state.infoALLUser = {
        users: [action.payload],
        totalPages: 1,
        totalUsers: 1,
      };
    });
  },
});

// sử dụng useSelector để lấy dữ liệu từ store này
export const userInfoSelector = (state) => state.user.userInfo;
export const phoneUserSelector = (state) => state.user.phone;
export const roleUserSelector = (state) => state.user.role;

export const pageCurrentUserSelector = (state) => state.user.pageCurrent;
// export const pageTotalUserSelector = (state) => state.user.pageTotal;
export const searchUserSelector = (state) => state.user.searching;

export const infoALLUserSelector = (state) => state.user.infoALLUser;

export const { setPhone, clearPhone, setPageCurrentUser, setSearching, setFilterUser } = userSlice.actions;
export default userSlice.reducer;
