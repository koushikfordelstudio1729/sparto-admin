import type { UserEntity } from "@/commons/domain/entities/UserEntity";

export interface UserViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserEntity | null;
}
