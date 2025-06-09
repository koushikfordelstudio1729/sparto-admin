import React from "react";
import type { Communication } from "../CommunicationHistory.types";
interface Props {
  isOpen: boolean;
  communication: Communication;
  replyMessage: string;
  onReplyChange: (msg: string) => void;
  onSendReply: () => void;
  onClearReply: () => void;
  onClose: () => void;
}

const CommunicationDetailsModal: React.FC<Props> = ({
  isOpen,
  communication,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">
            {communication.subject ?? "Details"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Meta */}
        <div className="space-y-2 mb-4 text-sm text-gray-700">
          <p>
            <strong>Type:</strong>{" "}
            <span className="capitalize">{communication.type}</span>
          </p>
          <p>
            <strong>Customer:</strong> {communication.customer}
          </p>
          <p>
            <strong>Status:</strong> {communication.status}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(communication.date).toLocaleString()}
          </p>
        </div>

        {/* Message / Data */}
        <div>
          <h4 className="font-semibold mb-2">Message</h4>
          <div className="p-4 bg-gray-50 rounded">
            <p className="text-gray-800 whitespace-pre-wrap">
              {communication.data}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationDetailsModal;
