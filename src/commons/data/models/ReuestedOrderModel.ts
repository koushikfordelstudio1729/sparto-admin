// src/pages/DashBoard/data/models/RequestModel.ts

import type { RequestEntity } from "@/commons/domain/entities/RequestEntity";

type MediaItem = {
  url: string;
  fileName: string;
  type: string;
  mimeType: string;
};

export class RequestModel {
  id: string;
  userId: string;
  // Add a userName field (empty for now — populate from a join or a separate call)
  userName: string;
  requestType: string;
  description: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleVin: string;
  vehicleLicensePlate: string;
  media: MediaItem[];
  status: string;
  clarificationCount: number;
  createdAt: number; // UNIX seconds
  updatedAt: number; // UNIX seconds

  constructor(
    id: string,
    userId: string,
    // userName must exist on the entity, so accept it here (or set it blank)
    userName: string,
    requestType: string,
    description: string,
    vehicleMake: string,
    vehicleModel: string,
    vehicleYear: number,
    vehicleVin: string,
    vehicleLicensePlate: string,
    media: MediaItem[],
    status: string,
    clarificationCount: number,
    createdAt: number,
    updatedAt: number
  ) {
    this.id = id;
    this.userId = userId;
    this.userName = userName;
    this.requestType = requestType;
    this.description = description;
    this.vehicleMake = vehicleMake;
    this.vehicleModel = vehicleModel;
    this.vehicleYear = vehicleYear;
    this.vehicleVin = vehicleVin;
    this.vehicleLicensePlate = vehicleLicensePlate;
    this.media = media;
    this.status = status;
    this.clarificationCount = clarificationCount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: Record<string, unknown>): RequestModel {
    const rawMedia = Array.isArray(json.media)
      ? (json.media as Array<Record<string, unknown>>)
      : [];
    const media: MediaItem[] = rawMedia.map((m) => ({
      url: String(m.url),
      fileName: String(m.file_name),
      type: String(m.type),
      mimeType: String(m.mime_type),
    }));
    const vi = (json.vehicle_info as Record<string, unknown>) || {};

    return new RequestModel(
      String(json.id),
      String(json.user_id),
      "", // userName isn't in this payload; you can fill it later
      String(json.type),
      String(json.description),
      String(vi.make),
      String(vi.model),
      Number(vi.year),
      String(vi.vin),
      String(vi.license_plate),
      media,
      String(json.status),
      Number(json.clarification_count),
      Number(json.created_at),
      Number(json.updated_at)
    );
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      user_id: this.userId,
      type: this.requestType,
      description: this.description,
      vehicle_info: {
        make: this.vehicleMake,
        model: this.vehicleModel,
        year: this.vehicleYear,
        vin: this.vehicleVin,
        license_plate: this.vehicleLicensePlate,
      },
      media: this.media.map((m) => ({
        url: m.url,
        file_name: m.fileName,
        type: m.type,
        mime_type: m.mimeType,
      })),
      status: this.status,
      clarification_count: this.clarificationCount,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }

  toEntity(): RequestEntity {
    return {
      id: this.id,
      user_id: this.userId,
      userName: this.userName,
      type: this.requestType,
      description: this.description,
      vehicle_info: {
        make: this.vehicleMake,
        model: this.vehicleModel,
        year: this.vehicleYear,
        vin: this.vehicleVin,
        license_plate: this.vehicleLicensePlate,
      },
      media: this.media.map((m) => ({
        url: m.url,
        file_name: m.fileName,
        type: m.type,
        mime_type: m.mimeType,
      })),
      status: this.status,
      clarification_count: this.clarificationCount,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}
