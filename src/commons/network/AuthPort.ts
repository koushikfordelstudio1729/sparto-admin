export interface AuthPort {
  getToken(): Promise<string | undefined>;

  setToken(token: string): void;

  clearToken(): void;

  getRefreshToken(): Promise<string | null>;

  setRefreshToken(token: string): void;

  clearAll(): void;
}
