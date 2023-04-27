import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getInfo, getALLUser } from './../../services/userServies';
import Notiflix from 'notiflix';
import { roleUserSelector } from '../auth/authSlice';

const initialState = {
  searching: null,
  pageCurrent: 1,
  pageTotal: null,
  listUser: {},
  filterUser: null,
  loading: false,
  error: null,
};


export const getALLInfoUser = createAsyncThunk('user/getALLInfoUser', async (pageProp, { getState, dispatch }) => {
  // // lấy trang hiện tại để reload List user
  // const page = getState().user.pageCurrent;
  // //kiểm tra người dùng có đang thực hiện search hay không, nếu thực hiện search thì lấy textSearch từ store gọi API search
  // const searchText = getState().user.searching;
  // const role = roleUserSelector;
  // const fifter = getState().user.filterUser;

  // let paramUserRole; //tham khảo cách trả về của BE để hiểu cách xử lý này
  // if (role === 'ADMIN') {
  //   paramUserRole = 'ROOT'; //chỉ có ADMIN mới đc lọc USER
  // } else {
  //   if (role === 'MANAGER') {
  //     paramUserRole = 'MANAGER'; //quản lý lấy tất cả USER
  //   } else {
  //     paramUserRole = 'ADMIN'; //
  //   }
  // }

  // try {
  //   const response = await getALLUser({
  //     page: pageProp ?? page,
  //     limit: 10,
  //     userRole: paramUserRole,
  //     query: searchText,
  //   });
  //   console.log(response?.data);
  //   return response?.data;
  // } catch (error) {
  //   console.log(error);
  //   if (error?.response?.data?.code == 'PHONE_IS_EXIST') {
  //     Notiflix.Notify.info('Người dùng đã tồn tại');
  //   }
  // }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPageCurrentUser: (state, action) => {
      state.pageCurrent = action.payload;
    },
    setSearching: (state, action) => {
      state.searching = action.payload;
    },
    setFilterUser: (state, action) => {
      state.filterUser = action.payload;
    },
    setListUser: (state, action) => {
      state.listUser = action.payload;
    },
    resetUser: (state) => {
      return {
        ...initialState,
      };
    },
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getALLInfoUser.fulfilled, (state, action) => {
      state.listUser = action.payload;
    });
  },
});

// sử dụng useSelector để lấy dữ liệu từ store này
export const pageCurrentUserSelector = (state) => state.user.pageCurrent;
// export const pageTotalUserSelector = (state) => state.user.pageTotal;
export const searchUserSelector = (state) => state.user.searching;

export const listUserSelector = (state) => state.user.listUser;
export const filterUserUserSelector = (state) => state.user.filterUser;

export const { setPageCurrentUser, setSearching, setFilterUser } = userSlice.actions;
export default userSlice.reducer;
