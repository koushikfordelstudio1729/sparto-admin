import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";

export interface OrderDetailsModalProps {
  selectedOrder: OrderEntity | null;
  onClose: () => void;
}

export interface OrderTableProps {
  orders: OrderEntity[];
  setSelectedOrder: React.Dispatch<React.SetStateAction<OrderEntity | null>>;
  setShowDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
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
