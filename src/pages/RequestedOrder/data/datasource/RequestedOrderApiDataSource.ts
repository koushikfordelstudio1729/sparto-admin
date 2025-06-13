import { ApiEndpoints } from "@/commons/constants/apiEndpoints";
import { AxiosClient } from "@/commons/network/AxiosClient";
import { RequestModel } from "../models/RequestedOrderModel";
export class RequestedOrderApiDatasource {
  private readonly axiosClient: AxiosClient;

  constructor(axiosClient: AxiosClient) {
    this.axiosClient = axiosClient;
  }

  async getRequestedOrders(): Promise<RequestModel[]> {
    const { data } = await this.axiosClient
      .getInstance()
      .get(ApiEndpoints.requestorder.path);
    return (data.data as []).map((obj) => RequestModel.fromJson(obj));
  }
}
