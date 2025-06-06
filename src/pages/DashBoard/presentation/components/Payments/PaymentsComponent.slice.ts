import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PaymentsComponentState } from "./PaymentsComponent.state";
import type { PaymentEntity } from "@/commons/domain/entities/PaymentEntity";

const initialState: PaymentsComponentState = {
  isLoading: false,
  payments: [],
};

const paymentsComponentSlice = createSlice({
  name: "paymentsComponent",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPayments(state, action: PayloadAction<PaymentEntity[]>) {
      state.payments = action.payload;
    },
    clearPayments(state) {
      state.payments = [];
    },
  },
});

export const { setLoading, setPayments, clearPayments } =
  paymentsComponentSlice.actions;

export const PaymentsComponentReducer = paymentsComponentSlice.reducer;
