import React from "react";
import StatusBadge from "@/commons/components/StatusBadge/StatusBadge";
import { getCommunicationPriorityClass } from "@/commons/utils/getCommunicationPriorityClass";
import { getCommunicationStatusClass } from "@/commons/utils/getCommunicationStatusClass";
import { getTypeIcon } from "@/commons/utils/getTypeIcon";
import type { Communication } from "../CommunicationHistory.types";

interface Props {
  communication: Communication;
  replyMessage: string;
  onReplyChange: (value: string) => void;
  onSendReply: () => void;
  onClearReply: () => void;
  onClose: () => void;
}

const CommunicationDetailsModal: React.FC<Props> = ({
  communication,
  replyMessage,
  onReplyChange,
  onSendReply,
  onClearReply,
  onClose,
}) => {
  if (!communication) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div
        className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Communication Details</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {getTypeIcon(communication.type)}
                <span className="font-medium capitalize">
                  {communication.type.replace("_", " ")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge
                  text={
                    communication.priority.charAt(0).toUpperCase() +
                    communication.priority.slice(1)
                  }
                  className={getCommunicationPriorityClass(
                    communication.priority
                  )}
                />
                <StatusBadge
                  text={
                    communication.status.charAt(0).toUpperCase() +
                    communication.status.slice(1)
                  }
                  className={getCommunicationStatusClass(communication.status)}
                />
              </div>
            </div>
            {communication.subject && (
              <h4 className="text-lg font-semibold mb-2">
                {communication.subject}
              </h4>
            )}
            <div className="text-sm text-gray-600">
              <p>
                <strong>From:</strong> {communication.userName} (
                {communication.userEmail})
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(communication.timestamp).toLocaleString()}
              </p>
              {communication.adminName && (
                <p>
                  <strong>Handled by:</strong> {communication.adminName}
                </p>
              )}
              {communication.relatedOrderId && (
                <p>
                  <strong>Related Order:</strong> {communication.relatedOrderId}
                </p>
              )}
              {communication.relatedQuoteId && (
                <p>
                  <strong>Related Quote:</strong> {communication.relatedQuoteId}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-3">Message</h4>
            <div className="bg-white border rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">
                {communication.message}
              </p>
            </div>
          </div>

          {communication.status === "pending" && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Quick Reply</h4>
              <textarea
                value={replyMessage}
                onChange={(e) => onReplyChange(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Type your reply..."
              />
              <div className="flex gap-3 mt-3">
                <button
                  onClick={onSendReply}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Send Reply
                </button>
                <button
                  onClick={onClearReply}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunicationDetailsModal;
