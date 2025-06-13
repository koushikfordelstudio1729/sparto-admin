import type { PaymentStatus } from "../../domain/entities/PaymentEntity";
import type { UpdatePaymentStatusDTO } from "../dtos/UpdatePaymentStatusDTO";

export class PaymentModelMapper {
  static toUpdatePaymentStatusDTO(
    status: PaymentStatus
  ): UpdatePaymentStatusDTO {
    return {
      payment_status: status,
    };
  }
}
