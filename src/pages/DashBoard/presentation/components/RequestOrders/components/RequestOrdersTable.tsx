import React from "react";
import type { RequestEntity } from "@/commons/domain/entities/RequestEntity";
import { Eye } from "lucide-react";

interface Props {
  requests: RequestEntity[];
  onManage: (req: RequestEntity) => void;
}

const RequestOrdersTable: React.FC<Props> = ({ requests, onManage }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg font-sans">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Request ID",
              "Customer",
              "Vehicle",
              "Type",
              "Date",
              "Status",
              "Files",
              "Actions",
            ].map((heading) => (
              <th
                key={heading}
                scope="col"
                className="px-6 py-4 text-left text-base font-semibold text-gray-800 uppercase tracking-wide"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {requests.map((req, idx) => (
            <tr
              key={req.id}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-6 py-5 whitespace-nowrap text-base text-gray-900 font-medium">
                {req.id}
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-base text-gray-700">
                {req.userName}
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-base text-gray-700">
                {req.vehicle_info.make} {req.vehicle_info.model}
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-base text-gray-700">
                {req.type.charAt(0).toUpperCase() + req.type.slice(1)}
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-base text-gray-700">
                {new Date(req.created_at * 1000).toLocaleDateString()}
              </td>
              <td className="px-6 py-5 whitespace-nowrap">
                <span
                  className={`
                    px-2 inline-flex text-sm leading-5 font-semibold rounded-full
                    ${
                      req.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : req.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : req.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                    }
                  `}
                >
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-base text-gray-700">
                {req.media?.length ?? 0}
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-base">
                <button
                  onClick={() => onManage(req)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                >
                  <Eye className="w-5 h-5" />
                  <span>Manage</span>
                </button>
              </td>
            </tr>
          ))}

          {requests.length === 0 && (
            <tr>
              <td
                colSpan={8}
                className="px-6 py-5 whitespace-nowrap text-center text-gray-500 text-base"
              >
                No requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestOrdersTable;
