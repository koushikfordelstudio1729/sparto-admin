import React, { useState } from "react";
import RequestOrdersTable from "./RequestOrdersTable";
import type { RequestEntity } from "./requestOrders.types";
import QuoteManagementComponent from "@/pages/DashBoard/presentation/components/Orders/components/QuoteManagementComponent";

const mockData: RequestEntity[] = [
  {
    id: "REQ-001",
    user_id: "u1",
    userName: "John Doe",
    type: "repair",
    description: "Engine is making a knocking sound during acceleration.",
    vehicle_info: {
      make: "Toyota",
      model: "Camry",
      year: 2020,
      vin: "1HGCM82633A004352",
      license_plate: "AB123CD",
    },
    media: [],
    status: "Pending",
    clarification_count: 0,
    created_at: 1717651200,
    updated_at: 1717651200,
  },
];

const RequestOrdersComponent: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<RequestEntity | null>(
    null
  );

  console.log(
    "Rendering RequestOrdersComponent. Selected Request:",
    selectedRequest
  );

  return (
    <>
      {selectedRequest ? (
        <QuoteManagementComponent
          orderId={selectedRequest.id}
          customerName={selectedRequest.userName}
          createdAt={selectedRequest.created_at}
          totalValue={0}
          onBack={() => setSelectedRequest(null)}
        />
      ) : (
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Requested Orders
          </h2>
          <RequestOrdersTable
            requests={mockData}
            onManage={(req) => {
              console.log("👁 Manage clicked:", req);
              setSelectedRequest(req);
            }}
          />
        </div>
      )}
    </>
  );
};

export default RequestOrdersComponent;
