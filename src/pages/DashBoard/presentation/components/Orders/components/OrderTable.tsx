import IconButton from "@/commons/components/IconButton/IconButton";

import { Eye } from "lucide-react";
import React, { useState } from "react";
import type { OrderTableProps } from "../Orders.types";
import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";
import ConfirmModal from "@/commons/components/ConfirmModal/ConfirmModal";

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  setShowDetailsModal,
  OrderViewModel,
  setSelectedOrder,
}) => {
  const [pendingChange, setPendingChange] = useState<{
    id: string;
    newStatus: OrderEntity["status"];
  } | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left p-4 font-semibold text-gray-900">
              Order ID
            </th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Customer
            </th>
            <th className="text-left p-4 font-semibold text-gray-900">Items</th>
            <th className="text-left p-4 font-semibold text-gray-900">Total</th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Status
            </th>

            <th className="text-left p-4 font-semibold text-gray-900">Date</th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="p-4 font-medium text-gray-900">{order.id}</td>
              <td className="p-4">
                <div className="font-medium text-gray-900">{order.userId}</div>
              </td>
              <td className="p-4 text-sm">{order.items.length} item(s)</td>
              <td className="p-4 font-medium text-gray-900">
                ${parseFloat(order.totalAmount).toFixed(2)}
              </td>
              <td className="p-4">
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as OrderEntity["status"]; // 👈 cast it
                      OrderViewModel.updateOrderStatus(order.id, newStatus);
                      setPendingChange({ id: order.id, newStatus });
                    }}
                    className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </td>

              <td className="p-4 text-sm text-gray-900">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short", // e.g., "Jun"
                  day: "2-digit",
                })}
              </td>

              <td className="p-4">
                <div className="flex items-center justify-center">
                  <IconButton
                    icon={Eye}
                    title="View Details"
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowDetailsModal(true);
                    }}
                    className="text-blue-600 hover:bg-blue-100"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {pendingChange && (
        <ConfirmModal
          message={`Change status to "${pendingChange.newStatus}"?`}
          onCancel={() => setPendingChange(null)}
          onConfirm={() => {
            OrderViewModel.updateOrderStatus(
              pendingChange.id,
              pendingChange.newStatus
            );
            setPendingChange(null);
          }}
        />
      )}
    </div>
  );
};

export default OrderTable;
