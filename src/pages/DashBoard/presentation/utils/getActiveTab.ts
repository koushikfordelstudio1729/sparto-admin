import { AppRoutes } from "@/commons/constants/routes";
export const getActiveTab = () => {
  switch (location.pathname) {
    case AppRoutes.DASHBOARD_ORDERS:
      return "orders";
    case AppRoutes.DASHBOARD_ALL_USERS:
      return "users";
    case AppRoutes.DASHBOARD_PROFILE:
      return "profile";
    case AppRoutes.DASHBOARD_PAYMENTS:
      return "payments";
    case AppRoutes.DASHBOARD_COMMUNICATION_HISTORY:
      return "communication-history";
    case AppRoutes.DASHBOARD_SETTINGS:
      return "settings";
    default:
      return "dashboard";
  }
};
