import type { ComponentType, SVGProps } from "react";
import { MessageCircle, FileText } from "lucide-react";
export interface QuoteManagementProps {
  requestId: string;
  customerName: string;
  createdAt: number;
  totalValue: number;
  onBack: () => void;
}

export interface TabItem {
  id: "conversation" | "quote_preparation";
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const ConversationTabs: TabItem[] = [
  {
    id: "conversation",
    label: "Conversation",
    icon: MessageCircle,
  },
  {
    id: "quote_preparation",
    label: "Prepare Quote",
    icon: FileText,
  },
];

export interface ConversationHistoryProps {
  requestId: string;
  actorId: string;
  actorType: "admin" | "user";
}
