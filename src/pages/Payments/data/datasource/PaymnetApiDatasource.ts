import { ApiEndpoints } from "@/commons/constants/apiEndpoints";
import { AxiosClient } from "@/commons/network/AxiosClient";
import { PaymentModel } from "@/commons/data/models/PaymentModel";
import type { UpdatePaymentStatusDTO } from "../dtos/UpdatePaymentStatusDTO";

export class PaymentsApiDatasource {
  private readonly axiosClient: AxiosClient;

  constructor(axiosClient: AxiosClient) {
    this.axiosClient = axiosClient;
  }

  // Fetch all payment history
  async getAllPayments(): Promise<PaymentModel[]> {
    const { data } = await this.axiosClient
      .getInstance()
      .get(ApiEndpoints.payments.path);

    return (data.data as []).map((obj) => PaymentModel.fromJson(obj));
  }

  // Update payment status
  async updatePaymentStatus(
    id: string,
    payload: UpdatePaymentStatusDTO
  ): Promise<void> {
    await this.axiosClient
      .getInstance()
      .put(`${ApiEndpoints.payments.path}/${id}`, payload);
  }

  async deletePayment(id: string): Promise<void> {
    await this.axiosClient
      .getInstance()
      .delete(`${ApiEndpoints.payments.path}/${id}`);
  }
}
