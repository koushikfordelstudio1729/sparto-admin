import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PaymentsComponentState } from "./PaymentsComponent.state";

const initialState: PaymentsComponentState = {
  isLoading: false,
};

const paymentsComponentSlice = createSlice({
  name: "paymentsComponent",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = paymentsComponentSlice.actions;

export const OrdersComponentReducer = paymentsComponentSlice.reducer;
