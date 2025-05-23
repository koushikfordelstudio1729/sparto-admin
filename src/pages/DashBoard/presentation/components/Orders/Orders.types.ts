export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: OrderItem[];
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  totalAmount: number;
  shippingAddress: string;
  orderDate: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  notes?: string;
}

export interface OrderDetailsModalProps {
  selectedOrder: Order | null;
  onClose: () => void;
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

export interface OrderTableProps {
  orders: Order[];
  setSelectedOrder: React.Dispatch<React.SetStateAction<Order | null>>;
  setShowDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
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
