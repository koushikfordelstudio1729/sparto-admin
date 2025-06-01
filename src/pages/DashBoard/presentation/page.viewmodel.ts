import type { AppDispatch } from "@/app/store/store";
import type { StorageService } from "@/commons/storage/StorageService";
import type { GetAllUserUseCase } from "../domain/usecases/GetAllUserUseCase";
import { setLoading, setUsers } from "./page.slice";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { UpdateUaserUseCase } from "../domain/usecases/UpdateUserUseCase";

export class DashBoardPageViewModel {
  private readonly dispatch: AppDispatch;
  private readonly localStorageService: StorageService;
  private readonly getAllUserUseCase: GetAllUserUseCase;
  private readonly updateUserUseCase: UpdateUaserUseCase;
  constructor(
    dispatch: AppDispatch,
    getAllUserUseCase: GetAllUserUseCase,
    updateUserUseCase: UpdateUaserUseCase,
    localStorageService: StorageService
  ) {
    this.dispatch = dispatch;
    this.getAllUserUseCase = getAllUserUseCase;
    this.updateUserUseCase = updateUserUseCase;
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

  async updateUser(id: string, entity: UserEntity): Promise<void> {
    await this.updateUserUseCase.execute(id, entity);
  }
  async logout(): Promise<void> {
    this.localStorageService.clearAll();
  }
}
