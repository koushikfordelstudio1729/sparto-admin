import type { Payment } from "../payments.types";

export interface PaymentsTabProps {
  payments: Payment[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  methodFilter: string;
  setMethodFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
  setSelectedPayment: (payment: Payment) => void;
  setShowRefundModal: (value: boolean) => void;
  setShowDetailsModal: (value: boolean) => void;
  handleStatusChange: (paymentId: string, newStatus: Payment["status"]) => void;
}
