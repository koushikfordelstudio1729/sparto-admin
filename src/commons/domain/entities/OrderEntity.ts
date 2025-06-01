import type { OrderItemEntity } from "./OrderItemEntity";
import type { ShipmentEntity } from "./ShipmentEntity";

export interface OrderEntity {
  id: string;
  userId: string;
  requestId: string;
  quoteId: string;
  items: OrderItemEntity[];
  totalAmount: string;
  status: string;
  notes: string;
  shipment?: ShipmentEntity;
  paymentId: string;
  createdAt: string;
  updatedAt: string;
}
