import React from "react";
import type { SendReplyModalProps } from "./SendMessage.types";
import CustomButton from "@/commons/components/Button";

const SendReplyModal: React.FC<SendReplyModalProps> = ({
  communication,
  replyMessage,
  onReplyChange,
  onSendReply,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div
        className="bg-white rounded-lg w-96 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xl font-semibold mb-4">Compose Reply</div>

        <div className="mb-4 text-sm text-gray-700">
          <p>
            <strong>To:</strong> {communication.userName} (
            {communication.userEmail})
          </p>
          {communication.subject && (
            <p>
              <strong>Subject:</strong>{" "}
              {communication.subject.startsWith("Re:")
                ? communication.subject
                : `Re: ${communication.subject}`}
            </p>
          )}
        </div>

        <textarea
          value={replyMessage}
          onChange={(e) => onReplyChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          rows={4}
          placeholder="Type your reply..."
        ></textarea>

        <div className="flex gap-3">
          <CustomButton
            onClick={onClose}
            variant="danger"
            size="md"
            disabled={false}
          >
            <p className="text-white">Cancel</p>
          </CustomButton>
          <CustomButton
            onClick={onSendReply}
            variant="secondary"
            size="md"
            fullWidth
            disabled={false}
          >
            <p className="text-white">Send Reply</p>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default SendReplyModal;
