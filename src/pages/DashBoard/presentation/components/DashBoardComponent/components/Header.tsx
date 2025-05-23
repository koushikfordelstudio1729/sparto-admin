import React from "react";
import { Search, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/commons/constants/routes";
import type { HeaderProps } from "../DashBoard.types";

const Header: React.FC<HeaderProps> = ({ activeTab, setRightSidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize">
          {activeTab}
        </h1>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setRightSidebarOpen(true)}
            className="p-2 rounded-full bg-violet-100 hover:bg-violet-200 relative"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
            <User
              className="w-5 h-5 text-white"
              onClick={() => navigate(AppRoutes.DASHBOARD_PROFILE)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
