import React, { useState, useEffect } from "react";
import type { UserEditModalProps } from "./UserEdit.types";
import CustomButton from "@/commons/components/Button";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";

const UserEditModal: React.FC<UserEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
}) => {
  const [formData, setFormData] = useState<UserEntity | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  if (!isOpen || !formData) return null;

  const handleInputChange = (field: keyof UserEntity, value: string | number) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-semibold mb-4">Edit User</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.emails[0].email}
              onChange={(e) => {
                const updatedEmails = [...formData.emails];
                updatedEmails[0] = { ...updatedEmails[0], email: e.target.value };
                setFormData({ ...formData, emails: updatedEmails });
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phones[0].number}
              onChange={(e) => {
                const updatedPhones = [...formData.phones];
                updatedPhones[0] = { ...updatedPhones[0], number: e.target.value };
                setFormData({ ...formData, phones: updatedPhones });
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                handleInputChange("status", e.target.value as UserEntity["status"])
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={formData.roleId}
              onChange={(e) =>
                handleInputChange("roleId", e.target.value as UserEntity["roleId"])
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="user">User</option>
              <option value="premium">Premium</option>
              <option value="business">Business</option>
            </select>
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Join Date
            </label>
            <input
              type="date"
              value={formData.joinDate}
              onChange={(e) => handleInputChange("joinDate", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div> */}

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Orders
            </label>
            <input
              type="number"
              value={formData.totalOrders}
              onChange={(e) =>
                handleInputChange("totalOrders", parseInt(e.target.value) || 0)
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div> */}

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Spent ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.totalSpent}
              onChange={(e) =>
                handleInputChange("totalSpent", parseFloat(e.target.value) || 0)
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div> */}

          <div className="flex justify-end gap-4 pt-4">
            <CustomButton
              onClick={onClose}
              variant="danger"
              size="md"
              disabled={false}
            >
              <p className="text-white">Cancel</p>
            </CustomButton>
            <CustomButton
              variant="secondary"
              size="md"
              fullWidth
              disabled={false}
            >
              <p className="text-white">Save Changes</p>
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;
