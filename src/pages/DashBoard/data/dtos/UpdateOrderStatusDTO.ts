import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";

export interface UpdateOrderStatusDTO {
  status: OrderEntity["status"];
}
