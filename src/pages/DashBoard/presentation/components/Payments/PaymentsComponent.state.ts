import type { PaymentEntity } from "@/commons/domain/entities/PaymentEntity";

export interface PaymentsComponentState {
  isLoading: boolean;
  payments: PaymentEntity[];
}
