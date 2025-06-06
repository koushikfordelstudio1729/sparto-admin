// commons/domain/entities/QuoteEntity.ts
export interface QuoteEntity {
  id: string;
  orderId: string;
  version: number;
  status: "draft" | "sent" | "updated" | "cancelled" | "expired";
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    tax: number;
    total: number;
  }>;
  subtotal: number;
  totalTax: number;
  totalAmount: number;
  validityPeriod: number;
  validUntil: Date;
  notes?: string;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}
