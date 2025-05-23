import type { DashBoardEntity } from "@/pages/DashBoard/domain/entities/DashBoardEntity";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProfileComponentState } from "./ProfileComponent.state";

const initialState: ProfileComponentState = {
  isSubmitting: false,
  nameInput: "",
  activeSample: null,
};

const profileComponentSlice = createSlice({
  name: "ProfileComponent",
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
  profileComponentSlice.actions;

export const profileComponentReducer = profileComponentSlice.reducer;
