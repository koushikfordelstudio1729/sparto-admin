import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UsersComponentState } from "./UsersComponent.state";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";

const initialState: UsersComponentState = {
  isLoading: false,
  searchTerm: "",
  statusFilter: "all",
  roleFilter: "all",
  selectedUsers: [],
  selectedUser: null,
  showViewModal: false,
  showEditModal: false,
  showDeleteModal: false,
};

const usersComponentSlice = createSlice({
  name: "UsersComponent",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<string>) {
      state.statusFilter = action.payload;
    },
    setRoleFilter(state, action: PayloadAction<string>) {
      state.roleFilter = action.payload;
    },
    setSelectedUsers(state, action: PayloadAction<string[]>) {
      state.selectedUsers = action.payload;
    },
    setSelectedUser(state, action: PayloadAction<UserEntity | null>) {
      state.selectedUser = action.payload;
    },
    setShowViewModal(state, action: PayloadAction<boolean>) {
      state.showViewModal = action.payload;
    },
    setShowEditModal(state, action: PayloadAction<boolean>) {
      state.showEditModal = action.payload;
    },
    setShowDeleteModal(state, action: PayloadAction<boolean>) {
      state.showDeleteModal = action.payload;
    },
  },
});

export const {
  setLoading,
  setSearchTerm,
  setStatusFilter,
  setRoleFilter,
  setSelectedUsers,
  setSelectedUser,
  setShowViewModal,
  setShowEditModal,
  setShowDeleteModal,
} = usersComponentSlice.actions;

export const usersComponentReducer = usersComponentSlice.reducer;
