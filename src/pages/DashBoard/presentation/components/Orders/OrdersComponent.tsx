import type { RootState } from "@/app/store/store";
import FilterBar from "@/commons/components/FilterBar/FilterBar";
import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderDetailsModal from "./components/OrderDetailsModal";
import OrderTable from "./components/OrderTable";
import { useOrdersComponentViewModelDI } from "./OrdersComponent.di";

const OrdersComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<OrderEntity | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const viewModel = useOrdersComponentViewModelDI();

  useEffect(() => {
    viewModel.initialize();
  }, [viewModel]);

  const { allOrders } = useSelector(
    (state: RootState) => state.OrdersComponentslice
  );
  const filteredOrders = allOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    const matchesPayment =
      paymentFilter === "all" || order.status === paymentFilter;

    let matchesDate = true;
    if (dateFilter !== "all") {
      const orderDate = new Date(order.createdAt);
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

      <FilterBar
        search={{
          value: searchTerm,
          onChange: setSearchTerm,
          placeholder: "Search orders...",
        }}
        filters={[
          {
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "all", label: "All Status" },
              { value: "pending", label: "Pending" },
              { value: "confirmed", label: "Confirmed" },
              { value: "processing", label: "Processing" },
              { value: "shipped", label: "Shipped" },
              { value: "delivered", label: "Delivered" },
              { value: "cancelled", label: "Cancelled" },
            ],
          },
          {
            value: paymentFilter,
            onChange: setPaymentFilter,
            options: [
              { value: "all", label: "All Payments" },
              { value: "pending", label: "Payment Pending" },
              { value: "paid", label: "Paid" },
              { value: "failed", label: "Failed" },
              { value: "refunded", label: "Refunded" },
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
        className="w-full md:w-full"
      />

      <OrderTable
        orders={filteredOrders}
        setSelectedOrder={setSelectedOrder}
        setShowDetailsModal={setShowDetailsModal}
      />

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
