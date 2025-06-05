export type PaymentStatus = "pending" | "processing" | "completed" | "failed";

export interface UpdatePaymentStatusDTO {
  payment_status: PaymentStatus;
}
