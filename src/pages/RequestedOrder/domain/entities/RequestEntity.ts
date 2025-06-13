export interface MediaItem {
  url: string;
  file_name: string;
  type: string;
  mime_type: string;
}

export interface RequestEntity {
  id: string;
  user_id: string;
  type: string;
  description: string;
  media: MediaItem[];
  status: string;
  clarification_count: number;
  created_at: number;
  updated_at: number;
}
