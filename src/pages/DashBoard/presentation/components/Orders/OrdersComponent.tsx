// import type { RootState } from "@/app/store/store";
// import FilterBar from "@/commons/components/FilterBar/FilterBar";
// import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import OrderDetailsModal from "./components/OrderDetailsModal";
// import OrderTable from "./components/OrderTable";
// import { useOrdersComponentViewModelDI } from "./OrdersComponent.di";

// const OrdersComponent: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [paymentFilter, setPaymentFilter] = useState("all");
//   const [dateFilter, setDateFilter] = useState("all");
//   const [selectedOrder, setSelectedOrder] = useState<OrderEntity | null>(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);

//   const viewModel = useOrdersComponentViewModelDI();

//   useEffect(() => {
//     viewModel.initialize();
//   }, [viewModel]);

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
//         case "week": {
//           const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
//           matchesDate = orderDate >= weekAgo;
//           break;
//         }
//         case "month": {
//           const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
//           matchesDate = orderDate >= monthAgo;
//           break;
//         }
//       }
//     }

//     return matchesSearch && matchesStatus && matchesPayment && matchesDate;
//   });

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-sm">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
//       </div>

//       <FilterBar
//         search={{
//           value: searchTerm,
//           onChange: setSearchTerm,
//           placeholder: "Search orders...",
//         }}
//         filters={[
//           {
//             value: statusFilter,
//             onChange: setStatusFilter,
//             options: [
//               { value: "all", label: "All Status" },
//               { value: "pending", label: "Pending" },
//               { value: "confirmed", label: "Confirmed" },
//               { value: "processing", label: "Processing" },
//               { value: "shipped", label: "Shipped" },
//               { value: "delivered", label: "Delivered" },
//               { value: "cancelled", label: "Cancelled" },
//             ],
//           },
//           {
//             value: paymentFilter,
//             onChange: setPaymentFilter,
//             options: [
//               { value: "all", label: "All Payments" },
//               { value: "pending", label: "Payment Pending" },
//               { value: "paid", label: "Paid" },
//               { value: "failed", label: "Failed" },
//               { value: "refunded", label: "Refunded" },
//             ],
//           },
//           {
//             value: dateFilter,
//             onChange: setDateFilter,
//             options: [
//               { value: "all", label: "All Time" },
//               { value: "today", label: "Today" },
//               { value: "week", label: "This Week" },
//               { value: "month", label: "This Month" },
//             ],
//           },
//         ]}
//         className="w-full md:w-full"
//       />

//       <OrderTable
//         orders={filteredOrders}
//         setSelectedOrder={setSelectedOrder}
//         setShowDetailsModal={setShowDetailsModal}
//       />

//       {/* {showDetailsModal && (
//         <OrderDetailsModal
//           selectedOrder={selectedOrder}
//           onClose={() => setShowDetailsModal(false)}
//         />
//       )} */}
//     </div>
//   );
// };

// export default OrdersComponent;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
// import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";
import FilterBar from "@/commons/components/FilterBar/FilterBar";
import OrderTable from "./components/OrderTable";
import RequestOrdersTable from "../RequestOrders/RequestOrdersTable";
import type { RequestEntity } from "../RequestOrders/requestOrders.types";
import QuoteManagementComponent from "@/pages/DashBoard/presentation/components/Orders/components/QuoteManagementComponent";
import { useOrdersComponentViewModelDI } from "./OrdersComponent.di";

const OrdersComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  // const [selectedOrder, setSelectedOrder] = useState<OrderEntity | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<RequestEntity | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<"ordered" | "requested">(
    "ordered"
  );

  const viewModel = useOrdersComponentViewModelDI();

  const dummyRequests: RequestEntity[] = [
    {
      id: "REQ-001",
      user_id: "u1",
      userName: "John Doe",
      type: "repair",
      description: "Engine issue",
      vehicle_info: {
        make: "Toyota",
        model: "Camry",
        year: 2020,
        vin: "123456",
        license_plate: "ABC123",
      },
      media: [],
      status: "Pending",
      clarification_count: 0,
      created_at: 1717651200,
      updated_at: 1717651200,
    },
    {
      id: "REQ-002",
      user_id: "u2",
      userName: "Jane Smith",
      type: "replace",
      description: "Front bumper replacement needed.",
      vehicle_info: {
        make: "Honda",
        model: "Accord",
        year: 2019,
        vin: "654321",
        license_plate: "XYZ789",
      },
      media: [],
      status: "Pending",
      clarification_count: 1,
      created_at: 1717737600,
      updated_at: 1717737600,
    },
    {
      id: "REQ-003",
      user_id: "u3",
      userName: "Mark Taylor",
      type: "diagnostic",
      description: "Check engine light is on.",
      vehicle_info: {
        make: "Ford",
        model: "Fusion",
        year: 2018,
        vin: "789123",
        license_plate: "LMN456",
      },
      media: [],
      status: "Pending",
      clarification_count: 0,
      created_at: 1717824000,
      updated_at: 1717824000,
    },
    {
      id: "REQ-004",
      user_id: "u4",
      userName: "Alice Brown",
      type: "repair",
      description: "AC not cooling properly.",
      vehicle_info: {
        make: "Chevrolet",
        model: "Impala",
        year: 2021,
        vin: "112233",
        license_plate: "QRS123",
      },
      media: [],
      status: "Pending",
      clarification_count: 2,
      created_at: 1717910400,
      updated_at: 1717910400,
    },
    {
      id: "REQ-005",
      user_id: "u5",
      userName: "Michael Lee",
      type: "replace",
      description: "Battery replacement required.",
      vehicle_info: {
        make: "Hyundai",
        model: "Elantra",
        year: 2022,
        vin: "445566",
        license_plate: "TUV890",
      },
      media: [],
      status: "Pending",
      clarification_count: 0,
      created_at: 1717996800,
      updated_at: 1717996800,
    },
  ];

  const handleManage = (req: RequestEntity) => {
    console.log("Manage request:", req);
    setSelectedRequest(req);
  };

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
        orderId={selectedRequest.id}
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
            Requested Orders
          </button>
        </nav>
      </div>

      {/* Content */}
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
            setSelectedOrder={setSelectedOrder}
            setShowDetailsModal={() => {}}
          />
        </>
      ) : (
        <RequestOrdersTable requests={dummyRequests} onManage={handleManage} />
      )}
    </div>
  );
};

export default OrdersComponent;
