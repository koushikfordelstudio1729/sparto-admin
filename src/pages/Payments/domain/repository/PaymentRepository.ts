import type { PaymentEntity } from "@/commons/domain/entities/PaymentEntity";

export interface PaymentRepository {
  getAllPayments(): Promise<PaymentEntity[]>;
  updatePaymentStatus(
    paymentId: string,
    newStatus: PaymentEntity["status"]
  ): Promise<void>;
  deletePayment(paymentId: string): Promise<void>;
}
