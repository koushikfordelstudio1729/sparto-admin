import FilterBar from "@/commons/components/FilterBar/FilterBar";
import { getTypeIcon } from "@/commons/utils/getTypeIcon";
import { Download } from "lucide-react";
import React from "react";
import type { Payment } from "../payments.types";
import type { PaymentsTabProps } from "./PaymentTable.types";
import CustomButton from "@/commons/components/Button";

export const PaymentsTab: React.FC<PaymentsTabProps> = ({
  payments,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  methodFilter,
  setMethodFilter,
  dateFilter,
  setDateFilter,
  setSelectedPayment,
  setShowRefundModal,
  setShowDetailsModal,
  handleStatusChange,
}) => {
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;

    const matchesMethod =
      methodFilter === "all" || payment.method === methodFilter;

    let matchesDate = true;
    if (dateFilter !== "all") {
      const paymentDate = new Date(payment.date);
      const today = new Date();
      switch (dateFilter) {
        case "today":
          matchesDate = paymentDate.toDateString() === today.toDateString();
          break;
        case "week": {
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = paymentDate >= weekAgo;
          break;
        }
        case "month": {
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = paymentDate >= monthAgo;
          break;
        }
      }
    }

    return matchesSearch && matchesStatus && matchesMethod && matchesDate;
  });

  return (
    <>
      <div className="w-full mb-6">
        <FilterBar
          search={{
            value: searchTerm,
            onChange: setSearchTerm,
            placeholder: "Search payments...",
          }}
          filters={[
            {
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { value: "all", label: "All Status" },
                { value: "pending", label: "Pending" },
                { value: "processing", label: "Processing" },
                { value: "completed", label: "Completed" },
                { value: "failed", label: "Failed" },
                { value: "refunded", label: "Refunded" },
                { value: "disputed", label: "Disputed" },
              ],
            },
            {
              value: methodFilter,
              onChange: setMethodFilter,
              options: [
                { value: "all", label: "All Methods" },
                { value: "credit_card", label: "Credit Card" },
                { value: "debit_card", label: "Debit Card" },
                { value: "paypal", label: "PayPal" },
                { value: "bank_transfer", label: "Bank Transfer" },
                { value: "crypto", label: "Cryptocurrency" },
              ],
            },
            {
              value: dateFilter,
              onChange: setDateFilter,
              options: [
                { value: "all", label: "All Time" },
                { value: "today", label: "Today" },
                { value: "week", label: "This Week" },
                { value: "month", label: "This Month" },
              ],
            },
          ]}
          className="mb-6"
        />

        <CustomButton
          onClick={() => {}}
          variant="success"
          size="md"
          disabled={false}
        >
          <p className="flex items-center gap-2">
            <Download size={16} className="text-white" />
            <p className="text-white ">Export</p>
          </p>
        </CustomButton>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4">Payment ID</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Method</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Gateway</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-4">
                  <div className="font-medium text-gray-900">{payment.id}</div>
                  <div className="text-xs text-gray-500">
                    Order: {payment.orderId}
                  </div>
                  <div className="text-xs text-gray-500">
                    TXN: {payment.transactionId}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-900">
                    {payment.userName}
                  </div>
                  <div className="text-sm text-gray-500">
                    ID: {payment.userId}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-900">
                    ${payment.amount.toFixed(2)} {payment.currency}
                  </div>
                  <div className="text-xs text-gray-500">
                    Fee: ${payment.fees.toFixed(2)}
                  </div>
                  {payment.refundAmount && (
                    <div className="text-xs text-red-600">
                      Refunded: ${payment.refundAmount.toFixed(2)}
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(payment.method)}
                    <span className="text-sm capitalize">
                      {payment.method.replace("_", " ")}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <select
                    value={payment.status}
                    onChange={(e) =>
                      handleStatusChange(
                        payment.id,
                        e.target.value as Payment["status"]
                      )
                    }
                    className="text-sm border-0 bg-transparent focus:ring-0 p-0"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                    <option value="disputed">Disputed</option>
                  </select>
                </td>
                <td className="p-4 text-sm text-gray-900">{payment.gateway}</td>
                <td className="p-4">
                  <div className="text-sm text-gray-900">
                    {new Date(payment.date).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(payment.date).toLocaleTimeString()}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {payment.status === "completed" && (
                      <button
                        onClick={() => {
                          setSelectedPayment(payment);
                          setShowRefundModal(true);
                        }}
                        className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                      >
                        Refund
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedPayment(payment);
                        setShowDetailsModal(true);
                      }}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                    >
                      Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPayments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No payments found matching your criteria.
        </div>
      )}
    </>
  );
};
