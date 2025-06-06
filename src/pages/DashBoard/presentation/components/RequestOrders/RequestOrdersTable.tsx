import React from "react";
import type { RequestEntity } from "./requestOrders.types";

interface Props {
  requests: RequestEntity[];
  onManage: (req: RequestEntity) => void;
}

const RequestOrdersTable: React.FC<Props> = ({ requests, onManage }) => {
  return (
    <table className="w-full table-auto text-sm text-left border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Request ID</th>
          <th className="p-2">Customer</th>
          <th className="p-2">Vehicle</th>
          <th className="p-2">Type</th>
          <th className="p-2">Date</th>
          <th className="p-2">Status</th>
          <th className="p-2">📎 Files</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((req) => (
          <tr key={req.id} className="border-t hover:bg-gray-50">
            <td className="p-2">{req.id}</td>
            <td className="p-2">{req.userName}</td>
            <td className="p-2">{`${req.vehicle_info.make} ${req.vehicle_info.model}`}</td>
            <td className="p-2">{req.type}</td>
            <td className="p-2">
              {new Date(req.created_at * 1000).toISOString().split("T")[0]}
            </td>
            <td className="p-2">{req.status}</td>
            <td className="p-2">{req.media?.length}</td>
            <td className="p-2">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => onManage(req)}
              >
                👁 Manage
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestOrdersTable;
