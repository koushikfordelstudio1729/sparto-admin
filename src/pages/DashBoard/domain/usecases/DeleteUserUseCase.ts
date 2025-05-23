import type { DashBoardRepository } from "../repository/DashBoardRepository";

export class DeleteUserUseCase {
  private readonly repository: DashBoardRepository;

  constructor(repository: DashBoardRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
