import type { LoginEntity } from "../../domain/entities/LoginEntity";

export class LoginModel {
  statusCode: number;
  status: string;
  message: string;
  token: string;

  constructor(
    statusCode: number,
    status: string,
    message: string,
    token: string
  ) {
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
    this.token = token;
  }

  toEntity(): LoginEntity {
    return {
      statusCode: this.statusCode,
      status: this.status,
      message: this.message,
      token: this.token,
    };
  }

  toJson(): Record<string, unknown> {
    return {
      statusCode: this.statusCode,
      status: this.status,
      message: this.message,
      token: this.token,
    };
  }

  static fromJson(json: Record<string, unknown>): LoginModel {
    const data = json.data as Record<string, unknown>;

    return new LoginModel(
      200,
      json.status as string,
      data?.message as string,
      data?.token as string
    );
  }
}
