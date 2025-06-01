import type { AppDispatch } from "@/app/store/store";
import { UpdateUaserStatusUseCase } from "@/pages/DashBoard/domain/usecases/UpdateUserStatusUseCase";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { UpdateUaserRoleUseCase } from "@/pages/DashBoard/domain/usecases/UpdateUserRoleUseCase";
import { setLoading } from "./UsersComponent.slice";
import type { DeleteUserUseCase } from "@/pages/DashBoard/domain/usecases/DeleteUserUseCase";

export class UsersComponentViewModel {
  private readonly dispatch: AppDispatch;
  private readonly updateUserStatusUseCase: UpdateUaserStatusUseCase;
  private readonly updateUserRoleUseCase: UpdateUaserRoleUseCase;
  private readonly deleteUserUseCase: DeleteUserUseCase;

  constructor(
    dispatch: AppDispatch,
    updateUserStatusUseCase: UpdateUaserStatusUseCase,
    updateUserRoleUseCase: UpdateUaserRoleUseCase,
    deleteUserUseCase: DeleteUserUseCase
  ) {
    this.dispatch = dispatch;
    this.updateUserStatusUseCase = updateUserStatusUseCase;
    this.updateUserRoleUseCase = updateUserRoleUseCase;
    this.deleteUserUseCase = deleteUserUseCase;
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
}
