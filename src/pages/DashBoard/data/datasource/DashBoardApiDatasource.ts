import { AxiosClient } from "@/commons/network/AxiosClient";
import { ApiEndpoints } from "@/commons/constants/apiEndpoints";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { DashBoardModel } from "../models/DashBoardModel";

export class DashBoardApiDatasource {
  private readonly axiosClient: AxiosClient;

  constructor(axiosClient: AxiosClient) {
    this.axiosClient = axiosClient;
  }

  async fetchAll(): Promise<DashBoardModel[]> {
    const response = await this.axiosClient
      .getInstance()
      .get(ApiEndpoints.sample.path);

    return (response.data as []).map((obj) => DashBoardModel.fromJson(obj));
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
