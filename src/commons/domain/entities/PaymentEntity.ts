export interface PaymentEntity {
  _id: string;
  orderId: string;
  userId: string;
  userName?: string;
  amount: number;
  method?: string;
  gateway?: string;
  date?: number;
  currency?: string;
  status?: PaymentStatus;
  transactionId: string;
  notes?: string;
  createdAt: number;
  updatedAt?: number;
}

export type PaymentStatus = "pending" | "processing" | "completed" | "failed";
