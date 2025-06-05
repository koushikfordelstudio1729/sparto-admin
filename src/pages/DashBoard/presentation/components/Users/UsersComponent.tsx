import type { RootState } from "@/app/store/store";
import CustomCheckbox from "@/commons/components/checkbox/CustomCheckbox";
import FilterBar from "@/commons/components/FilterBar/FilterBar";
import IconButton from "@/commons/components/IconButton/IconButton";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import { Edit, Eye, Trash2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { StatCard } from "../../../../../commons/components/StatCard/StatCard";
import { DASHBOARD_STATS } from "../../utils/dashboardConstant";
import UserDeleteModal from "./Modals/UserDelete";
import UserEditModal from "./Modals/UserEdit";
import UserViewModal from "./Modals/UserViewDetails";
import { useUsersComponentViewModelDI } from "./UsersComponent.di";

const UsersComponent: React.FC = () => {
  const userViewModel = useUsersComponentViewModelDI();
  useSelector((state: RootState) => state.dashBoardPageSlice);
  const {
    searchTerm,
    statusFilter,
    roleFilter,
    selectedUsers,
    showViewModal,
    showEditModal,
    showDeleteModal,
    selectedUser,
    isLoading,
  } = useSelector((state: RootState) => state.usersComponentSlice);

  const filteredUsers = userViewModel.getFilteredUsers();

  const handleSaveUser = (user: UserEntity) => {
    userViewModel.updateUserRole(user.id, user);
    userViewModel.handleCloseEditModal();
  };

  const confirmDeleteUser = async (id: string) => {
    await userViewModel.deleteUser(id);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      </div>

      <FilterBar
        search={{
          value: searchTerm,
          onChange: userViewModel.setSearchTerm.bind(userViewModel),
          placeholder: "Search users...",
        }}
        filters={[
          {
            value: statusFilter,
            onChange: userViewModel.setStatusFilter.bind(userViewModel),
            options: [
              { value: "all", label: "All Status" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "suspended", label: "Suspended" },
            ],
          },
          {
            value: roleFilter,
            onChange: userViewModel.setRoleFilter.bind(userViewModel),
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
            onClick={() => userViewModel.handleBulkAction("activate")}
            className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Activate
          </button>
          <button
            onClick={() => userViewModel.handleBulkAction("inactivate")}
            className="text-sm bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
          >
            inactivate
          </button>
          <button
            onClick={() => userViewModel.handleBulkAction("delete")}
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
                    userViewModel.handleSelectAll(
                      e.target.checked,
                      filteredUsers
                    )
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
                      userViewModel.handleSelectUser(user.id, e.target.checked)
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
                      userViewModel.handleStatusChange(
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
                      userViewModel.handleRoleChange(
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
                      onClick={() => userViewModel.handleEditUser(user)}
                      className="text-blue-600 hover:bg-blue-100"
                    />
                    <IconButton
                      icon={Eye}
                      title="View Details"
                      onClick={() => userViewModel.handleViewUser(user)}
                      className="p-1 text-green-600 hover:bg-green-100 rounded"
                    />
                    <IconButton
                      icon={Trash2}
                      title="Delete User"
                      onClick={() => userViewModel.handleDeleteUser(user.id)}
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
        onClose={userViewModel.handleCloseViewModal.bind(userViewModel)}
        user={selectedUser}
      />

      <UserEditModal
        isOpen={showEditModal}
        onClose={userViewModel.handleCloseEditModal.bind(userViewModel)}
        onSave={handleSaveUser}
        user={selectedUser}
      />

      <UserDeleteModal
        isOpen={showDeleteModal}
        onClose={userViewModel.handleCloseDeleteModal.bind(userViewModel)}
        onConfirm={confirmDeleteUser}
        isLoading={isLoading}
        user={selectedUser}
      />
    </div>
  );
};

export default UsersComponent;
