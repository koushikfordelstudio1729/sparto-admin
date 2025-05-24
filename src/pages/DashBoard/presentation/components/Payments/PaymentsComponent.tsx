import { StatCard } from "@/commons/components/StatCard/StatCard";
import React, { useEffect, useState } from "react";
import { getPaymentDashboardStats } from "../../utils/getPaymentDashboardStats";
import { DisputesTab } from "./components/PaymentDisputesTable";
import { PaymentDetailsModal } from "./components/paymentsDetailsModel";
import { PaymentsTab } from "./components/PaymentsTable";
import { RefundModal } from "./components/RefundModel";
import { mockDisputes, mockPayments } from "./components/TestData";
import type { Dispute, Payment } from "./payments.types";

const PaymentComponent: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [activeTab, setActiveTab] = useState<"payments" | "disputes">(
    "payments"
  );
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    setPayments(mockPayments);
    setDisputes(mockDisputes);
  }, []);

  const handleStatusChange = (
    paymentId: string,
    newStatus: Payment["status"]
  ) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId ? { ...payment, status: newStatus } : payment
      )
    );
  };

  const handleRefund = () => {
    if (!selectedPayment || !refundAmount) return;

    const refundAmountNum = parseFloat(refundAmount);
    if (refundAmountNum > selectedPayment.amount) {
      alert("Refund amount cannot exceed payment amount");
      return;
    }

    setPayments(
      payments.map((payment) =>
        payment.id === selectedPayment.id
          ? {
              ...payment,
              status: "refunded" as const,
              refundAmount: refundAmountNum,
              refundDate: new Date().toISOString(),
              refundReason: refundReason,
            }
          : payment
      )
    );

    setShowRefundModal(false);
    setSelectedPayment(null);
    setRefundAmount("");
    setRefundReason("");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Payment Management</h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("payments")}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === "payments"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Payments
        </button>
        <button
          onClick={() => setActiveTab("disputes")}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === "disputes"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Disputes ({disputes.length})
        </button>
      </div>

      {activeTab === "payments" ? (
        <PaymentsTab
          payments={payments}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          methodFilter={methodFilter}
          setMethodFilter={setMethodFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          setSelectedPayment={setSelectedPayment}
          setShowRefundModal={setShowRefundModal}
          setShowDetailsModal={setShowDetailsModal}
          handleStatusChange={handleStatusChange}
        />
      ) : (
        <DisputesTab disputes={disputes} />
      )}

      {activeTab === "payments" && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {getPaymentDashboardStats(payments).map((stat) => (
            <StatCard
              key={stat.title}
              {...stat}
              variant={
                stat.variant as
                  | "default"
                  | "blue"
                  | "green"
                  | "purple"
                  | "orange"
                  | "red"
                  | "yellow"
                  | undefined
              }
            />
          ))}
        </div>
      )}

      {/* Refund Modal */}
      {showRefundModal && (
        <RefundModal
          payment={selectedPayment}
          refundAmount={refundAmount}
          refundReason={refundReason}
          onRefundAmountChange={setRefundAmount}
          onRefundReasonChange={setRefundReason}
          onRefund={handleRefund}
          onCancel={() => {
            setShowRefundModal(false);
            setSelectedPayment(null);
            setRefundAmount("");
            setRefundReason("");
          }}
        />
      )}

      {showDetailsModal && selectedPayment && (
        <PaymentDetailsModal
          payment={selectedPayment}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default PaymentComponent;
