import type { User } from "../User.types";

export interface UserViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}
