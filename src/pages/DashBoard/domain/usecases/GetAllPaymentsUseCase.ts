import type { PaymentEntity } from "@/commons/domain/entities/PaymentEntity";
import type { DashBoardRepository } from "../repository/DashBoardRepository";

export class GetAllPaymentsUseCase {
  private readonly repo: DashBoardRepository;

  constructor(repo: DashBoardRepository) {
    this.repo = repo;
  }

  async execute(): Promise<PaymentEntity[]> {
    return await this.repo.getAllPayments();
  }
}
