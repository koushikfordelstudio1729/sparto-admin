import type { UserEntity } from "@/commons/domain/entities/UserEntity";

export type UsersTableProps = {
  users: UserEntity[];
  selectedUsers: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectUser: (id: string, checked: boolean) => void;
  onStatusChange: (id: string, status: UserEntity["status"]) => void;
  onEditUser: (user: UserEntity) => void;
  onViewUser: (user: UserEntity) => void;
  onDeleteUser: (id: string) => void;
};
