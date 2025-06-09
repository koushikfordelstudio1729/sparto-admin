import type { ClarificationEntity } from "@/commons/domain/entities/ClarificationEntity";
import type { DashBoardRepository } from "../repository/DashBoardRepository";

/**
 * Posts a new message into the conversation (clarification thread).
 */
export class CreateClarificationUseCase {
  private readonly repository: DashBoardRepository;

  constructor(repository: DashBoardRepository) {
    this.repository = repository;
  }

  /**
   * @param entity the ClarificationEntity to create (must include requestId, actorId, actorType, message, media, createdAt)
   */
  async execute(entity: ClarificationEntity): Promise<void> {
    await this.repository.createClarification(entity);
  }
}
