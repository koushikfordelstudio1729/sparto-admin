import type { AppDispatch, RootState } from "@/app/store/store";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { StorageService } from "@/commons/storage/StorageService";
import type { GetAllUserUseCase } from "../domain/usecases/GetAllUserUseCase";
import { setLoading, setUsers } from "./page.slice";
import type { UpdateUaserStatusUseCase } from "../domain/usecases/UpdateUserStatusUseCase";
import type { UpdateUaserUseCase } from "../domain/usecases/UpdateUserUseCase";
import type { UpdateUaserRoleUseCase } from "../domain/usecases/UpdateUserRoleUseCase";
import type { DeleteUserUseCase } from "../domain/usecases/DeleteUserUseCase";
import {
  setRoleFilter,
  setSearchTerm,
  setSelectedUser,
  setSelectedUsers,
  setShowDeleteModal,
  setShowEditModal,
  setShowViewModal,
  setStatusFilter,
} from "./components/Users/UsersComponent.slice";

export class DashBoardPageViewModel {
  private readonly dispatch: AppDispatch;
  private readonly getState: () => RootState;
  private readonly localStorageService: StorageService;
  private readonly getAllUserUseCase: GetAllUserUseCase;
  private readonly updateUserUseCase: UpdateUaserUseCase;
  private updateUserStatusUseCase: UpdateUaserStatusUseCase;
  private updateUserRoleUseCase: UpdateUaserRoleUseCase;
  private deleteUserUseCase: DeleteUserUseCase;

  constructor(
    dispatch: AppDispatch,
    getState: () => RootState,
    getAllUserUseCase: GetAllUserUseCase,
    localStorageService: StorageService,
    updateUserUseCase: UpdateUaserUseCase,
    updateUserStatusUseCase: UpdateUaserStatusUseCase,
    updateUserRoleUseCase: UpdateUaserRoleUseCase,
    deleteUserUseCase: DeleteUserUseCase
  ) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.getAllUserUseCase = getAllUserUseCase;
    this.localStorageService = localStorageService;
    this.updateUserUseCase = updateUserUseCase;
    this.updateUserStatusUseCase = updateUserStatusUseCase;
    this.updateUserRoleUseCase = updateUserRoleUseCase;
    this.deleteUserUseCase = deleteUserUseCase;
  }

  // Core initialization methods
  async initialize(): Promise<void> {
    this.dispatch(setLoading(true));
    try {
      const users = await this.getAllUser();
      this.dispatch(setUsers(users));
    } finally {
      this.dispatch(setLoading(false));
    }
  }

  async getAllUser(): Promise<UserEntity[]> {
    return await this.getAllUserUseCase.execute();
  }

  async logout(): Promise<void> {
    this.localStorageService.clearAll();
  }

  // Private helper method to refresh users
  private async refreshUsers(): Promise<void> {
    const users = await this.getAllUser();
    this.dispatch(setUsers(users));
  }

  // Core use case methods
  async updateUser(id: string, entity: UserEntity): Promise<void> {
    await this.updateUserUseCase.execute(id, entity);
    await this.refreshUsers();
  }

  async updateUserStatus(id: string, entity: UserEntity): Promise<void> {
    try {
      this.dispatch(setLoading(true));
      await this.updateUserStatusUseCase.execute(id, entity);
      await this.refreshUsers();
    } finally {
      this.dispatch(setLoading(false));
    }
  }

  async updateUserRole(id: string, entity: UserEntity): Promise<void> {
    try {
      this.dispatch(setLoading(true));
      await this.updateUserRoleUseCase.execute(id, entity);
      await this.refreshUsers();
    } finally {
      this.dispatch(setLoading(false));
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      this.dispatch(setLoading(true));
      await this.deleteUserUseCase.execute(id);
      await this.refreshUsers();
    } finally {
      this.dispatch(setLoading(false));
    }
  }

  // Modal management methods
  openEditModal(user: UserEntity): void {
    this.dispatch(setSelectedUser(user));
    this.dispatch(setShowEditModal(true));
  }

  openViewModal(user: UserEntity): void {
    this.dispatch(setSelectedUser(user));
    this.dispatch(setShowViewModal(true));
  }

  openDeleteModal(user: UserEntity): void {
    this.dispatch(setSelectedUser(user));
    this.dispatch(setShowDeleteModal(true));
  }

  closeAllModals(): void {
    this.dispatch(setShowEditModal(false));
    this.dispatch(setShowDeleteModal(false));
    this.dispatch(setShowViewModal(false));
    this.dispatch(setSelectedUser(null));
  }

  // Filter methods
  setSearchFilter(term: string): void {
    this.dispatch(setSearchTerm(term));
  }

  setRoleFilterValue(role: string): void {
    this.dispatch(setRoleFilter(role));
  }

  setStatusFilterValue(status: string): void {
    this.dispatch(setStatusFilter(status));
  }

  // Selection methods
  selectUsers(userIds: string[]): void {
    this.dispatch(setSelectedUsers(userIds));
  }

  getSelectedUsers(): string[] {
    return this.getState().usersComponentSlice.selectedUsers;
  }

  // Get filtered users based on current filters
  getFilteredUsers(): UserEntity[] {
    const state = this.getState();
    const { users } = state.dashBoardPageSlice;
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

  // Handle status change for a specific user
  async handleStatusChange(
    userId: string,
    newStatus: UserEntity["status"]
  ): Promise<void> {
    const users = this.getState().dashBoardPageSlice.users;
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    await this.updateUserStatus(userId, {
      ...user,
      status: newStatus,
    });
  }

  // Handle role change for a specific user
  async handleRoleChange(
    userId: string,
    newRole: UserEntity["role"]
  ): Promise<void> {
    const users = this.getState().dashBoardPageSlice.users;
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    await this.updateUserRole(userId, { ...user, role: newRole });
  }

  // Handle view user action
  handleViewUser(user: UserEntity): void {
    this.dispatch(setSelectedUser(user));
    this.dispatch(setShowViewModal(true));
  }

  // Handle edit user action
  handleEditUser(user: UserEntity): void {
    this.dispatch(setSelectedUser(user));
    this.dispatch(setShowEditModal(true));
  }

  // Handle delete user action
  handleDeleteUser(user: UserEntity): void {
    this.dispatch(setSelectedUser(user));
    this.dispatch(setShowDeleteModal(true));
  }

  // Handle save user action
  async handleSaveUser(user: UserEntity): Promise<void> {
    await this.updateUser(user.id, user);
    this.dispatch(setShowEditModal(false));
    this.dispatch(setSelectedUser(null));
  }

  // Handle delete confirmation
  async confirmDeleteUser(id: string): Promise<void> {
    await this.deleteUser(id);
    this.dispatch(setShowDeleteModal(false));
    this.dispatch(setSelectedUser(null));
  }

  // Handle bulk actions
  async handleBulkAction(action: string): Promise<void> {
    const selectedUsers = this.getSelectedUsers();
    const users = this.getState().dashBoardPageSlice.users;

    if (selectedUsers.length === 0) return;

    try {
      this.dispatch(setLoading(true));

      switch (action) {
        case "activate":
          for (const id of selectedUsers) {
            const user = users.find((u) => u.id === id);
            if (user) {
              await this.updateUserStatusUseCase.execute(id, {
                ...user,
                status: "active",
              });
            }
          }
          break;
        case "inactivate":
          for (const id of selectedUsers) {
            const user = users.find((u) => u.id === id);
            if (user) {
              await this.updateUserStatusUseCase.execute(id, {
                ...user,
                status: "inactive",
              });
            }
          }
          break;
        case "delete":
          for (const id of selectedUsers) {
            await this.deleteUserUseCase.execute(id);
          }
          break;
      }

      await this.refreshUsers();
      this.dispatch(setSelectedUsers([]));
    } finally {
      this.dispatch(setLoading(false));
    }
  }

  // Handle select all users
  handleSelectAll(checked: boolean): void {
    const filteredUsers = this.getFilteredUsers();
    this.dispatch(
      setSelectedUsers(checked ? filteredUsers.map((u) => u.id) : [])
    );
  }

  // Handle individual user selection
  handleSelectUser(userId: string, checked: boolean): void {
    const selectedUsers = this.getSelectedUsers();

    if (checked) {
      this.dispatch(setSelectedUsers([...selectedUsers, userId]));
    } else {
      this.dispatch(
        setSelectedUsers(selectedUsers.filter((id) => id !== userId))
      );
    }
  }

  // Helper methods for UI state
  isAllUsersSelected(): boolean {
    const filteredUsers = this.getFilteredUsers();
    const selectedUsers = this.getSelectedUsers();
    return (
      selectedUsers.length === filteredUsers.length && filteredUsers.length > 0
    );
  }

  isUserSelected(userId: string): boolean {
    const selectedUsers = this.getSelectedUsers();
    return selectedUsers.includes(userId);
  }

  getSelectedUsersCount(): number {
    return this.getSelectedUsers().length;
  }

  hasNoFilteredUsers(): boolean {
    return this.getFilteredUsers().length === 0;
  }

  // State getters for UI
  getModalStates() {
    const state = this.getState().usersComponentSlice;
    return {
      showViewModal: state.showViewModal,
      showEditModal: state.showEditModal,
      showDeleteModal: state.showDeleteModal,
      selectedUser: state.selectedUser,
    };
  }

  getFilterStates() {
    const state = this.getState().usersComponentSlice;
    return {
      searchTerm: state.searchTerm,
      statusFilter: state.statusFilter,
      roleFilter: state.roleFilter,
    };
  }

  getUsers(): UserEntity[] {
    return this.getState().dashBoardPageSlice.users;
  }

  // Get loading state
  isLoading(): boolean {
    return this.getState().dashBoardPageSlice.isLoading;
  }

  // Additional utility methods
  getUserById(id: string): UserEntity | undefined {
    const users = this.getUsers();
    return users.find((user) => user.id === id);
  }

  getUsersCount(): number {
    return this.getUsers().length;
  }

  getActiveUsersCount(): number {
    return this.getUsers().filter((user) => user.status === "active").length;
  }

  getInactiveUsersCount(): number {
    return this.getUsers().filter((user) => user.status === "inactive").length;
  }

  // Clear all filters
  clearAllFilters(): void {
    this.dispatch(setSearchTerm(""));
    this.dispatch(setRoleFilter("all"));
    this.dispatch(setStatusFilter("all"));
  }

  // Reset all selections
  clearAllSelections(): void {
    this.dispatch(setSelectedUsers([]));
  }
}
