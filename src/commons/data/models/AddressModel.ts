import type { AddressEntity } from "@/commons/domain/entities/AddressEntity";

export class AddressModel {
  public line1: string;
  public city: string;
  public state: string;
  public pincode: string;
  public country: string;
  public is_default: boolean;

  constructor(
    line1: string,
    city: string,
    state: string,
    pincode: string,
    country: string,
    is_default: boolean
  ) {
    this.line1 = line1;
    this.city = city;
    this.state = state;
    this.pincode = pincode;
    this.country = country;
    this.is_default = is_default;
  }

  static fromJson(json: Record<string, string | unknown>): AddressModel {
    return new AddressModel(
      json.line1 as string,
      json.city as string,
      json.state as string,
      json.pincode as string,
      json.country as string,
      json.is_default as boolean
    );
  }

  toJson(): Record<string, unknown> {
    return {
      line1: this.line1,
      city: this.city,
      state: this.state,
      pincode: this.pincode,
      country: this.country,
      is_default: this.is_default,
    };
  }

  toEntity(): AddressEntity {
    return {
      line1: this.line1,
      line2: this.line1,
      city: this.city,
      state: this.state,
      pincode: this.pincode,
      country: this.country,
      is_default: this.is_default,
    };
  }
}
