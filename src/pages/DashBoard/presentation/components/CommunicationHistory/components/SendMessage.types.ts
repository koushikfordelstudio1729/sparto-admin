import type { Communication } from "../CommunicationHistory.types";

export interface SendReplyModalProps {
  communication: Communication;
  replyMessage: string;
  onReplyChange: (value: string) => void;
  onSendReply: () => void;
  onClose: () => void;
}
