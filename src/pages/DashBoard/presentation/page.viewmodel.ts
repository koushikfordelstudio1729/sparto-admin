import type { AppDispatch } from "@/app/store/store";
import type { StorageService } from "@/commons/storage/StorageService";
import type { GetAllUserUseCase } from "../domain/usecases/GetAllUserUseCase";
import { setLoading } from "./page.slice";

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

    await this.getAllUser();
    this.dispatch(setLoading(false));
  }

  async getAllUser(): Promise<void> {
    await this.getAllUserUseCase.execute();
  }
  async logout(): Promise<void> {
    this.localStorageService.clearAll();
  }
}
