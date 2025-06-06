import { StatCard } from "@/commons/components/StatCard/StatCard";
import React, { useEffect, useState } from "react";
import { getPaymentDashboardStats } from "../../utils/getPaymentDashboardStats";
import { PaymentDetailsModal } from "./components/paymentsDetailsModel";
import { PaymentsTab } from "./components/PaymentsTable";
import type { PaymentEntity } from "@/commons/domain/entities/PaymentEntity";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { usePaymentsComponentViewModelDI } from "./PaymentsComponent.di";
const PaymentComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState<PaymentEntity | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<"payments" | "disputes">(
    "payments"
  );
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const paymentViewModel = usePaymentsComponentViewModelDI();
  const payments = useSelector(
    (state: RootState) => state.paymentsComponentSlice.payments
  );

  useEffect(() => {
    paymentViewModel.initialize();
  }, [paymentViewModel]);

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
      </div>

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
        setShowDetailsModal={setShowDetailsModal}
        paymentViewModel={paymentViewModel}
      />

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
