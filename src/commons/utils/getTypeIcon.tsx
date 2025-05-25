import {
  CreditCard,
  DollarSign,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
} from "lucide-react";

export const getTypeIcon = (typeOrMethod: string) => {
  switch (typeOrMethod) {
    case "email":
      return <Mail size={16} />;
    case "chat":
    case "support_ticket":
      return <MessageCircle size={16} />;
    case "sms":
      return <MessageSquare size={16} />;
    case "phone":
      return <Phone size={16} />;

    case "credit_card":
    case "debit_card":
      return <CreditCard size={16} />;
    case "paypal":
    case "bank_transfer":
    case "crypto":
      return <DollarSign size={16} />;

    default:
      return <MessageCircle size={16} />;
  }
};
