import IconButton from "@/commons/components/IconButton/IconButton";
import StatusBadge from "@/commons/components/StatusBadge/StatusBadge";
import { getCommunicationPriorityClass } from "@/commons/utils/getCommunicationPriorityClass";
import { getCommunicationStatusClass } from "@/commons/utils/getCommunicationStatusClass";
import { getTypeIcon } from "@/commons/utils/getTypeIcon";
import { Eye, Send } from "lucide-react";
import type { MessagesTabProps } from "./MessageTable.types";

const MessagesTab: React.FC<MessagesTabProps> = ({
  communications,
  onViewDetails,
  onReply,
}) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4 font-semibold text-gray-900">
                Type
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Customer
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Subject/Message
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Status
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Priority
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Time
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {communications.map((comm) => (
              <tr
                key={comm.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(comm.type)}
                    <span className="text-sm capitalize">
                      {comm.type.replace("_", " ")}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {comm.userName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {comm.userEmail}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    {comm.subject && (
                      <div className="font-medium text-gray-900 mb-1">
                        {comm.subject}
                      </div>
                    )}
                    <div className="text-sm text-gray-600">
                      {comm.message.length > 100
                        ? comm.message.substring(0, 100) + "..."
                        : comm.message}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <StatusBadge
                    text={
                      comm.status.charAt(0).toUpperCase() + comm.status.slice(1)
                    }
                    className={getCommunicationStatusClass(comm.status)}
                  />
                </td>
                <td className="p-4">
                  <StatusBadge
                    text={
                      comm.priority.charAt(0).toUpperCase() +
                      comm.priority.slice(1)
                    }
                    className={getCommunicationPriorityClass(comm.priority)}
                  />
                </td>
                <td className="p-4">
                  <div className="text-sm text-gray-900">
                    {new Date(comm.timestamp).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(comm.timestamp).toLocaleTimeString()}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <IconButton
                      icon={Eye}
                      title="View Details"
                      onClick={() => onViewDetails(comm)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                    />
                    {comm.status === "pending" && (
                      <IconButton
                        icon={Send}
                        title="Reply"
                        onClick={() => onReply(comm)}
                        className="p-1 text-green-600 hover:bg-green-100 rounded"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {communications.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No communications found matching your criteria.
        </div>
      )}
    </>
  );
};

export default MessagesTab;
