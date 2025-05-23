import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DashBoardEntity } from "@/pages/DashBoard/domain/entities/DashBoardEntity";
import type { DashBoardComponentState } from "./DashBoardComponent.state";

const initialState: DashBoardComponentState = {
  isSubmitting: false,
  nameInput: "",
  activeSample: null,
};

const dashBoardComponentSlice = createSlice({
  name: "dashBoardComponent",
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
  dashBoardComponentSlice.actions;

export const dashBoardComponentReducer = dashBoardComponentSlice.reducer;
