import React from "react";
import type { OrderDetailsModalProps } from "../Orders.types";
import { getPaymentBadge, getStatusBadge } from "../utils/orderUtils";

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  selectedOrder,
  onClose,
}) => {
  if (!selectedOrder) return null;

  const orderStatus = selectedOrder.status ?? "pending";
  const paymentStatus = selectedOrder.status ?? "pending";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">
              Order Details - {selectedOrder.id}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Customer Information</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {selectedOrder.userId}
                </p>
                {/* <p>
                  <span className="font-medium">Email:</span>{" "}
                  {selectedOrder.userEmail || "N/A"}
                </p> */}
                <p>
                  <span className="font-medium">User ID:</span>{" "}
                  {selectedOrder.userId}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Order Information</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Order Date:</span>{" "}
                  {selectedOrder.createdAt}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  {getStatusBadge(
                    orderStatus as
                      | "pending"
                      | "confirmed"
                      | "processing"
                      | "shipped"
                      | "delivered"
                      | "cancelled"
                  )}
                </p>
                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  {getPaymentBadge(
                    paymentStatus as "pending" | "paid" | "failed" | "refunded"
                  )}
                </p>
                {selectedOrder.shipment?.trackingNumber && (
                  <p>
                    <span className="font-medium">Tracking:</span>{" "}
                    {selectedOrder.shipment?.trackingNumber}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
