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

  const handleInputChange = (
    field: keyof UserEntity,
    value: string | number
  ) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleAddressChange = (field: string, value: string | boolean) => {
    if (!formData.addresses || formData.addresses.length === 0) {
      // Initialize with a default address if none exists
      setFormData({
        ...formData,
        addresses: [
          {
            city: "",
            country: "",
            isDefault: true,
            line1: "",
            line2: "",
            pincode: "",
            state: "",
          },
        ],
      });
    }

    const updatedAddresses = [...formData.addresses];
    updatedAddresses[0] = { ...updatedAddresses[0], [field]: value };
    setFormData({ ...formData, addresses: updatedAddresses });
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
                updatedEmails[0] = {
                  ...updatedEmails[0],
                  email: e.target.value,
                };
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
                updatedPhones[0] = {
                  ...updatedPhones[0],
                  number: e.target.value,
                };
                setFormData({ ...formData, phones: updatedPhones });
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Address Section */}
          <div className="border-t pt-4">
            <h4 className="text-lg font-medium text-gray-900 mb-3">
              Address Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1
                </label>
                <input
                  type="text"
                  value={formData.addresses?.[0]?.line1 || ""}
                  onChange={(e) => handleAddressChange("line1", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123 Main St"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  value={formData.addresses?.[0]?.line2 || ""}
                  onChange={(e) => handleAddressChange("line2", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Apt 4B"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.addresses?.[0]?.city || ""}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="San Francisco"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={formData.addresses?.[0]?.state || ""}
                  onChange={(e) => handleAddressChange("state", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="CA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PIN Code
                </label>
                <input
                  type="text"
                  value={formData.addresses?.[0]?.pincode || ""}
                  onChange={(e) =>
                    handleAddressChange("pincode", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="94107"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.addresses?.[0]?.country || ""}
                  onChange={(e) =>
                    handleAddressChange("country", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="USA"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.addresses?.[0]?.isDefault || false}
                  onChange={(e) =>
                    handleAddressChange("is_default", e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Set as default address
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture URL
            </label>
            <input
              type="url"
              value={formData.profilePictureUrl || ""}
              onChange={(e) =>
                handleInputChange("profilePictureUrl", e.target.value)
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/profile.jpg"
            />
          </div>

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
