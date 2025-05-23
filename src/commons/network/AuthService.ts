import { StorageService } from "@/commons/storage/StorageService";
import { StorageKeys } from "@/commons/constants/storageKeys";
import type { AuthPort } from "./AuthPort";

export class AuthService implements AuthPort {
  private readonly storage: StorageService;

  constructor(useLocalStorage = true) {
    this.storage = new StorageService(useLocalStorage);
  }

  async getToken(): Promise<string | undefined> {
    const token = await this.storage.getData<string>(StorageKeys.AUTH_TOKEN);
    return token ?? undefined;
  }

  setToken(token: string): void {
    this.storage.saveData(StorageKeys.AUTH_TOKEN, { token });
  }

  clearToken(): void {
    this.storage.deleteData(StorageKeys.AUTH_TOKEN);
  }

  async getRefreshToken(): Promise<string | null> {
    return this.storage.getData<string>(StorageKeys.REFRESH_TOKEN);
  }

  setRefreshToken(token: string): void {
    this.storage.saveData(StorageKeys.REFRESH_TOKEN, token);
  }

  clearAll(): void {
    this.storage.clearAll();
  }
}
