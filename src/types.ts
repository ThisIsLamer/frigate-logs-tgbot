export interface FrigateSnapshot {
  frame_time: number;
  box: [number, number, number, number];
  area: number;
  region: [number, number, number, number];
  score: number;
  attributes: any[];
}

export interface FrigateAttribute {
  label: string;
  box: [number, number, number, number];
  score: number;
}

export interface FrigateEvent {
  id: string;
  camera: string;
  frame_time: number;
  snapshot: FrigateSnapshot;
  label: string;
  sub_label: [string, number] | null;
  top_score: number;
  false_positive: boolean;
  start_time: number;
  end_time: number | null;
  score: number;
  box: [number, number, number, number];
  area: number;
  ratio: number;
  region: [number, number, number, number];
  current_zones: string[];
  entered_zones: string[];
  thumbnail: string | null;
  has_snapshot: boolean;
  has_clip: boolean;
  active: boolean;
  stationary: boolean;
  motionless_count: number;
  position_changes: number;
  attributes: Record<string, number>;
  current_attributes: FrigateAttribute[];
  current_estimated_speed: number;
  average_estimated_speed: number;
  velocity_angle: number;
  recognized_license_plate: string;
  recognized_license_plate_score: number;
}

export interface FrigateEventUpdate {
  type: "new" | "update" | "end";
  before: FrigateEvent;
  after: FrigateEvent;
}

export interface FrigateTrackedObjectUpdate {
  type: string;
  id: string;
  description: string;
}