import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { api, url } from "shared";
import { RES_IDLE, RES_STATUS } from "shared/constant/response.constant";
import { setPending, setRejected, setSucceed } from "shared/function/redux.function";


export const postProduct = createAsyncThunk(
  "product/POST_PRODUCT",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await api.post(`${url}/product`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue({ error: error.response.data.message });
    }
  }
)

export const getProduct = createAsyncThunk(
  "product/FETCH_PRODUCT",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${url}/product`);
      return res?.data;
    } catch (error: any) {
      return rejectWithValue({ error: error.response.data.message });
    }
  }
)

const slice = createSlice({
  name: "product",
  initialState: {
    listProduct: [],
    status: "idle",
    error: "",
  },
  reducers: {
    clearStatus: (state: any) => {
      state.status = RES_IDLE;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //POST_PRODUCT
    builder.addCase(postProduct.pending, (state) => setPending(state));
    builder.addCase(postProduct.fulfilled, (state) => setSucceed(state));
    builder.addCase(postProduct.rejected, (state, action) => setRejected(state, action));
    //FETCH_PRODUCT
    builder.addCase(getProduct.pending, (state) => setPending(state));
    builder.addCase(getProduct.fulfilled, (state, { payload }: any) => setProductList(state, payload));
    builder.addCase(getProduct.rejected, (state, action) => setRejected(state, action));
  }
})

export const { clearStatus } = slice.actions;
export default slice.reducer;

export const getProductList = createSelector(
  (state: any) => ({ listProduct: state.entities.product.listProduct }),
  state => state
)

const setProductList = (state: any, payload: any) => {
  state.listProduct = payload;
  state.status = RES_STATUS.SUCCEEDED;
  state.error = "";
};