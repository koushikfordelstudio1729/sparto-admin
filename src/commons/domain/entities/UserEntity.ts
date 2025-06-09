import type { AddressEntity } from "./AddressEntity";
import type { EmailEntity } from "./EmailEntity";
import type { PhoneEntity } from "./PhoneEntity";

export interface UserEntity {
  id: string;
  name: string;
  phones: PhoneEntity[];
  emails: EmailEntity[];
  addresses: AddressEntity[];
  profilePictureUrl?: string;
  roleId: string;
  role: "user" | "admin" | "superadmin";
  status: "active" | "inactive" | "deleted";
  termsAccepted: boolean;
  createdAt: number;
  updatedAt: number;
  hasPassword: boolean;
}
