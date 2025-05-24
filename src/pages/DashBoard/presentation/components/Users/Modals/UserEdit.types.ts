import type { User } from "../User.types";

export interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user: User | null;
}
