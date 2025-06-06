import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { DashBoardRepository } from "../repository/DashBoardRepository";

export class UpdateUaserStatusUseCase {
  private readonly repository: DashBoardRepository;

  constructor(repository: DashBoardRepository) {
    this.repository = repository;
  }

  async execute(id: string, entity: UserEntity): Promise<void> {
    await this.repository.updateUserStatus(id, entity);
  }
}
