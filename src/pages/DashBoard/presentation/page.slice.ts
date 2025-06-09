// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import type { PageState } from "./page.state";
// import type { UserEntity } from "@/commons/domain/entities/UserEntity";

// const initialState: PageState = {
//   isLoading: false,
//   users: [],
// };

// const pageSlice = createSlice({
//   name: "dashBoardPage",
//   initialState,
//   reducers: {
//     setUsers(state, action: PayloadAction<UserEntity[]>) {
//       state.users = action.payload;
//     },
//     setLoading(state, action: PayloadAction<boolean>) {
//       state.isLoading = action.payload;
//     },
//     updateUserInList(state, action: PayloadAction<UserEntity>) {
//       const index = state.users.findIndex((u) => u.id === action.payload.id);
//       if (index !== -1) {
//         state.users[index] = action.payload;
//       }
//     },
//   },
// });

// export const { setUsers, setLoading, updateUserInList } = pageSlice.actions;

// export const dashBoardPageReducer = pageSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PageState } from "./page.state";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";

// Initial state now includes precomputed counts
const initialState: PageState = {
  isLoading: false,
  users: [],
  totalUsers: 0,
  activeUsers: 0,
  inactiveUsers: 0,
  deletedUsers: 0,
};

/**
 * Dashboard page slice with users list and user counts
 */
const pageSlice = createSlice({
  name: "dashBoardPage",
  initialState,
  reducers: {
    /**
     * Replace entire user list and recompute counts
     */
    setUsers(state, action: PayloadAction<UserEntity[]>) {
      state.users = action.payload;
      state.totalUsers = action.payload.length;
      state.activeUsers = action.payload.filter(
        (u) => u.status === "active"
      ).length;
      state.inactiveUsers = action.payload.filter(
        (u) => u.status === "inactive"
      ).length;
      state.deletedUsers = action.payload.filter(
        (u) => u.status === "deleted"
      ).length;
    },

    /** Toggle loading indicator */
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    /**
     * Update a single user in place and recompute counts
     */
    updateUserInList(state, action: PayloadAction<UserEntity>) {
      const updated = action.payload;
      const idx = state.users.findIndex((u) => u.id === updated.id);
      if (idx !== -1) {
        state.users[idx] = updated;
      }
      // Recalculate counts
      state.totalUsers = state.users.length;
      state.activeUsers = state.users.filter(
        (u) => u.status === "active"
      ).length;
      state.inactiveUsers = state.users.filter(
        (u) => u.status === "inactive"
      ).length;
      state.deletedUsers = state.users.filter(
        (u) => u.status === "deleted"
      ).length;
    },

    /**
     * Utility action to recalculate counts from existing state.users
     */
    recalcUserCounts(state) {
      state.totalUsers = state.users.length;
      state.activeUsers = state.users.filter(
        (u) => u.status === "active"
      ).length;
      state.inactiveUsers = state.users.filter(
        (u) => u.status === "inactive"
      ).length;
      state.deletedUsers = state.users.filter(
        (u) => u.status === "deleted"
      ).length;
    },
  },
});

export const { setUsers, setLoading, updateUserInList, recalcUserCounts } =
  pageSlice.actions;

export const dashBoardPageReducer = pageSlice.reducer;
