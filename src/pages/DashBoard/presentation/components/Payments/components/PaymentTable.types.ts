import type { PaymentEntity } from "@/commons/domain/entities/PaymentEntity";
import type { PaymentsComponentViewModel } from "../PaymentsComponent.viewmodel";

export interface PaymentsTabProps {
  payments: PaymentEntity[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  methodFilter: string;
  setMethodFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
  setSelectedPayment: (payment: PaymentEntity | null) => void; // ✅ CORRECT
  setShowDetailsModal: (value: boolean) => void;
  paymentViewModel: PaymentsComponentViewModel;
}
