import { Edit, Eye } from "lucide-react";
import React from "react";
import type { OrderTableProps } from "../Orders.types";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

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
              <td className="p-4">
                <div className="font-medium text-gray-900">{order.id}</div>
              </td>
              <td className="p-4">
                <div className="font-medium text-gray-900">
                  {order.userName}
                </div>
                <div className="text-sm text-gray-500">{order.userEmail}</div>
              </td>
              <td className="p-4">
                <div className="text-sm">{order.items.length} item(s)</div>
              </td>
              <td className="p-4">
                <div className="font-medium text-gray-900">
                  ${order.totalAmount.toFixed(2)}
                </div>
              </td>
              <td className="p-4">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="p-4">
                <PaymentStatusBadge paymentStatus={order.paymentStatus} />
              </td>
              <td className="p-4">
                <div className="text-sm text-gray-900">{order.orderDate}</div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowDetailsModal(true);
                    }}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="p-1 text-green-600 hover:bg-green-100 rounded"
                    title="Edit Order"
                  >
                    <Edit size={16} />
                  </button>
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
