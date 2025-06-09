// src/pages/DashBoard/data/datasource/dtos/CreateClarificationRequestDTO.ts

/**
 * A single media attachment to include when creating a clarification.
 */
export interface MediaObjectDTO {
  file_url: string;
  file_name: string;
  file_type: string;
  uploaded_at: number; // UNIX timestamp
}

/**
 * Payload for POST /clarifications
 */
export interface CreateClarificationRequestDTO {
  /** ID of the request/order to attach this clarification to */
  request_id: string;

  /** ID of the actor (user or admin) sending this clarification */
  actor_id: string;

  /** Must be "admin" or "user" */
  actor_type: "admin" | "user";

  /** The clarification message text */
  message: string;

  /** Optional list of attachments */
  media?: MediaObjectDTO[];
}
