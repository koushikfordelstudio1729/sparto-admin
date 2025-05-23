import { AppRoutes } from "@/commons/constants/routes";
import OrdersComponent from "@/pages/DashBoard/presentation/components/Orders/OrdersComponent";
import UsersComponent from "@/pages/DashBoard/presentation/components/Users/UsersComponent";
import DashBoardPage from "@/pages/DashBoard/presentation/views/DashBoardPage";
import LoginPage from "@/pages/Login/presentation/views/LoginPage";
import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import SettingsComponent from "@/pages/DashBoard/presentation/components/Settings/SettingsComponent";
import ProfileComponent from "@/pages/DashBoard/presentation/components/Profile/ProfileComponent";
import PageNotFound from "@/pages/PageNotFound/presentation/view/PageNotFound";
import PaymentComponent from "@/pages/DashBoard/presentation/components/Payments/PaymentsComponent";
import CommunicationHistory from "@/pages/DashBoard/presentation/components/CommunicationHistory/CommunicationHistoryComponent";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path={AppRoutes.ROOT}
            element={<Navigate to={AppRoutes.DASHBOARD} replace />}
          />

          <Route
            path={AppRoutes.LOGIN}
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route element={<ProtectedRoute />}>
            <Route path={AppRoutes.DASHBOARD} element={<DashBoardPage />}>
              <Route
                path={AppRoutes.DASHBOARD_ALL_USERS}
                element={<UsersComponent />}
              />
              <Route
                path={AppRoutes.DASHBOARD_ORDERS}
                element={<OrdersComponent />}
              />
              <Route
                path={AppRoutes.DASHBOARD_COMMUNICATION_HISTORY}
                element={<CommunicationHistory />}
              />
              <Route
                path={AppRoutes.DASHBOARD_PAYMENTS}
                element={<PaymentComponent />}
              />
              <Route
                path={AppRoutes.DASHBOARD_SETTINGS}
                element={<SettingsComponent />}
              />
              <Route
                path={AppRoutes.DASHBOARD_PROFILE}
                element={<ProfileComponent />}
              />
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
