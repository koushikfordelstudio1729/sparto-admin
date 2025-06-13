import type { PaymentEntity } from "@/commons/domain/entities/PaymentEntity";
// import type { DashBoardRepository } from "../repository/DashBoardRepository";
import type { PaymentRepository } from "../repository/PaymentRepository";
export class GetAllPaymentsUseCase {
  private readonly repo: PaymentRepository;

  constructor(repo: PaymentRepository) {
    this.repo = repo;
  }

  async execute(): Promise<PaymentEntity[]> {
    return await this.repo.getAllPayments();
  }
}
