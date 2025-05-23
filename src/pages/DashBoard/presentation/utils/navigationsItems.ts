import { AppRoutes } from "@/commons/constants/routes";
import {
  BarChart3,
  LogOut,
  MessageCircle,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";

export const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    route: AppRoutes.DASHBOARD,
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingCart,
    route: AppRoutes.DASHBOARD_ORDERS,
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    route: AppRoutes.DASHBOARD_ALL_USERS,
  },
  {
    id: "communication-history",
    label: "History",
    icon: MessageCircle,
    route: AppRoutes.DASHBOARD_COMMUNICATION_HISTORY,
  },
  {
    id: "payments",
    label: "Payments",
    icon: ShoppingCart,
    route: AppRoutes.DASHBOARD_PAYMENTS,
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    route: AppRoutes.DASHBOARD_PROFILE,
  },
  // {
  //   id: "settings",
  //   label: "Settings",
  //   icon: Settings,
  //   route: AppRoutes.DASHBOARD_SETTINGS,
  // },
  {
    id: "logout",
    label: "Logout",
    icon: LogOut,
    route: AppRoutes.LOGIN,
    isLogout: true,
  },
];
