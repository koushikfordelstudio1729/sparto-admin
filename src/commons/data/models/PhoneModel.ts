import type { PhoneEntity } from "@/commons/domain/entities/PhoneEntity";

export class PhoneModel {
  number: string;
  is_verified: boolean;

  constructor(number: string, is_verified: boolean) {
    this.number = number;
    this.is_verified = is_verified;
  }

  static fromJson(json: Record<string, string | unknown>): PhoneModel {
    return new PhoneModel(json.number as string, json.is_verified as boolean);
  }

  toJson(): Record<string, unknown> {
    return {
      number: this.number,
      is_verified: this.is_verified,
    };
  }

  toEntity(): PhoneEntity {
    return {
      number: this.number,
      isVerified: this.is_verified,
    };
  }
}
