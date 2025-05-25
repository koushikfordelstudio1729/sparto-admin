import React from "react";
import { X } from "lucide-react";
import type { RightSidebarProps } from "../DashBoard.types";

const RightSidebar: React.FC<RightSidebarProps> = ({
  rightSidebarOpen,
  setRightSidebarOpen,
  notifications,
  handleNotificationClick,
}) => (
  <div
    className={`${rightSidebarOpen ? "fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm" : ""} `}
  >
    <div
      className={`${
        rightSidebarOpen ? "w-[500px]" : "w-0"
      } bg-white shadow-lg transition-all duration-300 fixed top-0 right-0 bottom-0 z-50`}
    >
      <div className="p-4 border-b border-gray-200 flex items-center gap-[20px] justify-start">
        <button
          onClick={() => setRightSidebarOpen(false)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <X className="w-5 h-[26px] text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold">Notifications</h2>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
              className={`py-2 px-4 border-b cursor-pointer ${
                notification.read ? "bg-gray-100" : "bg-blue-50"
              }`}
            >
              <p>{notification.message}</p>
              {notification.expanded && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>{notification.fullMessage}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </div>
);

export default RightSidebar;
