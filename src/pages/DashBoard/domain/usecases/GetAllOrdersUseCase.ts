import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";
import type { DashBoardRepository } from "../repository/DashBoardRepository";

export class GetAllOrdersUseCase {
  private readonly repository: DashBoardRepository;

  constructor(repository: DashBoardRepository) {
    this.repository = repository;
  }

  async execute(): Promise<OrderEntity[]> {
    return await this.repository.getAllOrders();
  }
}
