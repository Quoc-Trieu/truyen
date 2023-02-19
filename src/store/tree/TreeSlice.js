import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getALLTreeByCondition } from '../../services/treeServices';

const initialState = {
  pageCurrentTree: 1,
  pageTotal: null,
  infoALLTree: [],
  loading: false,
};

export const getALLTrees = createAsyncThunk("tree/getALLTree", async (page=1) => {
  const response = await getALLTreeByCondition({ page, limit: 10});
  console.log(response?.data);
  return response?.data;
});

const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    setPageCurrentTree: (state, action) => {
      state.pageCurrentTree = action.payload;
    },
    resetTree: (state) => {
      return { ...initialState, pageCurrentTree: state.pageCurrentTree, infoALLTree: state.ifnoALLTree };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getALLTrees.fulfilled, (state, action) => {
      state.infoALLTree = action.payload;
    });
  },
});


// sử dụng useSelector để lấy dữ liệu từ store này
export const pageCurrentTreeSelector = (state) => state.tree.pageCurrentTree;
export const infoALLTreeSelector = (state) => state.tree.infoALLTree;


export const { setPageCurrentTree } = treeSlice.actions;
export default treeSlice.reducer;
