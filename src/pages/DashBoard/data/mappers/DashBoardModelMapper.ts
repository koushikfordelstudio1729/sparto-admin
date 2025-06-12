import type { UserEntity } from "@/commons/domain/entities/UserEntity";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import type { UpdateUserStatusDTO } from "../dtos/UpdateUserStatusDTO";
import type { UpdateUserRoleDTO } from "../dtos/UpdateUserRoleDTO";
import type { PaymentStatus } from "../dtos/UpdatePaymentStatusDTO";
import type { UpdatePaymentStatusDTO } from "../dtos/UpdatePaymentStatusDTO";
import type { ClarificationEntity } from "@/commons/domain/entities/ClarificationEntity";
import type { CreateClarificationRequestDTO } from "../dtos/CreateClarificationDTO";
import type { OrderEntity } from "@/commons/domain/entities/OrderEntity";
import type { UpdateOrderStatusDTO } from "../dtos/UpdateOrderStatusDTO";
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
  static toUpdatePaymentStatusDTO(
    status: PaymentStatus
  ): UpdatePaymentStatusDTO {
    return {
      payment_status: status,
    };
  }
  // src/pages/DashBoard/data/mappers/ClarificationModelMapper.ts

  static toCreateRequestDTO(
    entity: ClarificationEntity
  ): CreateClarificationRequestDTO {
    const dto: CreateClarificationRequestDTO = {
      request_id: entity.requestId,
      actor_id: entity.actorId,
      actor_type: entity.actorType,
      message: entity.message,
    };

    if (entity.media.length > 0) {
      dto.media = entity.media.map((m) => ({
        file_url: m.file_url,
        file_name: m.file_name,
        file_type: m.file_type,
        uploaded_at: m.uploaded_at,
      }));
    }

    return dto;
  }

  static toUpdateOrderStatusDTO(
    status: OrderEntity["status"]
  ): UpdateOrderStatusDTO {
    return {
      status,
    };
  }
}
