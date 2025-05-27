import React from "react";
import type { UserViewModalProps } from "./UserViewDetails.types";
import StatusBadge from "@/commons/components/StatusBadge/StatusBadge";
import { getUserRoleClass } from "@/commons/utils/getUserRoleStatusClass";
import { getUserStatusClass } from "@/commons/utils/getUserStatusClass";
import CustomButton from "@/commons/components/Button";

const UserViewModal: React.FC<UserViewModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <h3 className="text-2xl font-semibold mb-4">User Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Name:</span>
            <span className="text-gray-900">{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-gray-900">{user.emails[0].email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Phone:</span>
            <span className="text-gray-900">{user.phones[0].number}</span>
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
              text={user.roleId}
              className={getUserRoleClass(user.roleId)}
            />
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Role:</span>
            <span className="capitalize text-gray-900">{user.roleId}</span>
          </div>
          {/* <div className="flex justify-between">
            <span className="font-medium text-gray-700">Join Date:</span>
            <span className="text-gray-900">{user.joinDate}</span>
          </div> */}
          {/* <div className="flex justify-between">
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
          </div> */}
        </div>
        <div className="flex justify-end mt-6">
          <CustomButton
            onClick={onClose}
            variant="danger"
            size="md"
            disabled={false}
          >
            <p className="text-white">Close</p>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default UserViewModal;
