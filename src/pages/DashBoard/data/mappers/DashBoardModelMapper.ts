import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import type { UpdateUserStatusDTO } from "../dtos/UpdateUserStatusDTO";
import type { UpdateUserRoleDTO } from "../dtos/UpdateUserRoleDTO";

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
      name: entity.name,
      phones: entity.phones?.map((phone) => phone.number) ?? [],
      emails: entity.emails?.map(({ email }) => email) ?? [],
      addresses: entity.addresses ?? [],
      profile_picture_url: entity.profilePictureUrl,
    };
  }

  static toUpdateUserStatusDTO(entity: UserEntity): UpdateUserStatusDTO {
    return {
      status: entity.status,
    };
  }
  static toUpdateUserRoleDTO(entity: UserEntity): UpdateUserRoleDTO {
    return {
      new_role: entity.role,
    };
  }
}
