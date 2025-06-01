import CustomButton from "@/commons/components/Button";
import { AlertTriangle } from "lucide-react";
import React from "react";
import type { UserDeleteModalProps } from "./User.types";

const UserDeleteModal: React.FC<UserDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  user,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const handleConfirm = (id: string) => {
    if (!isLoading) {
      onConfirm(id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Delete User</h3>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Are you sure you want to delete this user
            {user?.name ? ` "${user.name}"` : ""}? This action cannot be undone
            and will permanently remove all associated data.
          </p>
        </div>

        <div className="flex gap-3">
          <CustomButton
            onClick={onClose}
            variant="secondary"
            size="md"
            fullWidth
            disabled={false}
          >
            <p className="text-white"> Cancel</p>
          </CustomButton>
          <CustomButton
            onClick={() => {
              if (user?.id) {
                handleConfirm(user.id);
              }
            }}
            variant="danger"
            size="md"
            disabled={false}
          >
            <p className="text-white whitespace-nowrap"> Delete User</p>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default UserDeleteModal;
