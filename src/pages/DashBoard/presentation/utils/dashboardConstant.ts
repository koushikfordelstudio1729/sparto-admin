import { BarChart3, Bell, ShoppingCart, Users } from "lucide-react";

export const DASHBOARD_STATS = [
  {
    title: "Total Users",
    value: "2,543",
    icon: Users,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Total Orders",
    value: "1,234",
    icon: ShoppingCart,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Revenue",
    value: "$45,678",
    icon: BarChart3,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Active Sessions",
    value: "89",
    icon: Bell,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];
