import type { LoginUserDTO } from "../dtos/LoginUserDTO";

export class LoginModelMapper {
  static toLoginDTO(phone: string, password: string): LoginUserDTO {
    return {
      phone,
      password,
    };
  }
}
