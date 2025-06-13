import type { RequestEntity } from "../../domain/entities/RequestEntity";
import type { RequestedOrderRepository } from "../../domain/repository/RequestedOrderRepository";
import type { RequestedOrderApiDatasource } from "../datasource/RequestedOrderApiDataSource";
export class RequestedOrderRepositoryImpl implements RequestedOrderRepository {
  private readonly dataSource: RequestedOrderApiDatasource;

  constructor(dataSource: RequestedOrderApiDatasource) {
    this.dataSource = dataSource;
  }

  async getRequestedOrders(): Promise<RequestEntity[]> {
    const models = await this.dataSource.getRequestedOrders();
    return models.map((model) => model.toEntity());
  }
}
