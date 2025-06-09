export interface ApiEndpoint {
  path: string;
  requiresAuth: boolean;
}

export const ApiEndpoints: Record<string, ApiEndpoint> = {
  login: {
    path: "users/login",
    requiresAuth: false,
  },
  allUsers: {
    path: "users",
    requiresAuth: true,
  },
  orders: {
    path: "orders",
    requiresAuth: true,
  },
  payments: {
    path: "payments", // 👈 Add this line
    requiresAuth: true,
  },
  requestorder: {
    path: "requests", // 👈 Add this line
    requiresAuth: true,
  },
  clarifications: {
    path: "clarifications",
    requiresAuth: true,
  },
};
