import type { Dispute, Payment } from "../payments.types";

export const mockPayments: Payment[] = [
  {
    id: "PAY-001",
    orderId: "ORD-001",
    userId: "1",
    userName: "John Doe",
    amount: 749.98,
    currency: "USD",
    method: "credit_card",
    status: "completed",
    transactionId: "TXN-ABC123",
    date: "2025-05-20T10:30:00Z",
    gateway: "Stripe",
    fees: 22.5,
  },
  {
    id: "PAY-002",
    orderId: "ORD-002",
    userId: "2",
    userName: "Jane Smith",
    amount: 1299.99,
    currency: "USD",
    method: "paypal",
    status: "pending",
    transactionId: "TXN-DEF456",
    date: "2025-05-22T14:15:00Z",
    gateway: "PayPal",
    fees: 39.0,
  },
  {
    id: "PAY-003",
    orderId: "ORD-003",
    userId: "3",
    userName: "Bob Johnson",
    amount: 299.97,
    currency: "USD",
    method: "credit_card",
    status: "disputed",
    transactionId: "TXN-GHI789",
    date: "2025-05-15T09:45:00Z",
    gateway: "Stripe",
    fees: 9.0,
    disputeReason: "Product not received",
  },
];

export const mockDisputes: Dispute[] = [
  {
    id: "DIS-001",
    paymentId: "PAY-003",
    reason: "Product not received",
    amount: 299.97,
    status: "investigating",
    createdDate: "2025-05-18T16:20:00Z",
  },
];
