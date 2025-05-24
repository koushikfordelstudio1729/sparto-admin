export interface Communication {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: "email" | "chat" | "phone" | "sms" | "support_ticket";
  subject?: string;
  message: string;
  status: "sent" | "delivered" | "read" | "replied" | "pending";
  timestamp: string;
  adminId?: string;
  adminName?: string;
  relatedOrderId?: string;
  relatedQuoteId?: string;
  priority: "low" | "medium" | "high" | "urgent";
}
