import type { AddressEntity } from "@/commons/domain/entities/AddressEntity";

export interface UpdateUserDTO {
  name?: string;
  description?: string;
  phones?: string[];
  emails?: string[];
  addresses?: AddressEntity[];
  profile_picture_url?: string;
}
