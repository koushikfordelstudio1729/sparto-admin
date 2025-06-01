import type { ShipmentEntity } from "@/commons/domain/entities/ShipmentEntity";

export class ShipmentModel {
  public shipmentId: string;
  public courierName: string;
  public trackingNumber: string;
  public externalTrackingUrl: string;
  public shipmentStatus: string;
  public media: string[];
  public shippedAt: number;
  public deliveredAt: number;
  constructor(
    shipmentId: string,
    courierName: string,
    trackingNumber: string,
    externalTrackingUrl: string,
    shipmentStatus: string,
    media: string[],
    shippedAt: number,
    deliveredAt: number
  ) {
    this.shipmentId = shipmentId;
    this.courierName = courierName;
    this.trackingNumber = trackingNumber;
    this.externalTrackingUrl = externalTrackingUrl;
    this.shipmentStatus = shipmentStatus;
    this.media = media;
    this.shippedAt = shippedAt;
    this.deliveredAt = deliveredAt;
  }

  static fromJson(json: Record<string, unknown>): ShipmentModel {
    return new ShipmentModel(
      json["shipment_id"] as string,
      json["courier_name"] as string,
      json["tracking_number"] as string,
      json["external_tracking_url"] as string,
      json["shipment_status"] as string,
      json["media"] as string[],
      json["shipped_at"] as number,
      json["delivered_at"] as number
    );
  }

  toJson(): Record<string, unknown> {
    return {
      shipment_id: this.shipmentId,
      courier_name: this.courierName,
      tracking_number: this.trackingNumber,
      external_tracking_url: this.externalTrackingUrl,
      shipment_status: this.shipmentStatus,
      media: this.media,
      shipped_at: this.shippedAt,
      delivered_at: this.deliveredAt,
    };
  }

  toEntity(): ShipmentEntity {
    return {
      shipmentId: this.shipmentId,
      courierName: this.courierName,
      trackingNumber: this.trackingNumber,
      externalTrackingUrl: this.externalTrackingUrl,
      shipmentStatus: this.shipmentStatus,
      media: this.media,
      shippedAt: this.shippedAt,
      deliveredAt: this.deliveredAt,
    };
  }
}
