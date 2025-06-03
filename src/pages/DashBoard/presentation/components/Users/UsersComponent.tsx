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
import { useDashBoardPageViewModelDI } from "../../page.di";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";

const UsersComponent: React.FC = () => {
  // Use the consolidated ViewModel
  const viewModel = useDashBoardPageViewModelDI();

  useEffect(() => {
    viewModel.initialize();
  }, [viewModel]);

  const { users } = useSelector((state: RootState) => state.dashBoardPageSlice);

  // Get all the required state from the consolidated ViewModel
  // const filteredUsers = viewModel.getFilteredUsers();
  const { searchTerm, statusFilter, roleFilter } = viewModel.getFilterStates();
  const { showViewModal, showEditModal, showDeleteModal, selectedUser } =
    viewModel.getModalStates();
  const selectedUsersCount = viewModel.getSelectedUsersCount();
  const isAllSelected = viewModel.isAllUsersSelected();
  const isLoading = viewModel.isLoading();

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        {isLoading && <div className="text-sm text-gray-500">Loading...</div>}
      </div>

      <FilterBar
        search={{
          value: searchTerm,
          onChange: (val) => viewModel.setSearchFilter(val),
          placeholder: "Search users...",
        }}
        filters={[
          {
            value: statusFilter,
            onChange: (val) => viewModel.setStatusFilterValue(val),
            options: [
              { value: "all", label: "All Status" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "suspended", label: "Suspended" },
            ],
          },
          {
            value: roleFilter,
            onChange: (val) => viewModel.setRoleFilterValue(val),
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
            onClick={() => viewModel.handleBulkAction("activate")}
            disabled={isLoading}
            className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Activate
          </button>
          <button
            onClick={() => viewModel.handleBulkAction("inactivate")}
            disabled={isLoading}
            className="text-sm bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Inactivate
          </button>
          <button
            onClick={() => viewModel.handleBulkAction("delete")}
            disabled={isLoading}
            className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete
          </button>
          <button
            onClick={() => viewModel.clearAllSelections()}
            className="text-sm bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
          >
            Clear Selection
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
                  onChange={(e) => viewModel.handleSelectAll(e.target.checked)}
                  disabled={isLoading}
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
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-4">
                  <CustomCheckbox
                    checked={viewModel.isUserSelected(user.id)}
                    onChange={(e) =>
                      viewModel.handleSelectUser(user.id, e.target.checked)
                    }
                    disabled={isLoading}
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
                      viewModel.handleStatusChange(
                        user.id,
                        e.target.value as UserEntity["status"]
                      )
                    }
                    disabled={isLoading}
                    className="text-sm border-0 bg-transparent focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      viewModel.handleRoleChange(
                        user.id,
                        e.target.value as UserEntity["role"]
                      )
                    }
                    disabled={isLoading}
                    className="text-sm border-0 bg-transparent focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="premium">Premium</option>
                    <option value="business">Business</option>
                  </select>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <IconButton
                      icon={Edit}
                      title="Edit User"
                      onClick={() => viewModel.handleEditUser(user)}
                      // disabled={isLoading}
                      className="text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <IconButton
                      icon={Eye}
                      title="View Details"
                      onClick={() => viewModel.handleViewUser(user)}
                      // disabled={isLoading}
                      className="text-green-600 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <IconButton
                      icon={Trash2}
                      title="Delete User"
                      onClick={() => viewModel.handleDeleteUser(user)}
                      // disabled={isLoading}
                      className="text-red-600 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewModel.hasNoFilteredUsers() && !isLoading && (
        <div className="text-center py-8 text-gray-500">
          <div className="mb-4">No users found matching your criteria.</div>
          <button
            onClick={() => viewModel.clearAllFilters()}
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div className="mt-2 text-gray-500">Loading users...</div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {DASHBOARD_STATS.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total Users: {viewModel.getUsersCount()}</span>
          <span>Active: {viewModel.getActiveUsersCount()}</span>
          <span>Inactive: {viewModel.getInactiveUsersCount()}</span>
          <span>Filtered: {users.length}</span>
        </div>
      </div>

      {/* Modals */}
      <UserViewModal
        isOpen={showViewModal}
        onClose={() => viewModel.closeAllModals()}
        user={selectedUser}
      />

      <UserEditModal
        isOpen={showEditModal}
        onClose={() => viewModel.closeAllModals()}
        onSave={(user) => viewModel.handleSaveUser(user)}
        user={selectedUser}
      />

      <UserDeleteModal
        isOpen={showDeleteModal}
        onClose={() => viewModel.closeAllModals()}
        onConfirm={(id) => viewModel.confirmDeleteUser(id)}
        isLoading={isLoading}
        user={selectedUser}
      />
    </div>
  );
};

export default UsersComponent;
