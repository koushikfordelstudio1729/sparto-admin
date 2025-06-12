// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import type { RootState } from "@/app/store/store";
// import FilterBar from "@/commons/components/FilterBar/FilterBar";
// import OrderTable from "./components/OrderTable";
// import type { RequestEntity } from "@/commons/domain/entities/RequestEntity";
// import QuoteManagementComponent from "@/pages/DashBoard/presentation/components/ConversationAndQuote/ConversationAndQuoteComponent";
// import { useOrdersComponentViewModelDI } from "./OrdersComponent.di";
// import TrackingOrder from "./components/TrackingOrder";
// import OrderDetailsModal from "./components/OrderDetailsModal";
// const OrdersComponent: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [paymentFilter, setPaymentFilter] = useState("all");
//   const [dateFilter, setDateFilter] = useState("all");

//   const [selectedRequest, setSelectedRequest] = useState<RequestEntity | null>(
//     null
//   );

//   const [activeTab, setActiveTab] = useState<"ordered" | "requested">(
//     "ordered"
//   );

//   const OrderViewModel = useOrdersComponentViewModelDI();

//   useEffect(() => {
//     OrderViewModel.initialize();
//   }, [OrderViewModel]);

//   const { allOrders } = useSelector(
//     (state: RootState) => state.OrdersComponentslice
//   );

//   const filteredOrders = allOrders.filter((order) => {
//     const matchesSearch =
//       order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.userId.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       statusFilter === "all" || order.status === statusFilter;
//     const matchesPayment =
//       paymentFilter === "all" || order.status === paymentFilter;

//     let matchesDate = true;
//     if (dateFilter !== "all") {
//       const orderDate = new Date(order.createdAt);
//       const today = new Date();
//       switch (dateFilter) {
//         case "today":
//           matchesDate = orderDate.toDateString() === today.toDateString();
//           break;
//         case "week":
//           matchesDate =
//             orderDate >= new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
//           break;
//         case "month":
//           matchesDate =
//             orderDate >= new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
//           break;
//       }
//     }

//     return matchesSearch && matchesStatus && matchesPayment && matchesDate;
//   });

//   if (selectedRequest) {
//     return (
//       <QuoteManagementComponent
//         requestId={selectedRequest.id}
//         customerName={selectedRequest.userName}
//         createdAt={selectedRequest.created_at}
//         totalValue={0}
//         onBack={() => setSelectedRequest(null)}
//       />
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-sm">
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">
//         Order Management
//       </h2>

//       {/* Tabs */}
//       <div className="border-b border-gray-200 mb-4">
//         <nav className="-mb-px flex space-x-8">
//           <button
//             onClick={() => setActiveTab("ordered")}
//             className={`whitespace-nowrap pb-2 px-1 border-b-2 text-sm font-medium ${
//               activeTab === "ordered"
//                 ? "border-blue-500 text-blue-600"
//                 : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//             }`}
//           >
//             Ordered
//           </button>
//           <button
//             onClick={() => setActiveTab("requested")}
//             className={`whitespace-nowrap pb-2 px-1 border-b-2 text-sm font-medium ${
//               activeTab === "requested"
//                 ? "border-blue-500 text-blue-600"
//                 : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//             }`}
//           >
//             Tracking Orders
//           </button>
//         </nav>
//       </div>

//       {/* Content */}
//       {activeTab === "ordered" ? (
//         <>
//           <FilterBar
//             search={{
//               value: searchTerm,
//               onChange: setSearchTerm,
//               placeholder: "Search orders...",
//             }}
//             filters={[
//               {
//                 value: statusFilter,
//                 onChange: setStatusFilter,
//                 options: [
//                   { value: "all", label: "All Status" },
//                   { value: "pending", label: "Pending" },
//                   { value: "confirmed", label: "Confirmed" },
//                   { value: "processing", label: "Processing" },
//                   { value: "shipped", label: "Shipped" },
//                   { value: "delivered", label: "Delivered" },
//                   { value: "cancelled", label: "Cancelled" },
//                 ],
//               },
//               {
//                 value: paymentFilter,
//                 onChange: setPaymentFilter,
//                 options: [
//                   { value: "all", label: "All Payments" },
//                   { value: "pending", label: "Payment Pending" },
//                   { value: "paid", label: "Paid" },
//                   { value: "failed", label: "Failed" },
//                   { value: "refunded", label: "Refunded" },
//                 ],
//               },
//               {
//                 value: dateFilter,
//                 onChange: setDateFilter,
//                 options: [
//                   { value: "all", label: "All Time" },
//                   { value: "today", label: "Today" },
//                   { value: "week", label: "This Week" },
//                   { value: "month", label: "This Month" },
//                 ],
//               },
//             ]}
//             className="w-full md:w-full"
//           />

//           <OrderTable
//             orders={filteredOrders}
//             setShowDetailsModal={() => {}}
//             OrderViewModel={OrderViewModel}
//           />
//         </>
//       ) : (
//         <TrackingOrder />
//       )}
//     </div>
//   );
// };

// export default OrdersComponent;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import FilterBar from "@/commons/components/FilterBar/FilterBar";
import OrderTable from "./components/OrderTable";
import type { RequestEntity } from "@/commons/domain/entities/RequestEntity";
import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";
import QuoteManagementComponent from "@/pages/DashBoard/presentation/components/ConversationAndQuote/ConversationAndQuoteComponent";
import { useOrdersComponentViewModelDI } from "./OrdersComponent.di";
import TrackingOrder from "./components/TrackingOrder";
import OrderDetailsModal from "./components/OrderDetailsModal";

const OrdersComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<OrderEntity | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestEntity | null>(
    null
  );

  const [activeTab, setActiveTab] = useState<"ordered" | "requested">(
    "ordered"
  );

  const OrderViewModel = useOrdersComponentViewModelDI();

  useEffect(() => {
    OrderViewModel.initialize();
  }, [OrderViewModel]);

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
      paymentFilter === "all" || order.status === paymentFilter; // This assumes payment status is in `status`, adjust if needed

    let matchesDate = true;
    if (dateFilter !== "all") {
      const orderDate = new Date(order.createdAt);
      const today = new Date();
      switch (dateFilter) {
        case "today":
          matchesDate = orderDate.toDateString() === today.toDateString();
          break;
        case "week":
          matchesDate =
            orderDate >= new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "month":
          matchesDate =
            orderDate >= new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
      }
    }

    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  if (selectedRequest) {
    return (
      <QuoteManagementComponent
        requestId={selectedRequest.id}
        customerName={selectedRequest.userName}
        createdAt={selectedRequest.created_at}
        totalValue={0}
        onBack={() => setSelectedRequest(null)}
      />
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Order Management
      </h2>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("ordered")}
            className={`whitespace-nowrap pb-2 px-1 border-b-2 text-sm font-medium ${
              activeTab === "ordered"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Ordered
          </button>
          <button
            onClick={() => setActiveTab("requested")}
            className={`whitespace-nowrap pb-2 px-1 border-b-2 text-sm font-medium ${
              activeTab === "requested"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Tracking Orders
          </button>
        </nav>
      </div>

      {/* Ordered Tab Content */}
      {activeTab === "ordered" ? (
        <>
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
            setShowDetailsModal={(show) => setShowDetailsModal(show)}
            OrderViewModel={OrderViewModel}
            setSelectedOrder={(order) => {
              console.log("Selected order →", order); // 👈 log it
              setSelectedOrder(order);
            }}
          />
        </>
      ) : (
        <TrackingOrder />
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
};

export default OrdersComponent;
