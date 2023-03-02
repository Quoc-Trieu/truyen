import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getALLTreeByCondition } from '../../services/treeServices';

const initialState = {
  pageCurrentTree: 1,
  pageTotal: null,
  infoALLTree: [],
  filter: { typeTree: null, land: null, row: null, nameTree: null },
  loading: false,
};

export const getALLTrees = createAsyncThunk("tree/getALLTree", async (resetPage = false, { getState, dispatch }) => {
  if (resetPage) {
    dispatch(setPageCurrentTree(1));
  }
  const filter = getState().tree.filter;
  const pageCurrent = getState().tree.pageCurrentTree;

  // cộng chuỗi tìm kiếm cây theo id cây
  let concatFindTree = null;
  if (filter.nameTree) {
    concatFindTree = filter.row + filter.nameTree;
  }

  const response = await getALLTreeByCondition({ page: pageCurrent, limit: 10, typeTree: filter.typeTree, idLand: filter.land, idRow: filter.row, idTree: concatFindTree });
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
    setFilter: (state, action) => {
      console.log(state, action.payload);
      state.filter = { ...state.filter, ...action.payload };
    },
    resetTree: (state) => {
      return { ...initialState, pageCurrentTree: state.pageCurrentTree, infoALLTree: state.infoALLTree };
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
export const filterTreeSelector = (state) => state.tree.filter;


export const { setPageCurrentTree, setFilter } = treeSlice.actions;
export default treeSlice.reducer;
