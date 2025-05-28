import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { UpdateUserDTO } from "../dtos/UpdateUserDTO";

export class DashBoardModelMapper {
  static toCreateDTO(entity: UserEntity): CreateUserDTO {
    return {
      name: entity.name,
      phones: entity.phones ?? [],
      emails: entity.emails ?? [],
      addresses: entity.addresses ?? [],
      role_id: entity.roleId,
      terms_accepted: entity.termsAccepted ?? false,
    };
  }

  static toUpdateDTO(entity: UserEntity): UpdateUserDTO {
    return {
      id: entity.id,
      name: entity.name,
      phones: entity.phones,
      emails: entity.emails,
      addresses: entity.addresses ?? [],
      profile_picture_url: entity.profilePictureUrl,
    };
  }
}
