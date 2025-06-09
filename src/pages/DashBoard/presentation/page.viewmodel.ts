import type { AppDispatch, RootState } from "@/app/store/store";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { StorageService } from "@/commons/storage/StorageService";
import type { GetAllUserUseCase } from "../domain/usecases/GetAllUserUseCase";
import { setLoading, setUsers } from "./page.slice";

export class DashBoardPageViewModel {
  private readonly dispatch: AppDispatch;
  private readonly localStorageService: StorageService;
  private readonly getAllUserUseCase: GetAllUserUseCase;
  private readonly getState: () => RootState;

  constructor(
    dispatch: AppDispatch,
    getState: () => RootState,
    getAllUserUseCase: GetAllUserUseCase,
    localStorageService: StorageService
  ) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.getAllUserUseCase = getAllUserUseCase;
    this.localStorageService = localStorageService;
  }

  async initialize(): Promise<void> {
    this.dispatch(setLoading(true));

    const users = await this.getAllUser();
    this.dispatch(setUsers(users));
    this.dispatch(setLoading(false));
  }

  async getAllUser(): Promise<UserEntity[]> {
    return await this.getAllUserUseCase.execute();
  }

  async logout(): Promise<void> {
    this.localStorageService.clearAll();
  }
  // In DashBoardPageViewModel

  /**
   * Returns counts of total, active and deleted users.
   */
  // public getUserCounts(): { total: number; active: number; deleted: number } {
  //   const users = this.getState().dashBoardPageSlice.users;
  //   const total = users.length;
  //   const active = users.filter((u) => u.status === "active").length;
  //   const deleted = users.filter((u) => u.status === "deleted").length;
  //   return { total, active, deleted };
  // }
  public getUserCounts() {
    const { totalUsers, activeUsers, deletedUsers } =
      this.getState().dashBoardPageSlice;
    return { total: totalUsers, active: activeUsers, deleted: deletedUsers };
  }
}
