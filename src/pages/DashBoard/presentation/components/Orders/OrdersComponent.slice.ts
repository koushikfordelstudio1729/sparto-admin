import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrdersComponentState } from "./OrdersComponent.state";

const initialState: OrdersComponentState = {
  isLoading: false,
  allOrders: [],
};

const OrdersComponentSlice = createSlice({
  name: "OrdersComponent",
  initialState,
  reducers: {
    setAllOrders: (state, action: PayloadAction<OrderEntity[]>) => {
      state.allOrders = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAllOrders, setLoading } = OrdersComponentSlice.actions;

export const OrdersComponentReducer = OrdersComponentSlice.reducer;
