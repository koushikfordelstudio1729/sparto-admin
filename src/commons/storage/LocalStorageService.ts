import type { StoragePort } from "./StoragePort";

export class LocalStorageService implements StoragePort {
  private readonly isServer: boolean;

  private readonly memoryStorage: Map<string, string>;

  constructor() {
    this.isServer = typeof window === "undefined";
    this.memoryStorage = new Map<string, string>();
  }

  async saveData<T>(key: string, value: T): Promise<void> {
    const serialized = JSON.stringify(value);
    if (this.isServer) {
      this.memoryStorage.set(key, serialized);
    } else {
      localStorage.setItem(key, serialized);
    }
  }

  async getData<T>(key: string): Promise<T | null> {
    const data = this.isServer
      ? this.memoryStorage.get(key)
      : localStorage.getItem(key);

    return data ? (JSON.parse(data) as T) : null;
  }

  async deleteData(key: string): Promise<void> {
    if (this.isServer) {
      this.memoryStorage.delete(key);
    } else {
      localStorage.removeItem(key);
    }
  }

  async clearAll(): Promise<void> {
    if (this.isServer) {
      this.memoryStorage.clear();
    } else {
      localStorage.clear();
    }
  }
}
