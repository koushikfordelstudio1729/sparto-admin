import type { DashBoardEntity } from "../entities/DashBoardEntity";
import type { DashBoardRepository } from "../repository/DashBoardRepository";

export class CreateUserUseCase {
  private readonly repository: DashBoardRepository;

  constructor(repository: DashBoardRepository) {
    this.repository = repository;
  }

  async execute(entity: DashBoardEntity): Promise<DashBoardEntity> {
    return await this.repository.create(entity);
  }
}
