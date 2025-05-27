import type { UserEntity } from "@/commons/domain/entities/UserEntity";

export interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: UserEntity) => void;
  user: UserEntity | null;
}
