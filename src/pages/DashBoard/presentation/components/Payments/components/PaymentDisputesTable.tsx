import React from "react";
import type { DisputesTabProps } from "./PaymentDisputesTable.types";

export const DisputesTab: React.FC<DisputesTabProps> = ({ disputes }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left p-4 font-semibold text-gray-900">
              Dispute ID
            </th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Payment ID
            </th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Reason
            </th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Amount
            </th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Status
            </th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Created
            </th>
            <th className="text-left p-4 font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {disputes.map((dispute) => (
            <tr
              key={dispute.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="p-4 font-medium text-gray-900">{dispute.id}</td>
              <td className="p-4 text-gray-900">{dispute.paymentId}</td>
              <td className="p-4 text-gray-900">{dispute.reason}</td>
              <td className="p-4 font-medium text-gray-900">
                ${dispute.amount.toFixed(2)}
              </td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    dispute.status === "open"
                      ? "bg-red-100 text-red-800"
                      : dispute.status === "investigating"
                        ? "bg-yellow-100 text-yellow-800"
                        : dispute.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {dispute.status.charAt(0).toUpperCase() +
                    dispute.status.slice(1)}
                </span>
              </td>
              <td className="p-4 text-sm text-gray-900">
                {new Date(dispute.createdDate).toLocaleDateString()}
              </td>
              <td className="p-4">
                <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">
                  Investigate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
