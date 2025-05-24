import FilterBar from "@/commons/components/FilterBar/FilterBar";
import IconButton from "@/commons/components/IconButton/IconButton";
import StatusBadge from "@/commons/components/StatusBadge/StatusBadge";
import { getUserRoleClass } from "@/commons/utils/getUserRoleStatusClass";
import { Edit, Eye, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DASHBOARD_STATS } from "../../utils/dashboardConstant";
import { StatCard } from "../../../../../commons/components/StatCard/StatCard";
import CustomCheckbox from "@/commons/components/checkbox/CustomCheckbox";
import type { User } from "./User.types";
import UserViewModal from "./Modals/UserViewDetails";
import UserEditModal from "./Modals/UserEdit";
import UserDeleteModal from "./Modals/UserDelete";

const UsersComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Modal states - simplified
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        status: "active",
        role: "user",
        joinDate: "2024-01-15",
        lastActive: "2025-05-20",
        totalOrders: 12,
        totalSpent: 2450.5,
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1234567891",
        status: "active",
        role: "premium",
        joinDate: "2024-02-20",
        lastActive: "2025-05-22",
        totalOrders: 25,
        totalSpent: 5680.75,
      },
      {
        id: "3",
        name: "Bob Johnson",
        email: "bob@example.com",
        phone: "+1234567892",
        status: "suspended",
        role: "user",
        joinDate: "2024-03-10",
        lastActive: "2025-05-18",
        totalOrders: 3,
        totalSpent: 890.25,
      },
    ];
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleStatusChange = (userId: string, newStatus: User["status"]) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  // Modal handlers
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const confirmDeleteUser = async () => {
    if (userToDelete) {
      setIsDeleting(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUsers(users.filter((user) => user.id !== userToDelete));
      setShowDeleteModal(false);
      setUserToDelete(null);
      setIsDeleting(false);
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) return;

    switch (action) {
      case "activate":
        setUsers(
          users.map((user) =>
            selectedUsers.includes(user.id)
              ? { ...user, status: "active" as const }
              : user
          )
        );
        break;
      case "deactivate":
        setUsers(
          users.map((user) =>
            selectedUsers.includes(user.id)
              ? { ...user, status: "inactive" as const }
              : user
          )
        );
        break;
      case "delete":
        if (window.confirm(`Delete ${selectedUsers.length} selected users?`)) {
          setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
        }
        break;
    }
    setSelectedUsers([]);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  // Get user name for delete modal
  const getUserToDeleteName = () => {
    const user = users.find((u) => u.id === userToDelete);
    return user?.name;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      </div>

      <FilterBar
        search={{
          value: searchTerm,
          onChange: setSearchTerm,
          placeholder: "Search users...",
        }}
        filters={[
          {
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "all", label: "All Status" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "suspended", label: "Suspended" },
            ],
          },
          {
            value: roleFilter,
            onChange: setRoleFilter,
            options: [
              { value: "all", label: "All Roles" },
              { value: "user", label: "User" },
              { value: "premium", label: "Premium" },
              { value: "business", label: "Business" },
            ],
          },
        ]}
        className="mb-6"
      />

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="flex items-center gap-4 mb-4 p-3 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-700">
            {selectedUsers.length} user(s) selected
          </span>
          <button
            onClick={() => handleBulkAction("activate")}
            className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Activate
          </button>
          <button
            onClick={() => handleBulkAction("deactivate")}
            className="text-sm bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
          >
            Deactivate
          </button>
          <button
            onClick={() => handleBulkAction("delete")}
            className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4">
                <CustomCheckbox
                  checked={
                    selectedUsers.length === filteredUsers.length &&
                    filteredUsers.length > 0
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSelectAll(e.target.checked)
                  }
                  className="m-0"
                />
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                User
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Contact
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Status
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Role
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Join Date
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Orders
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Total Spent
              </th>
              <th className="text-left p-4 font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-4">
                  <CustomCheckbox
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleSelectUser(user.id, e.target.checked)
                    }
                    className="m-0"
                  />
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">ID: {user.id}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </div>
                </td>
                <td className="p-4">
                  <select
                    value={user.status}
                    onChange={(e) =>
                      handleStatusChange(
                        user.id,
                        e.target.value as User["status"]
                      )
                    }
                    className="text-sm border-0 bg-transparent focus:ring-0"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </td>
                <td className="p-4">
                  <StatusBadge
                    text={
                      user.role.charAt(0).toUpperCase() + user.role.slice(1)
                    }
                    className={getUserRoleClass(user.role)}
                  />
                </td>
                <td className="p-4 text-sm text-gray-900">{user.joinDate}</td>
                <td className="p-4 text-sm text-gray-900">
                  {user.totalOrders}
                </td>
                <td className="p-4 text-sm text-gray-900">
                  ${user.totalSpent.toFixed(2)}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <IconButton
                      icon={Edit}
                      title="Edit User"
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:bg-blue-100"
                    />
                    <IconButton
                      icon={Eye}
                      title="View Details"
                      onClick={() => handleViewUser(user)}
                      className="p-1 text-green-600 hover:bg-green-100 rounded"
                    />
                    <IconButton
                      icon={Trash2}
                      title="Delete User"
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No users found matching your criteria.
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {DASHBOARD_STATS.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Modals */}
      <UserViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        user={selectedUser}
      />

      <UserEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveUser}
        user={selectedUser}
      />

      <UserDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteUser}
        userName={getUserToDeleteName()}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default UsersComponent;
