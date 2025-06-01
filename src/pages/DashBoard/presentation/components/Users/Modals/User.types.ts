import type { UserEntity } from "@/commons/domain/entities/UserEntity";

export interface UserDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
  user: UserEntity | null;
  isLoading?: boolean;
}
