// A single line-item on a quote
export interface QuoteItem {
  itemId: string;
  description: string;
  qty: number;
  unitPrice: number;
}

/**
 * A price quote sent in response to a request
 */
export interface QuoteEntity {
  id: string;
  requestId: string; // which Request this quote belongs to
  adminId: string; // who created the quote
  items: QuoteItem[]; // line-items
  subtotal: number; // sum(qty * unitPrice)
  tax: number;
  shipping: number;
  total: number; // subtotal + tax + shipping
  validUntil: number; // UNIX seconds timestamp
  status: "Draft" | "Sent" | "Accepted" | "Rejected";
  createdAt: number; // UNIX seconds
  sentAt?: number; // UNIX seconds (when status moved to Sent)
}
