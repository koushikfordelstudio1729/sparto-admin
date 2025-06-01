import { ApiEndpoints } from "@/commons/constants/apiEndpoints";
import { UserModel } from "@/commons/data/models/UserModel";
import { AxiosClient } from "@/commons/network/AxiosClient";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { DashBoardModel } from "../models/DashBoardModel";
import { OrderModel } from "@/commons/data/models/OrderModel";
import type { UpdateUserStatusDTO } from "../dtos/UpdateUserStatusDTO";
import type { UpdateUserRoleDTO } from "../dtos/UpdateUserRoleDTO";

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
}
