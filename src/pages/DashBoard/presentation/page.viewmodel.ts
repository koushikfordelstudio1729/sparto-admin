import type { AppDispatch } from "@/app/store/store";
import type { StorageService } from "@/commons/storage/StorageService";
import type { GetAllUserUseCase } from "../domain/usecases/GetAllUserUseCase";
import { setLoading, setUsers } from "./page.slice";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";

export class DashBoardPageViewModel {
  private readonly dispatch: AppDispatch;
  private readonly localStorageService: StorageService;

  private readonly getAllUserUseCase: GetAllUserUseCase;

  constructor(
    dispatch: AppDispatch,
    getAllUserUseCase: GetAllUserUseCase,
    localStorageService: StorageService
  ) {
    this.dispatch = dispatch;
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
}
