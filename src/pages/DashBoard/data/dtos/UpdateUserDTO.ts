import type { AddressEntity } from "@/commons/domain/entities/AddressEntity";
import type { EmailEntity } from "@/commons/domain/entities/EmailEntity";
import type { PhoneEntity } from "@/commons/domain/entities/PhoneEntity";

export interface UpdateUserDTO {
  id: string;
  name?: string;
  description?: string;
  phones?: PhoneEntity[];
  emails?: EmailEntity[];
  addresses?: AddressEntity[];
  profile_picture_url?: string;
}
