import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PageState } from "./page.state";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";

const initialState: PageState = {
  isLoading: false,
  users: [],
};

const pageSlice = createSlice({
  name: "dashBoardPage",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<UserEntity[]>) {
      state.users = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setUsers, setLoading } = pageSlice.actions;

export const dashBoardPageReducer = pageSlice.reducer;
