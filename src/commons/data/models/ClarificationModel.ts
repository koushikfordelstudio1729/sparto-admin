// src/pages/DashBoard/data/models/ClarificationModel.ts

import type { ClarificationEntity } from "@/commons/domain/entities/ClarificationEntity";

export class ClarificationModel {
  id: string;
  requestId: string;
  actorId: string;
  actorType: "admin" | "user";
  message: string;
  media: Array<{
    file_url: string;
    file_name: string;
    file_type: string;
    uploaded_at: number;
  }>;
  createdAt: number;

  constructor(
    id: string,
    requestId: string,
    actorId: string,
    actorType: "admin" | "user",
    message: string,
    media: Array<{
      file_url: string;
      file_name: string;
      file_type: string;
      uploaded_at: number;
    }>,
    createdAt: number
  ) {
    this.id = id;
    this.requestId = requestId;
    this.actorId = actorId;
    this.actorType = actorType;
    this.message = message;
    this.media = media;
    this.createdAt = createdAt;
  }

  /** Build a ClarificationModel from the API’s snake_case JSON */
  static fromJson(json: Record<string, unknown>): ClarificationModel {
    const rawMedia = Array.isArray(json["media"])
      ? (json["media"] as Record<string, unknown>[])
      : [];
    const media = rawMedia.map((m) => ({
      file_url: m["file_url"] as string,
      file_name: m["file_name"] as string,
      file_type: m["file_type"] as string,
      uploaded_at: m["uploaded_at"] as number,
    }));

    return new ClarificationModel(
      json["id"] as string,
      json["request_id"] as string,
      json["actor_id"] as string,
      json["actor_type"] as "admin" | "user",
      json["message"] as string,
      media,
      json["created_at"] as number
    );
  }

  /** Serialize back into the API’s snake_case JSON shape */
  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      request_id: this.requestId,
      actor_id: this.actorId,
      actor_type: this.actorType,
      message: this.message,
      media: this.media.map((m) => ({
        file_url: m.file_url,
        file_name: m.file_name,
        file_type: m.file_type,
        uploaded_at: m.uploaded_at,
      })),
      created_at: this.createdAt,
    };
  }

  /** Convert into your camelCase domain entity */
  toEntity(): ClarificationEntity {
    return {
      id: this.id,
      requestId: this.requestId,
      actorId: this.actorId,
      actorType: this.actorType,
      message: this.message,
      media: this.media.map((m) => ({
        file_url: m.file_url,
        file_name: m.file_name,
        file_type: m.file_type,
        uploaded_at: m.uploaded_at,
      })),
      createdAt: this.createdAt,
    };
  }
}
