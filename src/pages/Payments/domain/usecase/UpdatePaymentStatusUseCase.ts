import type { PaymentEntity } from "@/commons/domain/entities/PaymentEntity";
import type { PaymentRepository } from "../repository/PaymentRepository";
export class UpdatePaymentStatusUseCase {
  private readonly repo: PaymentRepository;

  constructor(repo: PaymentRepository) {
    this.repo = repo;
  }

  async execute(
    paymentId: string,
    newStatus: PaymentEntity["status"]
  ): Promise<void> {
    return await this.repo.updatePaymentStatus(paymentId, newStatus);
  }
}
