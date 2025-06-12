import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";
import type { DashBoardRepository } from "../repository/DashBoardRepository";
export class UpdateOrderStatusUseCase {
  private readonly repository: DashBoardRepository;
  constructor(repository: DashBoardRepository) {
    this.repository = repository;
  }

  async execute(orderId: string, status: OrderEntity["status"]): Promise<void> {
    await this.repository.updateOrderStatus(orderId, status);
  }
}
