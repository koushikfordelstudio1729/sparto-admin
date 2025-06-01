export interface ShipmentEntity {
  shipmentId: string;
  courierName: string;
  trackingNumber: string;
  externalTrackingUrl: string;
  shipmentStatus: string;
  media: string[];
  shippedAt: number;
  deliveredAt: number;
}
