import type { PaymentRepository } from "@/pages/Payments/domain/repository/PaymentRepository";
import type {
  PaymentEntity,
  PaymentStatus,
} from "@/commons/domain/entities/PaymentEntity";
import type { PaymentsApiDatasource } from "../datasource/PaymnetApiDatasource";
import { PaymentModel } from "@/commons/data/models/PaymentModel";
import { PaymentModelMapper } from "../mappers/PaymentModelMapper";
export class PaymentRepositoryImpl implements PaymentRepository {
  private readonly dataSource: PaymentsApiDatasource;
  constructor(dataSource: PaymentsApiDatasource) {
    this.dataSource = dataSource;
  }
  async getAllPayments(): Promise<PaymentEntity[]> {
    const models = await this.dataSource.getAllPayments();
    return models.map((model: PaymentModel) => model.toEntity());
  }
  async updatePaymentStatus(id: string, status: PaymentStatus): Promise<void> {
    const dto = PaymentModelMapper.toUpdatePaymentStatusDTO(status);
    await this.dataSource.updatePaymentStatus(id, dto);
  }
  async deletePayment(id: string): Promise<void> {
    await this.dataSource.deletePayment(id);
  }
}
