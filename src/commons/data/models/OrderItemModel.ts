import type { OrderItemEntity } from "@/commons/domain/entities/OrderItemEntity";

export class OrderItemModel {
  public itemId: string;
  public name: string;
  public price: number;
  public quantity: number;
  constructor(itemId: string, name: string, price: number, quantity: number) {
    this.itemId = itemId;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  static fromJson(json: Record<string, unknown>): OrderItemModel {
    return new OrderItemModel(
      json["item_id"] as string,
      json["name"] as string,
      json["price"] as number,
      json["quantity"] as number
    );
  }

  toJson(): Record<string, unknown> {
    return {
      item_id: this.itemId,
      name: this.name,
      price: this.price,
      quantity: this.quantity,
    };
  }

  toEntity(): OrderItemEntity {
    return {
      itemId: this.itemId,
      name: this.name,
      price: this.price,
      quantity: this.quantity,
    };
  }
}
