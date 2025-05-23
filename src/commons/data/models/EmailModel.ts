import type { EmailEntity } from "@/commons/domain/entities/EmailEntity";

export class EmailModel {
  public email: string;
  public is_verified: boolean;

  constructor(email: string, is_verified: boolean) {
    this.email = email;
    this.is_verified = is_verified;
  }

  static fromJson(json: Record<string, string | unknown>): EmailModel {
    return new EmailModel(json.email as string, json.is_verified as boolean);
  }

  toJson(): Record<string, unknown> {
    return {
      email: this.email,
      is_verified: this.is_verified,
    };
  }

  toEntity(): EmailEntity {
    return {
      email: this.email,
      isVerified: this.is_verified,
    };
  }
}
