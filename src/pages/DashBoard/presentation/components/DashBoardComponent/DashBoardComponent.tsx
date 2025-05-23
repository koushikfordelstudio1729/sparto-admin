import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppRoutes } from "@/commons/constants/routes";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardContent from "./components/DashboardContent";
import RightSidebar from "./components/RightSidebar";
import { getActiveTab } from "../../utils/getActiveTab";
import type { Notification } from "./DashBoard.types";

const DashBoardComponent: React.FC = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: "You have a new message from John",
      fullMessage: "You have a new message from John. Please check your inbox.",
      read: false,
      expanded: false,
    },
    {
      id: 2,
      message: "Your profile has been updated",
      fullMessage:
        "Your profile details have been successfully updated. Check them out now!",
      read: false,
      expanded: false,
    },
  ]);

  const activeTab = getActiveTab();

  const handleNotificationClick = (notificationId: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true, expanded: !notification.expanded }
          : notification
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          activeTab={activeTab}
          setRightSidebarOpen={setRightSidebarOpen}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {location.pathname === AppRoutes.DASHBOARD ? (
            <DashboardContent />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
      <RightSidebar
        rightSidebarOpen={rightSidebarOpen}
        setRightSidebarOpen={setRightSidebarOpen}
        notifications={notifications}
        handleNotificationClick={handleNotificationClick}
      />
    </div>
  );
};

export default DashBoardComponent;
