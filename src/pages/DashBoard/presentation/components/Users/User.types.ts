export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "suspended";
  role: "user" | "premium" | "business";
  joinDate: string;
  lastActive: string;
  totalOrders: number;
  totalSpent: number;
}
