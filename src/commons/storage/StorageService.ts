import type { StoragePort } from "./StoragePort";
import { LocalStorageService } from "./LocalStorageService";
import { SessionStorageService } from "./SessionStorageService";

export class StorageService {
  private readonly storage: StoragePort;

  constructor(useLocal: boolean = true) {
    this.storage = useLocal
      ? new LocalStorageService()
      : new SessionStorageService();
  }

  saveData<T>(key: string, value: T): Promise<void> {
    return this.storage.saveData(key, value);
  }

  getData<T>(key: string): Promise<T | null> {
    return this.storage.getData(key);
  }

  deleteData(key: string): Promise<void> {
    return this.storage.deleteData(key);
  }

  clearAll(): Promise<void> {
    return this.storage.clearAll();
  }
}
