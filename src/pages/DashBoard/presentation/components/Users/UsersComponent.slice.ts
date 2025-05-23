import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DashBoardEntity } from "@/pages/DashBoard/domain/entities/DashBoardEntity";
import type { UsersComponentState } from "./UsersComponent.state";

const initialState: UsersComponentState = {
  isSubmitting: false,
  nameInput: "",
  activeSample: null,
};

const usersComponentSlice = createSlice({
  name: "UsersComponent",
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
  usersComponentSlice.actions;

export const usersComponentReducer = usersComponentSlice.reducer;
