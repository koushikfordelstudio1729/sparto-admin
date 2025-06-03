import type { AppDispatch, RootState } from "@/app/store/store";
import { UpdateUaserStatusUseCase } from "@/pages/DashBoard/domain/usecases/UpdateUserStatusUseCase";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { UpdateUaserRoleUseCase } from "@/pages/DashBoard/domain/usecases/UpdateUserRoleUseCase";
import type { DeleteUserUseCase } from "@/pages/DashBoard/domain/usecases/DeleteUserUseCase";
import {
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
} from "./UsersComponent.slice";

export class UsersComponentViewModel {
  private readonly dispatch: AppDispatch;
  private readonly getState: () => RootState;
  private readonly updateUserStatusUseCase: UpdateUaserStatusUseCase;
  private readonly updateUserRoleUseCase: UpdateUaserRoleUseCase;
  private readonly deleteUserUseCase: DeleteUserUseCase;

  constructor(
    dispatch: AppDispatch,
    getState: () => RootState,
    updateUserStatusUseCase: UpdateUaserStatusUseCase,
    updateUserRoleUseCase: UpdateUaserRoleUseCase,
    deleteUserUseCase: DeleteUserUseCase
  ) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.updateUserStatusUseCase = updateUserStatusUseCase;
    this.updateUserRoleUseCase = updateUserRoleUseCase;
    this.deleteUserUseCase = deleteUserUseCase;
  }

  setSearchTerm(term: string): void {
    this.dispatch(setSearchTerm(term));
  }

  setStatusFilter(status: string): void {
    this.dispatch(setStatusFilter(status));
  }

  setRoleFilter(role: string): void {
    this.dispatch(setRoleFilter(role));
  }

  handleSelectAll(checked: boolean, filteredUsers: UserEntity[]): void {
    if (checked) {
      this.dispatch(setSelectedUsers(filteredUsers.map((u) => u.id)));
    } else {
      this.dispatch(setSelectedUsers([]));
    }
  }

  handleSelectUser(userId: string, checked: boolean): void {
    if (checked) {
      this.dispatch(addSelectedUser(userId));
    } else {
      this.dispatch(removeSelectedUser(userId));
    }
  }

  handleViewUser(user: UserEntity): void {
    this.dispatch(setSelectedUser(user));
    this.dispatch(setShowViewModal(true));
  }

  handleEditUser(user: UserEntity): void {
    this.dispatch(setSelectedUser(user));
    this.dispatch(setShowEditModal(true));
  }

  handleDeleteUser(userId: string): void {
    const users = this.getState().dashBoardPageSlice.users;
    const user = users.find((u) => u.id === userId);
    if (user) {
      this.dispatch(setUserToDelete(user.name));
      this.dispatch(setSelectedUser(user));
      this.dispatch(setShowDeleteModal(true));
    }
  }

  handleCloseViewModal(): void {
    this.dispatch(setShowViewModal(false));
    this.dispatch(setSelectedUser(null));
  }

  handleCloseEditModal(): void {
    this.dispatch(setShowEditModal(false));
    this.dispatch(setSelectedUser(null));
  }

  handleCloseDeleteModal(): void {
    this.dispatch(resetModals());
  }

  async updateUserStatus(id: string, entity: UserEntity): Promise<void> {
    try {
      this.dispatch(setLoading(true));
      await this.updateUserStatusUseCase.execute(id, entity);
    } finally {
      this.dispatch(setLoading(false));
    }
  }

  async updateUserRole(id: string, entity: UserEntity): Promise<void> {
    try {
      this.dispatch(setLoading(true));
      await this.updateUserRoleUseCase.execute(id, entity);
    } finally {
      this.dispatch(setLoading(false));
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      this.dispatch(setLoading(true));
      await this.deleteUserUseCase.execute(id);
      this.dispatch(resetModals());
    } finally {
      this.dispatch(setLoading(false));
    }
  }

  async handleStatusChange(
    userId: string,
    newStatus: UserEntity["status"]
  ): Promise<void> {
    const users = this.getState().dashBoardPageSlice.users;
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const updatedUser: UserEntity = {
      ...user,
      status: newStatus,
    };

    await this.updateUserStatus(userId, updatedUser);
  }

  handleRoleChange(userId: string, newRole: UserEntity["role"]): void {
    const users = this.getState().dashBoardPageSlice.users;
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const updatedUser: UserEntity = {
      ...user,
      role: newRole,
    };

    this.updateUserRole(userId, updatedUser);
  }

  handleBulkAction(action: string): void {
    const selectedUsers = this.getState().usersComponentSlice.selectedUsers;
    if (selectedUsers.length === 0) return;

    switch (action) {
      case "activate":
        // Implement bulk activate logic
        break;
      case "inactivate":
        // Implement bulk inactivate logic
        break;
      case "delete":
        // Implement bulk delete logic
        break;
    }
    this.dispatch(clearSelectedUsers());
  }

  getFilteredUsers(): UserEntity[] {
    const state = this.getState();
    const users = state.dashBoardPageSlice.users;
    const { searchTerm, statusFilter, roleFilter } = state.usersComponentSlice;

    return users.filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;
      const matchesRole = roleFilter === "all" || user.roleId === roleFilter;
      return matchesSearch && matchesStatus && matchesRole;
    });
  }
}
