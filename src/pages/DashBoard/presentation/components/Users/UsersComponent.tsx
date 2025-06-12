import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import FilterBar from "@/commons/components/FilterBar/FilterBar";
import UsersTable from "./components/UsersTable/UsersTable";
import UserDeleteModal from "./components/Modals/UserDelete";
import UserEditModal from "./components/Modals/UserEdit";
import UserViewModal from "./components/Modals/UserViewDetails";
import BulkActions from "./components/BulkActions/BulkActions";
import { exportCsv, exportPdf } from "../../utils/FileExportUtils";
import { useUsersComponentViewModelDI } from "./UsersComponent.di";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import { useEffect } from "react";
const UsersComponent: React.FC = () => {
  const vm = useUsersComponentViewModelDI();
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

  const filteredUsers: UserEntity[] = vm.getFilteredUsers();

  // ✅ Pagination state

  // ✅ Reset page on filter/search changes
  useEffect(() => {}, [searchTerm, statusFilter, roleFilter]);

  // ✅ Paginate filtered users

  // const handleSaveUser = (user: UserEntity) => {
  //   vm.updateUser(user.id, user);
  //   vm.handleCloseEditModal();
  // };

  const confirmDeleteUser = async (id: string) => {
    await vm.deleteUser(id);
  };

  const handleExportCsv = () => {
    exportCsv(filteredUsers, ["Name", "Email", "Phone", "Status"], (user) => [
      user.name,
      user.emails[0]?.email ?? "",
      user.phones[0]?.number ?? "",
      user.status,
    ]);
  };

  const handleExportPdf = () => {
    exportPdf(
      filteredUsers,
      ["Name", "Email", "Phone", "Status", "Role"],
      (user) => [
        user.name,
        user.emails[0]?.email ?? "",
        user.phones[0]?.number ?? "",
        user.status,
      ]
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      </div>

      {/* Filters */}
      <FilterBar
        search={{
          value: searchTerm,
          onChange: vm.setSearchTerm.bind(vm),
          placeholder: "Search users...",
        }}
        filters={[
          {
            value: statusFilter,
            onChange: vm.setStatusFilter.bind(vm),
            options: [
              { value: "all", label: "All Status" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "deleted", label: "Suspended" },
            ],
          },
          {
            value: roleFilter,
            onChange: vm.setRoleFilter.bind(vm),
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

      {/* Export Buttons */}
      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={handleExportCsv}
          disabled={filteredUsers.length === 0}
          className={`px-4 py-2 rounded ${
            filteredUsers.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Export CSV
        </button>
        <button
          onClick={handleExportPdf}
          disabled={filteredUsers.length === 0}
          className={`px-4 py-2 rounded ${
            filteredUsers.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Export PDF
        </button>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <BulkActions
          count={selectedUsers.length}
          onActivate={() => vm.handleBulkAction("activate")}
          onInactivate={() => vm.handleBulkAction("inactivate")}
          onDelete={() => vm.handleBulkAction("delete")}
        />
      )}

      {/* User Table with Pagination */}
      <UsersTable
        users={filteredUsers}
        selectedUsers={selectedUsers}
        onSelectAll={(checked) => vm.handleSelectAll(checked, filteredUsers)}
        onSelectUser={(id, checked) => vm.handleSelectUser(id, checked)}
        onStatusChange={(id, status) => vm.handleStatusChange(id, status)}
        onEditUser={(user) => vm.handleEditUser(user)}
        onViewUser={(user) => vm.handleViewUser(user)}
        onDeleteUser={(id) => vm.handleDeleteUser(id)}
      />

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No users found matching your criteria.
        </div>
      )}

      {/* Modals */}
      <UserViewModal
        isOpen={showViewModal}
        onClose={vm.handleCloseViewModal}
        user={selectedUser}
      />
      <UserEditModal
        isOpen={showEditModal}
        onClose={vm.handleCloseEditModal}
        onSave={(updatedUser) => vm.updateUser(updatedUser.id, updatedUser)}
        user={selectedUser}
      />

      <UserDeleteModal
        isOpen={showDeleteModal}
        onClose={vm.handleCloseDeleteModal}
        onConfirm={confirmDeleteUser}
        isLoading={isLoading}
        user={selectedUser}
      />
    </div>
  );
};

export default UsersComponent;
