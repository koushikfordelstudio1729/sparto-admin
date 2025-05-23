import type { LoginEntity } from "../entities/LoginEntity";
import type { LoginRepository } from "../repository/LoginRepository";

export class LoginUserUseCase {
  private readonly repository: LoginRepository;

  constructor(repository: LoginRepository) {
    this.repository = repository;
  }

  async execute(phone: string, password: string): Promise<LoginEntity> {
    return await this.repository.loginUser(phone, password);
  }
}
