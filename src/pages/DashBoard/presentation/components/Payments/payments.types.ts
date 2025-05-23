export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  method: "credit_card" | "debit_card" | "paypal" | "bank_transfer" | "crypto";
  status:
    | "pending"
    | "processing"
    | "completed"
    | "failed"
    | "refunded"
    | "disputed";
  transactionId: string;
  date: string;
  gateway: string;
  fees: number;
  refundAmount?: number;
  refundDate?: string;
  refundReason?: string;
  disputeReason?: string;
  notes?: string;
}

export interface Dispute {
  id: string;
  paymentId: string;
  reason: string;
  amount: number;
  status: "open" | "investigating" | "resolved" | "closed";
  createdDate: string;
  resolvedDate?: string;
  resolution?: string;
}
