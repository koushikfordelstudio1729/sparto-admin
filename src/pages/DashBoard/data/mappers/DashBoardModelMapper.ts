import type { DashBoardEntity } from "../../domain/entities/DashBoardEntity";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { UpdateUserDTO } from "../dtos/UpdateUserDTO";

export class DashBoardModelMapper {
  static toCreateDTO(entity: DashBoardEntity): CreateUserDTO {
    return {
      name: entity.name,
      description: entity.description ?? "",
    };
  }

  static toUpdateDTO(id: string, entity: DashBoardEntity): UpdateUserDTO {
    return {
      id,
      name: entity.name,
      description: entity.description ?? "",
    };
  }
}
