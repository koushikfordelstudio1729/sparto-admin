import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PageState } from "./page.state";

const initialState: PageState = {
  isLoading: false,
};

const pageSlice = createSlice({
  name: "dashBoardPage",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = pageSlice.actions;

export const dashBoardPageReducer = pageSlice.reducer;
