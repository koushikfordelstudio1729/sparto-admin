import type { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import FilterBar from "@/commons/components/FilterBar/FilterBar";
import UsersTable from "./components/UsersTable/UsersTable";
import UserDeleteModal from "./components/Modals/UserDelete";
import UserEditModal from "./components/Modals/UserEdit";
import UserViewModal from "./components/Modals/UserViewDetails";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import { useUsersComponentViewModelDI } from "./UsersComponent.di";
import BulkActions from "./components/BulkActions/BulkActions";
import { exportCsv, exportPdf } from "../../utils/FileExportUtils";

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

  const handleSaveUser = (user: UserEntity) => {
    vm.updateUserRole(user.id, user);
    vm.handleCloseEditModal();
  };

  const confirmDeleteUser = async (id: string) => {
    await vm.deleteUser(id);
  };

  // CSV Export handler
  const handleExportCsv = () => {
    exportCsv(filteredUsers, ["Name", "Email", "Phone", "Status"], (user) => [
      user.name,
      user.emails[0]?.email ?? "",
      user.phones[0]?.number ?? "",
      user.status,
      user.role,
    ]);
  };

  // PDF Export handler
  const handleExportPdf = () => {
    exportPdf(
      filteredUsers,
      ["Name", "Email", "Phone", "Status", "Role"],
      (user) => [
        user.name,
        user.emails[0]?.email ?? "",
        user.phones[0]?.number ?? "",
        user.status,
        user.role,
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

      {/* User Table */}
      <UsersTable
        users={filteredUsers}
        selectedUsers={selectedUsers}
        onSelectAll={(checked: boolean) =>
          vm.handleSelectAll(checked, filteredUsers)
        }
        onSelectUser={(id: string, checked: boolean) =>
          vm.handleSelectUser(id, checked)
        }
        onStatusChange={(id: string, status: UserEntity["status"]) =>
          vm.handleStatusChange(id, status)
        }
        onEditUser={(user: UserEntity) => vm.handleEditUser(user)}
        onViewUser={(user: UserEntity) => vm.handleViewUser(user)}
        onDeleteUser={(id: string) => vm.handleDeleteUser(id)}
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
        onClose={vm.handleCloseViewModal.bind(vm)}
        user={selectedUser}
      />
      <UserEditModal
        isOpen={showEditModal}
        onClose={vm.handleCloseEditModal.bind(vm)}
        onSave={handleSaveUser}
        user={selectedUser}
      />
      <UserDeleteModal
        isOpen={showDeleteModal}
        onClose={vm.handleCloseDeleteModal.bind(vm)}
        onConfirm={confirmDeleteUser}
        isLoading={isLoading}
        user={selectedUser}
      />
    </div>
  );
};

export default UsersComponent;
