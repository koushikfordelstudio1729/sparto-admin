import type { RequestEntity } from "../entities/RequestEntity";
import type { RequestedOrderRepository } from "../repository/RequestedOrderRepository";

/**
 * Fetches only the orders in the “requested” state.
 */
export class GetRequestedOrdersUseCase {
  private readonly repository: RequestedOrderRepository;
  constructor(repository: RequestedOrderRepository) {
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
