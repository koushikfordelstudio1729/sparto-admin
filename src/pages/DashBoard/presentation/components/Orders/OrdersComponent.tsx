import React, { useState, useEffect } from "react";
import OrderDetailsModal from "./components/OrderDetailsModal";
import type { Order } from "./Orders.types";
import OrderFilter from "./components/OrderFilters";
import OrderTable from "./components/OrderTable";

const OrdersComponent: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: "ORD-001",
        userId: "1",
        userName: "John Doe",
        userEmail: "john@example.com",
        items: [
          { id: "1", name: "Premium Widget", quantity: 2, price: 299.99 },
          { id: "2", name: "Standard Service", quantity: 1, price: 150.0 },
        ],
        status: "processing",
        paymentStatus: "paid",
        totalAmount: 749.98,
        shippingAddress: "123 Main St, City, State 12345",
        orderDate: "2025-05-20",
        estimatedDelivery: "2025-05-25",
        trackingNumber: "TRK123456789",
        notes: "Customer requested express delivery",
      },
      {
        id: "ORD-002",
        userId: "2",
        userName: "Jane Smith",
        userEmail: "jane@example.com",
        items: [
          { id: "3", name: "Custom Solution", quantity: 1, price: 1299.99 },
        ],
        status: "pending",
        paymentStatus: "pending",
        totalAmount: 1299.99,
        shippingAddress: "456 Oak Ave, Town, State 67890",
        orderDate: "2025-05-22",
        notes: "Requires approval from technical team",
      },
      {
        id: "ORD-003",
        userId: "3",
        userName: "Bob Johnson",
        userEmail: "bob@example.com",
        items: [{ id: "4", name: "Basic Package", quantity: 3, price: 99.99 }],
        status: "delivered",
        paymentStatus: "paid",
        totalAmount: 299.97,
        shippingAddress: "789 Pine Rd, Village, State 13579",
        orderDate: "2025-05-15",
        estimatedDelivery: "2025-05-20",
        trackingNumber: "TRK987654321",
      },
    ];

    setOrders(mockOrders);
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesPayment =
      paymentFilter === "all" || order.paymentStatus === paymentFilter;

    let matchesDate = true;
    if (dateFilter !== "all") {
      const orderDate = new Date(order.orderDate);
      const today = new Date();
      switch (dateFilter) {
        case "today":
          matchesDate = orderDate.toDateString() === today.toDateString();
          break;
        case "week": {
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = orderDate >= weekAgo;
          break;
        }
        case "month": {
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = orderDate >= monthAgo;
          break;
        }
      }
    }

    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
      </div>

      {/* Filters */}
      <OrderFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

      {/* Order Table */}
      <OrderTable
        orders={filteredOrders}
        setSelectedOrder={setSelectedOrder}
        setShowDetailsModal={setShowDetailsModal}
      />

      {/* Order Details Modal */}
      {showDetailsModal && (
        <OrderDetailsModal
          selectedOrder={selectedOrder}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default OrdersComponent;
