import type { Communication } from "./CommunicationHistory.types";

export const mockCommunications: Communication[] = [
  {
    id: "uid1234",
    userName: "sabir",
    userEmail: "k@gmail.com",
    type: "email",
    customer: "John Doe",
    subject: "Question about my order",
    status: "read",
    date: "2025-05-22T14:30:00Z",
    data: "Hi, I wanted to check the status of my recent order ORD-001. When can I expect delivery?",
  },
  {
    id: "uid1235",
    userName: "rajesh",
    userEmail: "r@gmail.com",
    type: "email",
    customer: "John Doe",
    subject: "Re: Question about my order",
    status: "sent",
    date: "2025-05-22T15:45:00Z",
    data: "Thank you for contacting us. Your order ORD-001 is currently being processed and will be shipped within 2-3 business days. You will receive a tracking number once shipped.",
  },
  {
    id: "uid1234",
    userName: "rohit",
    userEmail: "rohit@gmail.com",
    type: "phone",
    customer: "Jane Smith",
    subject: "",
    status: "pending",
    date: "2025-05-21T16:20:00Z",
    data: "Called customer to discuss project requirements and timeline. Customer confirmed additional features needed for marketing campaign.",
  },
];
