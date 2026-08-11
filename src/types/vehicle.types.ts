export interface IVehicle {
  id?: number;
  name: string;
  plate_number: string;
  category: string;
  daily_rate: number;
  photo_path?: string | null;
  deleted_at?: Date | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateVehicleDTO {
  name: string;
  plate_number: string;
  category: string;
  daily_rate: number;
  photo_path?: string;
}

export interface UpdateVehicleDTO {
  name?: string;
  plate_number?: string;
  category?: string;
  daily_rate?: number;
  photo_path?: string;
}