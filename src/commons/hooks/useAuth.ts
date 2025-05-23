import { useCallback, useState, useEffect, useMemo } from "react";
import { AuthService } from "../network/AuthService";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const authService = useMemo(() => new AuthService(), []);

  const checkAuthentication = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await authService.getToken();
      setIsAuthenticated(!!token);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, [authService]);

  const login = useCallback(
    async (token: string, refreshToken?: string) => {
      authService.setToken(token);
      if (refreshToken) {
        authService.setRefreshToken(refreshToken);
      }
      setIsAuthenticated(true);
    },
    [authService]
  );

  const logout = useCallback(() => {
    authService.clearToken();
    setIsAuthenticated(false);
  }, [authService]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuthentication,
  };
};
