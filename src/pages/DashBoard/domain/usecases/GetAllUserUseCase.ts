import type { DashBoardEntity } from "../entities/DashBoardEntity";
import type { DashBoardRepository } from "../repository/DashBoardRepository";

export class GetAllUserUseCase {
  private readonly repository: DashBoardRepository;

  constructor(repository: DashBoardRepository) {
    this.repository = repository;
  }

  async execute(): Promise<DashBoardEntity[]> {
    return await this.repository.getAll();
  }
}
