import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";

export interface OrdersComponentState {
  isLoading: boolean;
  allOrders: OrderEntity[];
}
