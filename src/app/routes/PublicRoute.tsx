import { useAuth } from "@/commons/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { AppRoutes } from "@/commons/constants/routes";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to={AppRoutes.DASHBOARD} replace />;
  }

  return children;
};

export default PublicRoute;
