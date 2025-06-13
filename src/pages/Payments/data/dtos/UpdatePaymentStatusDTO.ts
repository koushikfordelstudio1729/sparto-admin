import type { PaymentStatus } from "../../domain/entities/PaymentEntity";
export interface UpdatePaymentStatusDTO {
  payment_status: PaymentStatus;
}
