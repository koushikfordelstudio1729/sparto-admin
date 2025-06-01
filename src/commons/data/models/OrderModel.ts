import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";
import { OrderItemModel } from "./OrderItemModel";
import { ShipmentModel } from "./ShipmentModel";

export class OrderModel {
  public id: string;
  public userId: string;
  public requestId: string;
  public quoteId: string;
  public items: OrderItemModel[];
  public totalAmount: string;
  public status: string;
  public notes: string;
  public shipment?: ShipmentModel;
  public paymentId: string;
  public createdAt: number;
  public updatedAt: number;

  constructor(
    id: string,
    userId: string,
    requestId: string,
    quoteId: string,
    items: OrderItemModel[],
    totalAmount: string,
    status: string,
    notes: string,
    shipment: ShipmentModel | undefined,
    paymentId: string,
    createdAt: number,
    updatedAt: number
  ) {
    this.id = id;
    this.userId = userId;
    this.requestId = requestId;
    this.quoteId = quoteId;
    this.items = items;
    this.totalAmount = totalAmount;
    this.status = status;
    this.notes = notes;
    this.shipment = shipment;
    this.paymentId = paymentId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: Record<string, unknown>): OrderModel {
    return new OrderModel(
      json["id"] as string,
      json["user_id"] as string,
      json["request_id"] as string,
      json["quote_id"] as string,
      (json["items"] as Record<string, unknown>[]).map(OrderItemModel.fromJson),
      json["total_amount"] as string,
      json["status"] as string,
      json["notes"] as string,
      json["shipment"]
        ? ShipmentModel.fromJson(json["shipment"] as Record<string, unknown>)
        : undefined,
      json["payment_id"] as string,
      json["created_at"] as number,
      json["updated_at"] as number
    );
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      user_id: this.userId,
      request_id: this.requestId,
      quote_id: this.quoteId,
      items: this.items.map((i) => i.toJson()),
      total_amount: this.totalAmount,
      status: this.status,
      notes: this.notes,
      shipment: this.shipment?.toJson(),
      payment_id: this.paymentId,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }

  toEntity(): OrderEntity {
    const formatDate = (timestamp: number): string =>
      new Date(timestamp * 1000).toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    return {
      id: this.id,
      userId: this.userId,
      requestId: this.requestId,
      quoteId: this.quoteId,
      items: this.items.map((i) => i.toEntity()),
      totalAmount: this.totalAmount,
      status: this.status,
      notes: this.notes,
      shipment: this.shipment?.toEntity(),
      paymentId: this.paymentId,
      createdAt: formatDate(this.createdAt),
      updatedAt: formatDate(this.updatedAt),
    };
  }
}
