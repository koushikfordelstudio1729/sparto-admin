import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { UsersComponentState } from "./UsersComponent.state";

const initialState: UsersComponentState = {
  isLoading: false,
  searchTerm: "",
  statusFilter: "all",
  roleFilter: "all",
  selectedUsers: [],
  showViewModal: false,
  showEditModal: false,
  showDeleteModal: false,
  selectedUser: null,
  userToDelete: "",
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
    addSelectedUser(state, action: PayloadAction<string>) {
      if (!state.selectedUsers.includes(action.payload)) {
        state.selectedUsers.push(action.payload);
      }
    },
    removeSelectedUser(state, action: PayloadAction<string>) {
      state.selectedUsers = state.selectedUsers.filter(
        (id) => id !== action.payload
      );
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
    setSelectedUser(state, action: PayloadAction<UserEntity | null>) {
      state.selectedUser = action.payload;
    },
    setUserToDelete(state, action: PayloadAction<string>) {
      state.userToDelete = action.payload;
    },
    resetModals(state) {
      state.showViewModal = false;
      state.showEditModal = false;
      state.showDeleteModal = false;
      state.selectedUser = null;
      state.userToDelete = "";
    },
    clearSelectedUsers(state) {
      state.selectedUsers = [];
    },
  },
});

export const {
  setLoading,
  setSearchTerm,
  setStatusFilter,
  setRoleFilter,
  setSelectedUsers,
  addSelectedUser,
  removeSelectedUser,
  setShowViewModal,
  setShowEditModal,
  setShowDeleteModal,
  setSelectedUser,
  setUserToDelete,
  resetModals,
  clearSelectedUsers,
} = usersComponentSlice.actions;

export const usersComponentReducer = usersComponentSlice.reducer;
