import type { AddressEntity } from "@/commons/domain/entities/AddressEntity";
import type { EmailEntity } from "@/commons/domain/entities/EmailEntity";
import type { PhoneEntity } from "@/commons/domain/entities/PhoneEntity";

export interface CreateUserDTO {
  name: string;
  phones: PhoneEntity[];
  emails: EmailEntity[];
  addresses: AddressEntity[];
  role_id: string;
  terms_accepted: boolean;
}
