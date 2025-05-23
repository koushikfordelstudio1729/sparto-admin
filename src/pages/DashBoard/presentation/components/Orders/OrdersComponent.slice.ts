import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DashBoardEntity } from "@/pages/DashBoard/domain/entities/DashBoardEntity";
import type { OrdersComponentState } from "./OrdersComponent.state";

const initialState: OrdersComponentState = {
  isSubmitting: false,
  nameInput: "",
  activeSample: null,
};

const OrdersComponentSlice = createSlice({
  name: "OrdersComponent",
  initialState,
  reducers: {
    setSubmitting(state, action: PayloadAction<boolean>) {
      state.isSubmitting = action.payload;
    },

    setNameInput(state, action: PayloadAction<string>) {
      state.nameInput = action.payload;
    },

    setActiveSample(state, action: PayloadAction<DashBoardEntity | null>) {
      state.activeSample = action.payload;
    },
  },
});

export const { setSubmitting, setNameInput, setActiveSample } =
  OrdersComponentSlice.actions;

export const OrdersComponentReducer = OrdersComponentSlice.reducer;
