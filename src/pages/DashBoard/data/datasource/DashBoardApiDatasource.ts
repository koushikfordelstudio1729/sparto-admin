import { ApiEndpoints } from "@/commons/constants/apiEndpoints";
import { UserModel } from "@/commons/data/models/UserModel";
import { AxiosClient } from "@/commons/network/AxiosClient";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { DashBoardModel } from "../models/DashBoardModel";
import { OrderModel } from "@/commons/data/models/OrderModel";
import type { UpdateUserStatusDTO } from "../dtos/UpdateUserStatusDTO";
import type { UpdateUserRoleDTO } from "../dtos/UpdateUserRoleDTO";
import { PaymentModel } from "@/commons/data/models/PaymentModel";
import type { UpdatePaymentStatusDTO } from "../dtos/UpdatePaymentStatusDTO";
import { RequestModel } from "@/commons/data/models/ReuestedOrderModel";
import type { CreateClarificationRequestDTO } from "../dtos/CreateClarificationDTO";
import { ClarificationModel } from "@/commons/data/models/ClarificationModel";
import type { UpdateOrderStatusDTO } from "../dtos/UpdateOrderStatusDTO";
export class DashBoardApiDatasource {
  private readonly axiosClient: AxiosClient;

  constructor(axiosClient: AxiosClient) {
    this.axiosClient = axiosClient;
  }

  async getAllUsers(): Promise<UserModel[]> {
    const { data } = await this.axiosClient
      .getInstance()
      .get(ApiEndpoints.allUsers.path);
    return (data.data.users as []).map((obj) => UserModel.fromJson(obj));
  }

  async createUser(payload: CreateUserDTO): Promise<DashBoardModel> {
    const response = await this.axiosClient
      .getInstance()
      .post(ApiEndpoints.sample.path, payload);

    return DashBoardModel.fromJson(response.data);
  }

  async updateUser(id: string, payload: UpdateUserDTO): Promise<void> {
    await this.axiosClient
      .getInstance()
      .put(`${ApiEndpoints.allUsers.path}/${id}`, payload);
  }

  async updateUserStatus(
    id: string,
    payload: UpdateUserStatusDTO
  ): Promise<void> {
    await this.axiosClient
      .getInstance()
      .put(`${ApiEndpoints.allUsers.path}/status/${id}`, payload);
  }
  async updateUserRole(id: string, payload: UpdateUserRoleDTO): Promise<void> {
    await this.axiosClient
      .getInstance()
      .put(`${ApiEndpoints.allUsers.path}/${id}/role`, payload);
  }

  async deleteUser(id: string): Promise<void> {
    await this.axiosClient
      .getInstance()
      .delete(`${ApiEndpoints.allUsers.path}/${id}`);
  }

  async getOrderById(id: string): Promise<OrderModel> {
    const response = await this.axiosClient
      .getInstance()
      .get(`${ApiEndpoints.sample.path}/${id}`);
    return OrderModel.fromJson(response.data);
  }

  async getAllOrders(): Promise<OrderModel[]> {
    const { data } = await this.axiosClient
      .getInstance()
      .get(ApiEndpoints.orders.path);
    return (data.data.orders as []).map((obj) => OrderModel.fromJson(obj));
  }

  //fetch all the payments history
  async getAllPayments(): Promise<PaymentModel[]> {
    const { data } = await this.axiosClient
      .getInstance()
      .get(ApiEndpoints.payments.path);

    return (data.data as []).map((obj) => PaymentModel.fromJson(obj));
  }

  async updatePaymentStatus(
    id: string,
    payload: UpdatePaymentStatusDTO
  ): Promise<void> {
    await this.axiosClient
      .getInstance()
      .put(`${ApiEndpoints.payments.path}/${id}`, payload);
  }
  async getRequestedOrders(): Promise<RequestModel[]> {
    const { data } = await this.axiosClient
      .getInstance()
      .get(ApiEndpoints.requestorder.path);
    return (data.data as []).map((obj) => RequestModel.fromJson(obj));
  }

  /** POST /clarifications */
  async createClarification(
    payload: CreateClarificationRequestDTO,
    file?: File
  ): Promise<void> {
    const form = new FormData();
    form.append("request_id", payload.request_id);
    form.append("actor_id", payload.actor_id);
    form.append("actor_type", payload.actor_type);
    form.append("message", payload.message);

    if (file) {
      form.append("media", file, file.name); // single file key
    }

    await this.axiosClient
      .getInstance()
      .post(ApiEndpoints.clarifications.path, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  }

  async getClarifications(requestId: string): Promise<ClarificationModel[]> {
    let { data } = await this.axiosClient
      .getInstance()
      .get(ApiEndpoints.clarifications.path, {
        params: { request_id: requestId },
      });
    data = data.data ?? [];
    return (data as []).map((obj) => ClarificationModel.fromJson(obj));
  }
  async updateOrderStatus(
    orderId: string,
    payload: UpdateOrderStatusDTO
  ): Promise<void> {
    await this.axiosClient
      .getInstance()
      .put(`${ApiEndpoints.orders.path}/${orderId}/status`, payload);
  }
}
