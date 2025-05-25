import React from "react";
import { Menu, X } from "lucide-react";
import { NavButton } from "./NavButton";
import { navigationItems } from "../../../utils/navigationsItems";
import type { SidebarProps } from "../DashBoard.types";

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
}) => {
  const regularNavItems = navigationItems.filter((item) => !item.isLogout);
  const logoutItem = navigationItems.find((item) => item.isLogout);

  return (
    <div
      className={`${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 flex flex-col`}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {sidebarOpen && (
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors ml-auto"
        >
          {sidebarOpen ? (
            <X className="w-5 h-[26px] text-gray-600" />
          ) : (
            <Menu className="w-5 h-[26px] text-gray-600" />
          )}
        </button>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto  overflow-x-hidden">
        <ul className="space-y-2">
          {regularNavItems.map((item) => (
            <li key={item.id}>
              <NavButton
                item={item}
                isActive={activeTab === item.id}
                sidebarOpen={sidebarOpen}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      {logoutItem && (
        <div className="p-4 border-t border-gray-200">
          <NavButton
            item={logoutItem}
            isActive={false}
            sidebarOpen={sidebarOpen}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
