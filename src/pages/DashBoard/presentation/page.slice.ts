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
    updateUserInList(state, action: PayloadAction<UserEntity>) {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

export const { setUsers, setLoading, updateUserInList } = pageSlice.actions;

export const dashBoardPageReducer = pageSlice.reducer;
