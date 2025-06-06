import type { PaymentEntity } from "@/commons/domain/entities/PaymentEntity";
import {
  AlertTriangle,
  CreditCard,
  DollarSign,
  RefreshCcw,
} from "lucide-react";

export const getPaymentDashboardStats = (payments: PaymentEntity[]) => {
  const totalRevenue = payments.reduce(
    (sum, p) => sum + (p.status === "completed" ? p.amount : 0),
    0
  );

  const successfulCount = payments.filter(
    (p) => p.status === "completed"
  ).length;
  const pendingCount = payments.filter((p) => p.status === "pending").length;
  // const totalRefunds = payments.reduce(
  //   (sum, p) => sum + (p.refundAmount || 0),
  //   0
  // );

  return [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      variant: "green",
      icon: DollarSign,
      trend: { value: 3.4, isPositive: true, period: "vs last month" },
    },
    {
      title: "Successful Payments",
      value: successfulCount,
      variant: "blue",
      icon: CreditCard,
      trend: { value: 1.7, isPositive: true, period: "vs last month" },
    },
    {
      title: "Pending Payments",
      value: pendingCount,
      variant: "yellow",
      icon: AlertTriangle,
      trend: { value: 5.2, isPositive: false, period: "vs last week" },
    },
    {
      title: "Total Refunds",
      // value: `$${totalRefunds.toFixed(2)}`,
      variant: "red",
      icon: RefreshCcw,
      trend: { value: 0.9, isPositive: false, period: "vs last month" },
    },
  ];
};
