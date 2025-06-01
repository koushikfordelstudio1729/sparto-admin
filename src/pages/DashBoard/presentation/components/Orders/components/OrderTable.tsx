import IconButton from "@/commons/components/IconButton/IconButton";
import StatusBadge from "@/commons/components/StatusBadge/StatusBadge";
import { getOrderStatusClass } from "@/commons/utils/getOrderStatusClass";
import { getPaymentStatusClass } from "@/commons/utils/getPaymentsStatusClass";
import { Eye } from "lucide-react";
import React from "react";
import type { OrderTableProps } from "../Orders.types";

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  setSelectedOrder,
  setShowDetailsModal,
}) => {
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
            <th className="text-left p-4 font-semibold text-gray-900">
              Payment
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
                <StatusBadge
                  text={
                    order.status.charAt(0).toUpperCase() + order.status.slice(1)
                  }
                  className={getOrderStatusClass(order.status)}
                />
              </td>
              <td className="p-4">
                <StatusBadge
                  text={
                    order.status.charAt(0).toUpperCase() + order.status.slice(1)
                  }
                  className={getPaymentStatusClass(order.status)}
                />
              </td>
              <td className="p-4 text-sm text-gray-900">
                {new Date(order.createdAt).toLocaleDateString()}
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
    </div>
  );
};

export default OrderTable;
