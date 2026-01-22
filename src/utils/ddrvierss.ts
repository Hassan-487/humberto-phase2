export type TripStatus = 'pending' | 'ongoing' | 'completed';

export interface Trip {
  id: string;
  pickupLocation: string;
  dropLocation: string;
  pickupAddress: string;
  dropAddress: string;
  date: string;
  time: string;
  status: TripStatus;
  distance: string;
  estimatedDuration: string;
  cargo: string;
  weight: string;
}

export interface Truck {
  id: string;
  number: string;
  model: string;
  capacity: string;
  status: 'active' | 'maintenance' | 'idle';
  fuelLevel: number;
  mileage: string;
  lastService: string;
  nextService: string;
}

export interface Driver {
  id: string;
  name: string;
  firstName: string;
  phone: string;
  email: string;
  avatar?: string;
  licenseNumber: string;
  licenseExpiry: string;
  licenseType: string;
  joinedDate: string;
  rating: number;
  totalTrips: number;
}

export interface TripTimeline {
  status: string;
  time: string;
  completed: boolean;
  current?: boolean;
}
