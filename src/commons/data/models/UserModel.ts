import { AddressModel } from "./AddressModel";
import { EmailModel } from "./EmailModel";
import { PhoneModel } from "./PhoneModel";
import type { UserEntity } from "@/commons/domain/entities/UserEntity";

export class UserModel {
  public id: string;
  public name: string;
  public phones: PhoneModel[];
  public emails: EmailModel[];
  public addresses: AddressModel[];
  public profile_picture_url?: string;
  public role_id: string;
  public status: "active" | "inactive";
  public terms_accepted: boolean;
  public created_at: number;
  public updated_at: number;
  public has_password: boolean;

  constructor(
    id: string,
    name: string,
    phones: PhoneModel[],
    emails: EmailModel[],
    addresses: AddressModel[],
    profile_picture_url: string | undefined,
    role_id: string,
    status: "active" | "inactive",
    terms_accepted: boolean,
    created_at: number,
    updated_at: number,
    has_password: boolean
  ) {
    this.id = id;
    this.name = name;
    this.phones = phones;
    this.emails = emails;
    this.addresses = addresses;
    this.profile_picture_url = profile_picture_url;
    this.role_id = role_id;
    this.status = status;
    this.terms_accepted = terms_accepted;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.has_password = has_password;
  }

  toEntity(): UserEntity {
    return {
      id: this.id,
      name: this.name,
      phones: this.phones.map((phone) => phone.toEntity()),
      emails: this.emails.map((email) => email.toEntity()),
      addresses: this.addresses.map((address) => address.toEntity()),
      profilePictureUrl: this.profile_picture_url,
      roleId: this.role_id,
      status: this.status,
      termsAccepted: this.terms_accepted,
      createdAt: this.created_at,
      updatedAt: this.updated_at,
      hasPassword: this.has_password,
    };
  }

  static fromJson(json: Record<string, unknown>): UserModel {
    const phones = ((json.phones as Record<string, unknown>[]) || []).map((p) =>
      PhoneModel.fromJson(p)
    );
    const emails = ((json.emails as Record<string, unknown>[]) || []).map((e) =>
      EmailModel.fromJson(e)
    );
    const addresses = ((json.addresses as Record<string, unknown>[]) || []).map(
      (a) => AddressModel.fromJson(a)
    );

    return new UserModel(
      json.id as string,
      json.name as string,
      phones,
      emails,
      addresses,
      json.profile_picture_url as string,
      json.role_id as string,
      json.status as "active" | "inactive",
      json.terms_accepted as boolean,
      json.created_at as number,
      json.updated_at as number,
      json.has_password as boolean
    );
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      phones: this.phones.map((p) => p.toJson()),
      emails: this.emails.map((e) => e.toJson()),
      addresses: this.addresses.map((a) => a.toJson()),
      profile_picture_url: this.profile_picture_url,
      role_id: this.role_id,
      status: this.status,
      terms_accepted: this.terms_accepted,
      created_at: this.created_at,
      updated_at: this.updated_at,
      has_password: this.has_password,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}
