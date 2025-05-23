import type { StorageService } from "@/commons/storage/StorageService";
import type { LoginEntity } from "../../domain/entities/LoginEntity";
import type { LoginRepository } from "../../domain/repository/LoginRepository";
import type { LoginApiDatasource } from "../datasource/LoginApiDatasource";
import { LoginModelMapper } from "../mappers/LoginModelMapper";
import { AppConstants } from "@/commons/constants/appConstants";

export class LoginRepositoryImpl implements LoginRepository {
  private readonly dataSource: LoginApiDatasource;
  private localBrowserStorage: StorageService;

  constructor(
    dataSource: LoginApiDatasource,
    localBrowserStorage: StorageService
  ) {
    this.dataSource = dataSource;
    this.localBrowserStorage = localBrowserStorage;
  }

  async loginUser(phone: string, password: string): Promise<LoginEntity> {
    const dto = LoginModelMapper.toLoginDTO(phone, password);
    const loginModel = await this.dataSource.loginUser(dto);
    await this.localBrowserStorage.saveData(
      AppConstants.LOCAL_STORAGE.LOGIN_TOKEN,
      loginModel.token
    );
    return loginModel.toEntity();
  }
  async getSavedToken(): Promise<string | null> {
    return this.localBrowserStorage.getData(
      AppConstants.LOCAL_STORAGE.LOGIN_TOKEN
    );
  }

  async clearToken(): Promise<void> {
    await this.localBrowserStorage.deleteData(
      AppConstants.LOCAL_STORAGE.LOGIN_TOKEN
    );
  }
}
