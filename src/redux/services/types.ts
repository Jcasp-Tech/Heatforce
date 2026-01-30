
export interface QueryParams {
  limit?: number;
  page?: number;
  id?: number;
  quetionsid?: number;
  qrcode?: string;
}

export interface SuccessResponse {
  count: number;
  total: number;
  hasMany: boolean;
}

export interface roofDetails {
  id?: number | undefined;
  index: 1 | 2 | 3;
  draw_points: null | any[];
  roofShading: boolean| number | null;
  roof_pitch: string | null;
  roof_direction: string | null;
  suggested_roof_area: number | null;
  suggested_panel: number | null;
}
