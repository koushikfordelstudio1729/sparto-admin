import type { UserEntity } from "@/commons/domain/entities/UserEntity";

export interface UsersComponentState {
  isLoading: boolean;
  searchTerm: string;
  statusFilter: string;
  roleFilter: string;
  selectedUsers: string[];
  showViewModal: boolean;
  showEditModal: boolean;
  showDeleteModal: boolean;
  selectedUser: UserEntity | null;
  userToDelete: string;
}
