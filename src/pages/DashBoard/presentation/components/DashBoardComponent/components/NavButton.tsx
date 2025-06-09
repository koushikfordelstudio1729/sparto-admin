// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import type { NavButtonProps } from "../../types/index.types";
// import LogoutModal from "../../../modals/LogoutModal";
// import { useDashBoardPageViewModelDI } from "../../../page.di";

// export const NavButton = ({ item, isActive, sidebarOpen }: NavButtonProps) => {
//   const navigate = useNavigate();
//   const viewModel = useDashBoardPageViewModelDI();
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   const Icon = item.icon;

//   const handleClick = () => {
//     if (item.isLogout) {
//       setShowLogoutModal(true);
//     } else {
//       navigate(item.route);
//     }
//   };

//   const handleConfirmLogout = () => {
//     viewModel.logout();

//     setShowLogoutModal(false);

//     navigate(item.route);
//   };

//   const handleCancelLogout = () => {
//     setShowLogoutModal(false);
//   };

//   const isLogout = item.isLogout;

//   return (
//     <>
//       <button
//         onClick={handleClick}
//         className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 group relative ${
//           isLogout
//             ? "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
//             : isActive
//               ? "bg-blue-50 text-blue-700 shadow-sm"
//               : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
//         }`}
//         title={!sidebarOpen ? item.label : undefined}
//       >
//         <Icon
//           className={`w-5 h-5 min-w-5 ${
//             isLogout
//               ? "text-red-600 group-hover:scale-110 transition-transform"
//               : isActive
//                 ? "text-blue-600"
//                 : "text-gray-500 group-hover:text-gray-700"
//           }`}
//         />
//         {sidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
//         {isActive && !isLogout && (
//           <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-l-full" />
//         )}
//         {!sidebarOpen && (
//           <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
//             {item.label}
//             <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
//           </div>
//         )}
//       </button>

//       <LogoutModal
//         isOpen={showLogoutModal}
//         onConfirm={handleConfirmLogout}
//         onCancel={handleCancelLogout}
//       />
//     </>
//   );
// };
// src/pages/DashBoard/presentation/components/Sidebar/NavButton.tsx

import React, { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import type { NavButtonProps } from "../../types/index.types";
import LogoutModal from "../../../modals/LogoutModal";
import { useDashBoardPageViewModelDI } from "../../../page.di";
import { AppRoutes } from "@/commons/constants/routes";

export const NavButton: React.FC<NavButtonProps> = ({ item, sidebarOpen }) => {
  const navigate = useNavigate();
  const viewModel = useDashBoardPageViewModelDI();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // 1️⃣ Always call both hooks
  const matchExact = useMatch({ path: item.route, end: true });
  const matchNested = useMatch({ path: item.route, end: false });

  // 2️⃣ Prevent Dashboard from staying “active” on child routes
  const isDashboard = item.route === AppRoutes.DASHBOARD;
  const isActive = Boolean(matchExact || (!isDashboard && matchNested));

  const handleClick = () => {
    if (item.isLogout) {
      setShowLogoutModal(true);
    } else {
      navigate(item.route);
    }
  };

  const handleConfirmLogout = () => {
    viewModel.logout();
    setShowLogoutModal(false);
    navigate(item.route);
  };
  const handleCancelLogout = () => setShowLogoutModal(false);

  const Icon = item.icon;

  return (
    <>
      <button
        onClick={handleClick}
        className={`
          w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 group relative
          ${
            item.isLogout
              ? "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
              : isActive
                ? "bg-blue-50 text-blue-700 shadow-sm"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          }
        `}
        title={!sidebarOpen ? item.label : undefined}
      >
        <Icon
          className={`
            w-5 h-5 min-w-5
            ${
              item.isLogout
                ? "text-red-600 group-hover:scale-110 transition-transform"
                : isActive
                  ? "text-blue-600"
                  : "text-gray-500 group-hover:text-gray-700"
            }
          `}
        />
        {sidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}

        {/* Left-bar indicator when active (except logout) */}
        {isActive && !item.isLogout && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-l-full" />
        )}

        {/* Tooltip for collapsed sidebar */}
        {!sidebarOpen && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
            {item.label}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
          </div>
        )}
      </button>

      <LogoutModal
        isOpen={showLogoutModal}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </>
  );
};
