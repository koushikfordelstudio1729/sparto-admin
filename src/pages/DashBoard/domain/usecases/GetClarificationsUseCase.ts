import type { ClarificationEntity } from "@/commons/domain/entities/ClarificationEntity";
import type { DashBoardRepository } from "../repository/DashBoardRepository";

/**
 * Fetches the conversation (clarification thread) for a given request.
 */
export class GetClarificationsUseCase {
  private readonly repository: DashBoardRepository;

  constructor(repository: DashBoardRepository) {
    this.repository = repository;
  }

  /**
   * @param requestId the ID of the order/request to load conversation for
   * @returns an array of ClarificationEntity
   */
  async execute(requestId: string): Promise<ClarificationEntity[]> {
    return await this.repository.getClarifications(requestId);
  }
}
