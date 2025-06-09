import React, { useMemo } from "react";
import FilterBar from "@/commons/components/FilterBar/FilterBar";
import type { PaymentEntity } from "@/commons/domain/entities/PaymentEntity";

import { Download, FileText } from "lucide-react";
import CustomButton from "@/commons/components/Button";
import { exportCsv, exportPdf } from "../../../utils/FileExportUtils"; // Importing reusable functions
import type { PaymentsTabProps } from "./PaymentTable.types";

// Define the payment headers for CSV and PDF
const PAYMENT_HEADERS = [
  "Payment ID",
  "Order",
  "Txn",
  "User",
  "Amount",
  "Method",
  "Status",
  "Gateway",
  "Date",
];

// Define how each payment is mapped to a row of data
const paymentMapper = (payment: PaymentEntity) => [
  payment._id ?? "",
  payment.orderId ?? "",
  payment.transactionId ?? "",
  payment.userName ?? "",
  `${payment.amount?.toFixed(2) ?? ""} ${payment.currency ?? ""}`,
  payment.method ?? "",
  payment.status ?? "",
  payment.gateway ?? "",
  new Date(payment.date ?? 0).toLocaleString(),
];

const PaymentsTab: React.FC<PaymentsTabProps> = ({
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
  setShowDetailsModal,
  paymentViewModel,
}) => {
  // Filter payments
  const filteredPayments = useMemo(
    () =>
      payments.filter((payment) => {
        const matchesSearch =
          (payment._id?.toLowerCase().includes(searchTerm.toLowerCase()) ??
            false) ||
          (payment.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ??
            false) ||
          (payment.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ??
            false) ||
          (payment.transactionId
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ??
            false);
        const matchesStatus =
          statusFilter === "all" ||
          payment.status?.toLowerCase() === statusFilter;
        const matchesMethod =
          methodFilter === "all" || payment.method === methodFilter;
        let matchesDate = true;
        if (dateFilter !== "all") {
          const paymentDate = new Date(payment.date ?? 0);
          const today = new Date();
          if (dateFilter === "today") {
            matchesDate = paymentDate.toDateString() === today.toDateString();
          } else if (dateFilter === "week") {
            const weekAgo = new Date(today.getTime() - 7 * 86400000);
            matchesDate = paymentDate >= weekAgo;
          } else if (dateFilter === "month") {
            const monthAgo = new Date(today.getTime() - 30 * 86400000);
            matchesDate = paymentDate >= monthAgo;
          }
        }
        return matchesSearch && matchesStatus && matchesMethod && matchesDate;
      }),
    [payments, searchTerm, statusFilter, methodFilter, dateFilter]
  );

  return (
    <>
      <div className="w-full mb-6 flex flex-col gap-4">
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
          className="flex-1"
        />
        <div className="flex justify-end gap-2">
          <CustomButton
            onClick={() =>
              exportCsv(filteredPayments, PAYMENT_HEADERS, paymentMapper)
            } // Use exportCsv function
            variant="primary"
            size="md"
            disabled={!filteredPayments.length}
          >
            <Download className="inline-block mr-2" /> CSV
          </CustomButton>
          <CustomButton
            onClick={() =>
              exportPdf(filteredPayments, PAYMENT_HEADERS, paymentMapper)
            } // Use exportPdf function
            variant="primary"
            size="md"
            disabled={!filteredPayments.length}
          >
            <FileText className="inline-block mr-2" /> PDF
          </CustomButton>
        </div>
      </div>

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
                key={payment._id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-4">{payment._id}</td>
                <td className="p-4">{payment.userName ?? "N/A"}</td>
                <td className="p-4">
                  {payment.amount?.toFixed(2)} {payment.currency}
                </td>
                <td className="p-4">{payment.method}</td>
                <td className="p-4">
                  <div className="relative inline-block w-40">
                    <select
                      value={payment.status}
                      onChange={(e) =>
                        paymentViewModel.handleStatusChange(
                          payment._id!,
                          e.target.value as PaymentEntity["status"]
                        )
                      }
                      className="block w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06-.02L10 10.584l3.71-3.398a.75.75 0 111.02 1.098l-4 3.667a.75.75 0 01-1.02 0l-4-3.667a.75.75 0 01-.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </td>

                <td className="p-4">{payment.gateway}</td>
                <td className="p-4">
                  {new Date(payment.date ?? 0).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => {
                      setSelectedPayment(payment);
                      setShowDetailsModal(true);
                    }}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PaymentsTab;
