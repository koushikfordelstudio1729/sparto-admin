import type { RequestEntity } from "../../domain/entities/RequestEntity";

type MediaItem = {
  url: string;
  file_name: string;
  type: string;
  mime_type: string;
};

export class RequestModel {
  id: string;
  user_id: string;
  type: string;
  description: string;
  media: MediaItem[];
  status: string;
  clarification_count: number;
  created_at: number;
  updated_at: number;

  constructor(
    id: string,
    user_id: string,
    type: string,
    description: string,
    media: MediaItem[],
    status: string,
    clarification_count: number,
    created_at: number,
    updated_at: number
  ) {
    this.id = id;
    this.user_id = user_id;
    this.type = type;
    this.description = description;
    this.media = media;
    this.status = status;
    this.clarification_count = clarification_count;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromJson(json: Record<string, unknown>): RequestModel {
    const rawMedia = Array.isArray(json.media)
      ? (json.media as Array<Record<string, unknown>>)
      : [];

    const media: MediaItem[] = rawMedia.map((m) => ({
      url: String(m.url),
      file_name: String(m.file_name),
      type: String(m.type),
      mime_type: String(m.mime_type),
    }));

    return new RequestModel(
      String(json.id),
      String(json.user_id),
      String(json.type),
      String(json.description),
      media,
      String(json.status),
      Number(json.clarification_count),
      Number(json.created_at),
      Number(json.updated_at)
    );
  }

  toEntity(): RequestEntity {
    return {
      id: this.id,
      user_id: this.user_id,
      type: this.type,
      description: this.description,
      media: this.media,
      status: this.status,
      clarification_count: this.clarification_count,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
