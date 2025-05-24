import type { Communication } from "@/pages/DashBoard/presentation/components/CommunicationHistory/CommunicationHistory.types";
import { Mail, MessageCircle, MessageSquare, Phone } from "lucide-react";

export const getTypeIcon = (type: Communication["type"]) => {
  switch (type) {
    case "email":
      return <Mail size={16} />;
    case "chat":
      return <MessageCircle size={16} />;
    case "phone":
      return <Phone size={16} />;
    case "sms":
      return <MessageSquare size={16} />;
    case "support_ticket":
      return <MessageCircle size={16} />;
    default:
      return <MessageCircle size={16} />;
  }
};
