import CustomCheckbox from "@/commons/components/checkbox/CustomCheckbox";
import FilterBar from "@/commons/components/FilterBar/FilterBar";
import IconButton from "@/commons/components/IconButton/IconButton";
import { StatCard } from "@/commons/components/StatCard/StatCard";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import { Edit, Eye, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { DASHBOARD_STATS } from "../../utils/dashboardConstant";
import UserDeleteModal from "./Modals/UserDelete";
import UserEditModal from "./Modals/UserEdit";
import UserViewModal from "./Modals/UserViewDetails";
import { useUsersComponentViewModelDI } from "./UsersComponent.di";
import { useDashBoardPageViewModelDI } from "../../page.di";

const UsersComponent: React.FC = () => {
  const userViewModel = useUsersComponentViewModelDI();
  const viewModel = useDashBoardPageViewModelDI();

  useEffect(() => {
    viewModel.initialize();
  }, [viewModel]);
  const filteredUsers = userViewModel.getFilteredUsers();
  const { searchTerm, statusFilter, roleFilter } =
    userViewModel.getFilterStates();
  const { showViewModal, showEditModal, showDeleteModal, selectedUser } =
    userViewModel.getModalStates();
  const selectedUsersCount = userViewModel.getSelectedUsersCount();
  const isAllSelected = userViewModel.isAllUsersSelected();

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      </div>

      <FilterBar
        search={{
          value: searchTerm,
          onChange: (val) => userViewModel.setSearchFilter(val),
          placeholder: "Search users...",
        }}
        filters={[
          {
            value: statusFilter,
            onChange: (val) => userViewModel.setStatusFilterValue(val),
            options: [
              { value: "all", label: "All Status" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "suspended", label: "Suspended" },
            ],
          },
          {
            value: roleFilter,
            onChange: (val) => userViewModel.setRoleFilterValue(val),
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

      {selectedUsersCount > 0 && (
        <div className="flex items-center gap-4 mb-4 p-3 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-700">
            {selectedUsersCount} user(s) selected
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
            Inactivate
          </button>
          <button
            onClick={() => userViewModel.handleBulkAction("delete")}
            className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4">
                <CustomCheckbox
                  checked={isAllSelected}
                  onChange={(e) =>
                    userViewModel.handleSelectAll(e.target.checked)
                  }
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
                    checked={userViewModel.isUserSelected(user.id)}
                    onChange={(e) =>
                      userViewModel.handleSelectUser(user.id, e.target.checked)
                    }
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
                      {user.emails?.[0]?.email ?? "—"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.phones?.[0]?.number ?? "—"}
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
                      className="text-green-600 hover:bg-green-100"
                    />
                    <IconButton
                      icon={Trash2}
                      title="Delete User"
                      onClick={() => userViewModel.handleDeleteUser(user)}
                      className="text-red-600 hover:bg-red-100"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {userViewModel.hasNoFilteredUsers() && (
        <div className="text-center py-8 text-gray-500">
          No users found matching your criteria.
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {DASHBOARD_STATS.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <UserViewModal
        isOpen={showViewModal}
        onClose={() => userViewModel.closeAllModals()}
        user={selectedUser}
      />

      <UserEditModal
        isOpen={showEditModal}
        onClose={() => userViewModel.closeAllModals()}
        onSave={(user) => userViewModel.handleSaveUser(user)}
        user={selectedUser}
      />

      <UserDeleteModal
        isOpen={showDeleteModal}
        onClose={() => userViewModel.closeAllModals()}
        onConfirm={(id) => userViewModel.confirmDeleteUser(id)}
        isLoading={false}
        user={selectedUser}
      />
    </div>
  );
};

export default UsersComponent;
