import type { RequestEntity } from "../entities/RequestEntity";
export interface RequestedOrderRepository {
  getRequestedOrders(): Promise<RequestEntity[]>;
}
