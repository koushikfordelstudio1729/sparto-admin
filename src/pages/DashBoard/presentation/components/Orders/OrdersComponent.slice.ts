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
    updateOrderInList: (state, action: PayloadAction<OrderEntity>) => {
      const updatedOrder = action.payload;
      const index = state.allOrders.findIndex(
        (order) => order.id === updatedOrder.id
      );
      if (index !== -1) {
        state.allOrders[index] = updatedOrder;
      }
    },
  },
});

export const {
  setAllOrders,
  setLoading,
  updateOrderInList, // ← export it here
} = OrdersComponentSlice.actions;

export const OrdersComponentReducer = OrdersComponentSlice.reducer;
