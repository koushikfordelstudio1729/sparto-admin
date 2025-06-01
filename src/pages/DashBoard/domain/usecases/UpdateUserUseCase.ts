import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { DashBoardRepository } from "../repository/DashBoardRepository";

export class UpdateUaserUseCase {
  private readonly repository: DashBoardRepository;

  constructor(repository: DashBoardRepository) {
    this.repository = repository;
  }

  async execute(id: string, entity: UserEntity): Promise<void> {
    await this.repository.updateUser(id, entity);
  }
}
