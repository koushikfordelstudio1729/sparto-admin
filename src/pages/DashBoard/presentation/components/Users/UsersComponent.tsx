import type { RootState } from "@/app/store/store";
import CustomCheckbox from "@/commons/components/checkbox/CustomCheckbox";
import FilterBar from "@/commons/components/FilterBar/FilterBar";
import IconButton from "@/commons/components/IconButton/IconButton";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import { Edit, Eye, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StatCard } from "../../../../../commons/components/StatCard/StatCard";
import { DASHBOARD_STATS } from "../../utils/dashboardConstant";
import UserDeleteModal from "./Modals/UserDelete";
import UserEditModal from "./Modals/UserEdit";
import UserViewModal from "./Modals/UserViewDetails";
import { useDashBoardPageViewModelDI } from "../../page.di";
import { useUsersComponentViewModelDI } from "./UsersComponent.di";

const UsersComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { users } = useSelector((state: RootState) => state.dashBoardPageSlice);
  // Modal states - now tracking specific users
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserEntity | null>(null);
  const [, setUserToDelete] = useState<string>("");

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.roleId === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });
  const dashboardViewModel = useDashBoardPageViewModelDI();
  const userViewModel = useUsersComponentViewModelDI();

  const handleStatusChange = async (
    userId: string,
    newStatus: UserEntity["status"]
  ) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const updatedUser: UserEntity = {
      ...user,
      status: newStatus,
    };

    await userViewModel.updateUserStatus(userId, updatedUser);
  };

  const handleRoleChange = (userId: string, newRole: UserEntity["role"]) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const updatedUser: UserEntity = {
      ...user,
      role: newRole,
    };

    userViewModel.updateUserRole(userId, updatedUser);
  };

  // Modal handlers - now properly setting selected user
  const handleViewUser = (user: UserEntity) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEditUser = (user: UserEntity) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setUserToDelete(user.name);
      setSelectedUser(user);
      setShowDeleteModal(true);
    }
  };

  const handleSaveUser = (user: UserEntity) => {
    dashboardViewModel.updateUser(user.id, user);

    setShowEditModal(false);
    setSelectedUser(null);
  };

  const confirmDeleteUser = async (id: string) => {
    // Handle delete logic here
    userViewModel.deleteUser(id);
    setShowDeleteModal(false);
    setSelectedUser(null);
    setUserToDelete("");
  };

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) return;

    switch (action) {
      case "activate":
        break;
      case "inactivate":
        break;
      case "delete":
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

  // Close modal handlers
  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedUser(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
    setUserToDelete("");
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
            onClick={() => handleBulkAction("inactivate")}
            className="text-sm bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
          >
            inactivate
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
                    <div className="text-sm text-gray-900">
                      {user.emails[0].email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.phones[0].number}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <select
                    value={user.status}
                    onChange={(e) =>
                      handleStatusChange(
                        user.id,
                        e.target.value as UserEntity["status"]
                      )
                    }
                    className="text-sm border-0 bg-transparent focus:ring-0"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>

                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(
                        user.id,
                        e.target.value as UserEntity["role"]
                      )
                    }
                    className="text-sm border-0 bg-transparent focus:ring-0"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
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

      {/* Modals - Now passing individual user instead of array */}
      <UserViewModal
        isOpen={showViewModal}
        onClose={handleCloseViewModal}
        user={selectedUser}
      />

      <UserEditModal
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        onSave={handleSaveUser}
        user={selectedUser}
      />

      <UserDeleteModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDeleteUser}
        isLoading={false}
        user={selectedUser}
      />
    </div>
  );
};

export default UsersComponent;
