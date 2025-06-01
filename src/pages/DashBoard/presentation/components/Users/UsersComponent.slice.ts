import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UsersComponentState } from "./UsersComponent.state";

const initialState: UsersComponentState = {
  isLoading: false,
};

const usersComponentSlice = createSlice({
  name: "UsersComponent",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = usersComponentSlice.actions;

export const usersComponentReducer = usersComponentSlice.reducer;
