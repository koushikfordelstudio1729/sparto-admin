import type { StoragePort } from "./StoragePort";

export class IndexedDbStorageService implements StoragePort {
  private readonly dbName = "appDb";
  private readonly storeName = "AppStore";
  private readonly dbPromise: Promise<IDBDatabase> | null;

  constructor() {
    if (typeof window !== "undefined") {
      this.dbPromise = this.openDB();
    } else {
      this.dbPromise = null;
    }
  }

  private openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: "id" });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async saveData<T>(key: string, value: T): Promise<void> {
    if (!this.dbPromise) return;
    const db = await this.dbPromise;
    const tx = db.transaction(this.storeName, "readwrite");
    tx.objectStore(this.storeName).put({ id: key, value });

    return new Promise((res, rej) => {
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    });
  }

  async getData<T>(key: string): Promise<T | null> {
    if (!this.dbPromise) return null;
    const db = await this.dbPromise;
    const tx = db.transaction(this.storeName, "readonly");
    const request = tx.objectStore(this.storeName).get(key);

    return new Promise((res, rej) => {
      request.onsuccess = () => res(request.result?.value ?? null);
      request.onerror = () => rej(request.error);
    });
  }

  async deleteData(key: string): Promise<void> {
    if (!this.dbPromise) return;
    const db = await this.dbPromise;
    const tx = db.transaction(this.storeName, "readwrite");
    tx.objectStore(this.storeName).delete(key);

    return new Promise((res, rej) => {
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    });
  }

  async clearAll(): Promise<void> {
    if (!this.dbPromise) return;
    const db = await this.dbPromise;
    const tx = db.transaction(this.storeName, "readwrite");
    tx.objectStore(this.storeName).clear();

    return new Promise((res, rej) => {
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    });
  }
}
