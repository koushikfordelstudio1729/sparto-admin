import type { DashBoardEntity } from "@/pages/DashBoard/domain/entities/DashBoardEntity";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SettingsComponentState } from "./SettingsComponent.state";

const initialState: SettingsComponentState = {
  isSubmitting: false,
  nameInput: "",
  activeSample: null,
};

const settingsComponentSlice = createSlice({
  name: "settingsComponent",
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
  settingsComponentSlice.actions;

export const settingsComponentReducer = settingsComponentSlice.reducer;
