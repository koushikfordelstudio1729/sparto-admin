import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RequestOrdersTable from "./components/RequestOrdersTable";
import QuoteManagementComponent from "@/pages/DashBoard/presentation/components/ConversationAndQuote/ConversationAndQuoteComponent";

import { useRequestOrdersComponentViewModelDI } from "./ReuestOrderComponent.di";

import type { RequestEntity } from "@/commons/domain/entities/RequestEntity";
import type { RootState } from "@/app/store/store";

const RequestOrdersComponent: React.FC = () => {
  const vm = useRequestOrdersComponentViewModelDI();
  const { requestOrders } = useSelector(
    (state: RootState) => state.requestOrders
  );

  const [selectedRequest, setSelectedRequest] = useState<RequestEntity | null>(
    null
  );

  useEffect(() => {
    vm.initialize();
  }, [vm]);

  return (
    <>
      {selectedRequest ? (
        <QuoteManagementComponent
          requestId={selectedRequest.id}
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
            requests={requestOrders}
            onManage={(req) => setSelectedRequest(req)}
          />
        </div>
      )}
    </>
  );
};

export default RequestOrdersComponent;
