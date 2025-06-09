export interface RequestEntity {
  id: string;
  user_id: string;
  userName: string;
  type: string;
  description: string;
  vehicle_info: {
    make: string;
    model: string;
    year: number;
    vin: string;
    license_plate: string;
  };
  media: {
    url: string;
    file_name: string;
    type: string;
    mime_type: string;
  }[];
  status: string;
  clarification_count: number;
  created_at: number;
  updated_at: number;
}
