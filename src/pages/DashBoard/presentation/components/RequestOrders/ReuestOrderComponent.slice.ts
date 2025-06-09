// RequestOrdersComponent.slice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RequestEntity } from "@/commons/domain/entities/RequestEntity";

import type { RequestOrdersState } from "./ReuestOrderComponent.type";

const initialState: RequestOrdersState = {
  requestOrders: [],
  loading: false,
  error: null,
};

const requestOrdersSlice = createSlice({
  name: "requestOrders",
  initialState,
  reducers: {
    /** Set the loading flag while fetching */
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    /** Replace the orders array with the fetched data */
    setRequestedOrders(state, action: PayloadAction<RequestEntity[]>) {
      state.requestOrders = action.payload;
      state.error = null;
    },
    /** If something went wrong */
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.requestOrders = [];
    },
    /** (Optional) clear out state—handy on logout or unmount */
    resetRequestedOrdersState(state) {
      state.requestOrders = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setRequestedOrders,
  setError,
  resetRequestedOrdersState,
} = requestOrdersSlice.actions;

export default requestOrdersSlice.reducer;
