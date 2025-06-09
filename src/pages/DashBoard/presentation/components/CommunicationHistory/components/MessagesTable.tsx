import React from "react";
import { Eye, Send } from "lucide-react";
import IconButton from "@/commons/components/IconButton/IconButton";
import StatusBadge from "@/commons/components/StatusBadge/StatusBadge";
import { getTypeIcon } from "@/commons/utils/getTypeIcon";
import type { Communication } from "../CommunicationHistory.types";
import { getCommunicationStatusClass } from "@/commons/utils/getCommunicationStatusClass";
export interface MessagesTableProps {
  communications: Communication[];
  onViewDetails: (comm: Communication) => void;
  onReply: (comm: Communication) => void;
}

const MessagesTable: React.FC<MessagesTableProps> = ({
  communications,
  onViewDetails,
  onReply,
}) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b bg-gray-50">
          <th className="p-4 text-left font-semibold">Type</th>
          <th className="p-4 text-left font-semibold">Customer</th>
          <th className="p-4 text-left font-semibold">Subject/Message</th>
          <th className="p-4 text-left font-semibold">Status</th>
          <th className="p-4 text-left font-semibold">Time</th>
          <th className="p-4 text-left font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {communications.map((comm) => (
          <tr
            key={comm.date + comm.customer}
            className="border-b hover:bg-gray-50"
          >
            <td className="p-4 flex items-center gap-2">
              {getTypeIcon(comm.type)}
              <span className="capitalize">{comm.type}</span>
            </td>
            <td className="p-4">{comm.customer}</td>
            <td className="p-4">
              {comm.subject && (
                <div className="font-medium">{comm.subject}</div>
              )}
              <div className="text-sm text-gray-600">
                {comm.data.length > 80
                  ? `${comm.data.slice(0, 80)}…`
                  : comm.data}
              </div>
            </td>
            <td className="p-4">
              <StatusBadge
                text={comm.status}
                className={getCommunicationStatusClass(comm.status)}
              />
            </td>
            <td className="p-4 text-sm">
              {new Date(comm.date).toLocaleString()}
            </td>
            <td className="p-4 flex gap-2">
              <IconButton
                icon={Eye}
                title="View"
                onClick={() => onViewDetails(comm)}
                className="text-blue-600 hover:bg-blue-100 p-1 rounded"
              />
              {comm.status === "pending" && (
                <IconButton
                  icon={Send}
                  title="Reply"
                  onClick={() => onReply(comm)}
                  className="text-green-600 hover:bg-green-100 p-1 rounded"
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {communications.length === 0 && (
      <div className="py-8 text-center text-gray-500">No messages found.</div>
    )}
  </div>
);

export default MessagesTable;
