export interface StoragePort {
  saveData<T>(key: string, value: T): Promise<void>;

  getData<T>(key: string): Promise<T | null>;

  deleteData(key: string): Promise<void>;

  clearAll(): Promise<void>;
}
