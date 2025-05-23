export interface ApiEndpoint {
  path: string;
  requiresAuth: boolean;
}

export const ApiEndpoints: Record<string, ApiEndpoint> = {
  login: {
    path: "users/login",
    requiresAuth: false,
  },
};
