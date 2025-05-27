import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { DashBoardRepository } from "../repository/DashBoardRepository";

export class GetAllUserUseCase {
  private readonly repository: DashBoardRepository;

  constructor(repository: DashBoardRepository) {
    this.repository = repository;
  }

  async execute(): Promise<UserEntity[]> {
    return await this.repository.getAllUsers();
  }
}
