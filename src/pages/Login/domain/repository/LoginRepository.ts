import type { LoginEntity } from "../entities/LoginEntity";

export interface LoginRepository {
  loginUser(phone: string, password: string): Promise<LoginEntity>;
}
