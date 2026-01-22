export type TripStatus =
  | "scheduled"
  | "in_progress"
  | "delivered"
  | "delayed_delivered"
  | "pending"
  | "completed";

export interface Trip {
  id: string;
  status: TripStatus;

  pickupLocation: string;
  dropLocation: string;

  pickupAddress?: string;
  dropAddress?: string;

  date?: string;
  distance?: string;
}
