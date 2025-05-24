import { Calendar, Camera, Mail, Shield, User } from "lucide-react";
import React, { useState } from "react";

const ProfileComponent: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    phone: "+1234567890",
    role: "Administrator",
  });

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("Passwords do not match!");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Profile Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Overview Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                  <User className="w-12 h-12 text-blue-600" />
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {formData.firstName} {formData.lastName}
                </h2>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {formData.role}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 mt-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Member since January 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Personal Information
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Update your personal details and contact information
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                      <option>Information Technology</option>
                      <option>Human Resources</option>
                      <option>Finance</option>
                      <option>Marketing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      defaultValue="System Administrator"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Account Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Account Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Orders</span>
                  <span className="font-semibold text-gray-900">142</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Revenue</span>
                  <span className="font-semibold text-green-600">$15,280</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Sessions</span>
                  <span className="font-semibold text-blue-600">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Login</span>
                  <span className="font-semibold text-gray-900">Today</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Download Data Export
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  View Activity Log
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Manage Notifications
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Security Settings
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Manage your password and security preferences
            </p>
          </div>
          <div className="p-6">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-gray-900 focus:outline-none transition-colors"
                  onClick={() => {
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePasswordChange}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors font-medium"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
