import { Edit, Eye, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "suspended";
  role: "user" | "premium" | "business";
  joinDate: string;
  lastActive: string;
  totalOrders: number;
  totalSpent: number;
}

const UsersComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

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

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete));
      setShowDeleteModal(false);
      setUserToDelete(null);
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

  const getRoleBadge = (role: User["role"]) => {
    const colors = {
      user: "bg-blue-100 text-blue-800",
      premium: "bg-purple-100 text-purple-800",
      business: "bg-orange-100 text-orange-800",
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${colors[role]}`}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="premium">Premium</option>
          <option value="business">Business</option>
        </select>
      </div>

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
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(filteredUsers.map((u) => u.id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                  checked={
                    selectedUsers.length === filteredUsers.length &&
                    filteredUsers.length > 0
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
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers([...selectedUsers, user.id]);
                      } else {
                        setSelectedUsers(
                          selectedUsers.filter((id) => id !== user.id)
                        );
                      }
                    }}
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
                <td className="p-4">{getRoleBadge(user.role)}</td>
                <td className="p-4 text-sm text-gray-900">{user.joinDate}</td>
                <td className="p-4 text-sm text-gray-900">
                  {user.totalOrders}
                </td>
                <td className="p-4 text-sm text-gray-900">
                  ${user.totalSpent.toFixed(2)}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingUser(user);
                        setShowEditModal(true);
                      }}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setEditingUser(user);
                        setShowViewModal(true);
                      }}
                      className="p-1 text-green-600 hover:bg-green-100 rounded"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
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
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{users.length}</div>
          <div className="text-sm text-blue-600">Total Users</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {users.filter((u) => u.status === "active").length}
          </div>
          <div className="text-sm text-green-600">Active Users</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {users.filter((u) => u.role === "premium").length}
          </div>
          <div className="text-sm text-purple-600">Premium Users</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            ${users.reduce((sum, u) => sum + u.totalSpent, 0).toFixed(0)}
          </div>
          <div className="text-sm text-orange-600">Total Revenue</div>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowViewModal(false)}
        >
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-2xl font-semibold mb-4">User Details</h3>
            {editingUser && (
              <div>
                <div>
                  <strong>Name:</strong> {editingUser.name}
                </div>
                <div>
                  <strong>Email:</strong> {editingUser.email}
                </div>
                <div>
                  <strong>Phone:</strong> {editingUser.phone}
                </div>
                <div>
                  <strong>Status:</strong> {editingUser.status}
                </div>
                <div>
                  <strong>Role:</strong> {editingUser.role}
                </div>
                <div>
                  <strong>Join Date:</strong> {editingUser.joinDate}
                </div>
                <div>
                  <strong>Total Orders:</strong> {editingUser.totalOrders}
                </div>
                <div>
                  <strong>Total Spent:</strong> ${editingUser.totalSpent}
                </div>
              </div>
            )}
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setShowEditModal(false)}
        >
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-2xl font-semibold mb-4">Edit User</h3>
            {editingUser && (
              <div>
                <div>
                  <label className="block">Name</label>
                  <input
                    type="text"
                    value={editingUser.name}
                    className="w-full border p-2 mb-4"
                  />
                </div>
                <div>
                  <label className="block">Email</label>
                  <input
                    type="text"
                    value={editingUser.email}
                    className="w-full border p-2 mb-4"
                  />
                </div>
                <div>
                  <label className="block">Phone</label>
                  <input
                    type="text"
                    value={editingUser.phone}
                    className="w-full border p-2 mb-4"
                  />
                </div>
                <div>
                  <label className="block">Status</label>
                  <select
                    value={editingUser.status}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        status: e.target.value as User["status"],
                      })
                    }
                    className="w-full border p-2 mb-4"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div>
                  <label className="block">Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        role: e.target.value as User["role"],
                      })
                    }
                    className="w-full border p-2 mb-4"
                  >
                    <option value="user">User</option>
                    <option value="premium">Premium</option>
                    <option value="business">Business</option>
                  </select>
                </div>
              </div>
            )}
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Save changes here
                  setShowEditModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-2xl font-semibold mb-4">Delete User</h3>
            <div className="mb-4">
              Are you sure you want to delete this user?
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersComponent;
