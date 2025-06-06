import type { PaymentEntity } from "@/commons/domain/entities/PaymentEntity";
import type { DashBoardRepository } from "../repository/DashBoardRepository";

export class UpdatePaymentStatusUseCase {
  private readonly repo: DashBoardRepository;

  constructor(repo: DashBoardRepository) {
    this.repo = repo;
  }

  async execute(
    paymentId: string,
    newStatus: PaymentEntity["status"]
  ): Promise<void> {
    return await this.repo.updatePaymentStatus(paymentId, newStatus);
  }
}
