import {
  setSelectedUser,
  setShowEditModal,
  setShowDeleteModal,
  setShowViewModal,
  setSelectedUsers,
  setLoading,
  setSearchTerm,
  setRoleFilter,
  setStatusFilter,
} from "./UsersComponent.slice";
import type { AppDispatch, RootState } from "@/app/store/store";
import { UpdateUaserStatusUseCase } from "@/pages/DashBoard/domain/usecases/UpdateUserStatusUseCase";
import { DeleteUserUseCase } from "@/pages/DashBoard/domain/usecases/DeleteUserUseCase";
import type { UpdateUaserRoleUseCase } from "@/pages/DashBoard/domain/usecases/UpdateUserRoleUseCase";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { UpdateUaserUseCase } from "@/pages/DashBoard/domain/usecases/UpdateUserUseCase";

export class UsersComponentViewModel {
  private dispatch: AppDispatch;
  private getState: () => RootState;
  private readonly updateUserUseCase: UpdateUaserUseCase;
  private updateUserStatusUseCase: UpdateUaserStatusUseCase;
  private updateUserRoleUseCase: UpdateUaserRoleUseCase;
  private deleteUserUseCase: DeleteUserUseCase;

  constructor(
    dispatch: AppDispatch,
    getState: () => RootState,
    updateUserUseCase: UpdateUaserUseCase,
    updateUserStatusUseCase: UpdateUaserStatusUseCase,
    updateUserRoleUseCase: UpdateUaserRoleUseCase,
    deleteUserUseCase: DeleteUserUseCase
  ) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.updateUserUseCase = updateUserUseCase;
    this.updateUserStatusUseCase = updateUserStatusUseCase;
    this.updateUserRoleUseCase = updateUserRoleUseCase;
    this.deleteUserUseCase = deleteUserUseCase;
  }
  async updateUser(id: string, entity: UserEntity): Promise<void> {
    await this.updateUserUseCase.execute(id, entity);
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
    } finally {
      this.dispatch(setLoading(false));
    }
  }

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

  setSearchFilter(term: string): void {
    this.dispatch(setSearchTerm(term));
  }

  setRoleFilterValue(role: string): void {
    this.dispatch(setRoleFilter(role));
  }

  setStatusFilterValue(status: string): void {
    this.dispatch(setStatusFilter(status));
  }

  selectUsers(userIds: string[]): void {
    this.dispatch(setSelectedUsers(userIds));
  }

  getSelectedUsers(): string[] {
    return this.getState().usersComponentSlice.selectedUsers;
  }
}
