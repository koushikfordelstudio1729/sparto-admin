import React from "react";
import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";
import CustomButton from "@/commons/components/Button";
import { AlertTriangle } from "lucide-react";

interface OrderDetailsModalProps {
  order: OrderEntity | null;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  const formatUnixDate = (timestamp: number | undefined) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-5xl w-full mx-4 max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold">Order Details – {order.id}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 text-sm">
          {/* Customer & Order Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <h4 className="font-semibold mb-3">Customer Information</h4>
              <p>
                <strong>User ID:</strong> {order.userId}
              </p>
              <p>
                <strong>Request ID:</strong> {order.requestId}
              </p>
              <p>
                <strong>Quote ID:</strong> {order.quoteId}
              </p>
              <p>
                <strong>Payment ID:</strong> {order.paymentId}
              </p>
            </section>

            <section>
              <h4 className="font-semibold mb-3">Order Summary</h4>
              <p>
                <strong>Total:</strong> $
                {parseFloat(order.totalAmount).toFixed(2)}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated:</strong>{" "}
                {new Date(order.updatedAt).toLocaleString()}
              </p>
            </section>
          </div>

          {/* Items */}
          <section>
            <h4 className="font-semibold mb-3">Items</h4>
            <div className="divide-y border rounded">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-4 flex justify-between">
                  <div>
                    <p>
                      <strong>{item.name}</strong>
                    </p>
                    <p className="text-gray-500">Item ID: {item.itemId}</p>
                  </div>
                  <div>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Shipment Info */}
          {order.shipment && (
            <section>
              <h4 className="font-semibold mb-3">Shipment Information</h4>
              <p>
                <strong>Shipment ID:</strong> {order.shipment.shipmentId}
              </p>
              <p>
                <strong>Courier:</strong> {order.shipment.courierName}
              </p>
              <p>
                <strong>Tracking Number:</strong>{" "}
                {order.shipment.trackingNumber}
              </p>
              <p>
                <strong>Tracking URL:</strong>{" "}
                <a
                  href={order.shipment.externalTrackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {order.shipment.externalTrackingUrl}
                </a>
              </p>
              <p>
                <strong>Status:</strong> {order.shipment.shipmentStatus}
              </p>
              <p>
                <strong>Shipped At:</strong>{" "}
                {formatUnixDate(order.shipment.shippedAt)}
              </p>
              <p>
                <strong>Delivered At:</strong>{" "}
                {formatUnixDate(order.shipment.deliveredAt)}
              </p>

              {order.shipment.media?.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {order.shipment.media.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Media ${index + 1}`}
                      className="w-full rounded shadow"
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Notes */}
          {order.notes && (
            <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 flex gap-3 mt-6">
              <AlertTriangle className="text-yellow-500 shrink-0" />
              <p className="text-gray-700">{order.notes}</p>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-end">
          <CustomButton variant="danger" size="md" onClick={onClose}>
            <p className="text-white">Close</p>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
