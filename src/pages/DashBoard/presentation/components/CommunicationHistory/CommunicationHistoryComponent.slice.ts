import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CommunicationHistoryComponentState } from "./CommunicationHistoryComponent.state";

const initialState: CommunicationHistoryComponentState = {
  isLoading: false,
};

const communicationHistoryComponentSlice = createSlice({
  name: "CommunicationHistoryComponent",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = communicationHistoryComponentSlice.actions;

export const OrdersComponentReducer =
  communicationHistoryComponentSlice.reducer;
