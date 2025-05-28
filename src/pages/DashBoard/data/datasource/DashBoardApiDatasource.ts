import { ApiEndpoints } from "@/commons/constants/apiEndpoints";
import { UserModel } from "@/commons/data/models/UserModel";
import { AxiosClient } from "@/commons/network/AxiosClient";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { DashBoardModel } from "../models/DashBoardModel";

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

  async create(payload: CreateUserDTO): Promise<DashBoardModel> {
    const response = await this.axiosClient
      .getInstance()
      .post(ApiEndpoints.sample.path, payload);

    return DashBoardModel.fromJson(response.data);
  }

  async update(id: string, payload: UpdateUserDTO): Promise<DashBoardModel> {
    const response = await this.axiosClient
      .getInstance()
      .put(`${ApiEndpoints.sample.path}/${id}`, payload);

    return DashBoardModel.fromJson(response.data);
  }

  async delete(id: string): Promise<void> {
    await this.axiosClient
      .getInstance()
      .delete(`${ApiEndpoints.sample.path}/${id}`);
  }
}
