// src/pages/DashBoard/domain/usecases/GetRequestedOrdersUseCase.ts

import type { RequestEntity } from "@/commons/domain/entities/RequestEntity";
import type { DashBoardRepository } from "../repository/DashBoardRepository";

/**
 * Fetches only the orders in the “requested” state.
 */
export class GetRequestedOrdersUseCase {
  private readonly repository: DashBoardRepository;

  constructor(repository: DashBoardRepository) {
    this.repository = repository;
  }

  /**
   * @returns Promise resolving to an array of DashBoardEntity
   *          representing orders with status “requested”
   */
  async execute(): Promise<RequestEntity[]> {
    return await this.repository.getRequestedOrders();
  }
}
