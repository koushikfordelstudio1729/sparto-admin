import { ApiEndpoints } from "@/commons/constants/apiEndpoints";
import { AxiosClient } from "@/commons/network/AxiosClient";
import type { LoginUserDTO } from "../dtos/LoginUserDTO";
import { LoginModel } from "../models/LoginModel";

export class LoginApiDatasource {
  private readonly axiosClient: AxiosClient;

  constructor(axiosClient: AxiosClient) {
    this.axiosClient = axiosClient;
  }

  async loginUser(payload: LoginUserDTO): Promise<LoginModel> {
    const response = await this.axiosClient
      .getInstance()
      .post(`${ApiEndpoints.login.path}`, payload);
    return LoginModel.fromJson(response.data);
  }
}
