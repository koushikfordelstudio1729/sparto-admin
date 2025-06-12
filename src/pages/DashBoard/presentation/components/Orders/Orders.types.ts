import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";
import type { OrdersComponentViewModel } from "./OrdersComponent.viewmodel";

export interface OrderDetailsModalProps {
  selectedOrder: OrderEntity | null;
  onClose: () => void;
}

export interface OrderTableProps {
  orders: OrderEntity[];
  OrderViewModel: OrdersComponentViewModel;
  setShowDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedOrder: React.Dispatch<React.SetStateAction<OrderEntity | null>>;
}
export interface OrderFilterProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  paymentFilter: string;
  setPaymentFilter: React.Dispatch<React.SetStateAction<string>>;
  dateFilter: string;
  setDateFilter: React.Dispatch<React.SetStateAction<string>>;
}

export interface OrderStatusBadgeProps {
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
}

export interface PaymentStatusBadgeProps {
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
}
