import type { Communication } from "../CommunicationHistory.types";

export interface MessagesTabProps {
  communications: Communication[];
  onViewDetails: (comm: Communication) => void;
  onReply: (comm: Communication) => void;
}
