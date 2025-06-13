import type { PaymentRepository } from "../repository/PaymentRepository";

export class DeletePaymentUseCase {
  private readonly repo: PaymentRepository;

  constructor(repo: PaymentRepository) {
    this.repo = repo;
  }

  async execute(paymentId: string): Promise<void> {
    await this.repo.deletePayment(paymentId);
  }
}
