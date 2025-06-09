// 1) Update your entity to include file_type
// src/commons/domain/entities/ClarificationEntity.ts

export interface MediaObject {
  file_url: string;
  file_name: string;
  file_type: string; // ← add this
  uploaded_at: number;
}

export interface ClarificationEntity {
  id: string;
  requestId: string;
  actorId: string;
  actorType: "admin" | "user";
  message: string;
  media: MediaObject[]; // now each MediaObject has file_type
  createdAt: number;
}
