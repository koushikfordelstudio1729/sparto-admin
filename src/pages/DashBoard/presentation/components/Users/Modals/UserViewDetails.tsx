import React from "react";
import type { UserViewModalProps } from "./UserViewDetails.types";
import StatusBadge from "@/commons/components/StatusBadge/StatusBadge";
import { getUserRoleClass } from "@/commons/utils/getUserRoleStatusClass";
import { getUserStatusClass } from "@/commons/utils/getUserStatusClass";

const UserViewModal: React.FC<UserViewModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  if (!isOpen || !user) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <h3 className="text-2xl font-semibold mb-4">User Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Name:</span>
            <span className="text-gray-900">{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-gray-900">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Phone:</span>
            <span className="text-gray-900">{user.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Status:</span>
            <StatusBadge
              text={user.status}
              className={getUserStatusClass(user.status)}
            />
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Role:</span>
            <StatusBadge
              text={user.role}
              className={getUserRoleClass(user.role)}
            />
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Role:</span>
            <span className="capitalize text-gray-900">{user.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Join Date:</span>
            <span className="text-gray-900">{user.joinDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Last Active:</span>
            <span className="text-gray-900">{user.lastActive}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Total Orders:</span>
            <span className="text-gray-900">{user.totalOrders}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Total Spent:</span>
            <span className="text-gray-900">${user.totalSpent.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserViewModal;
