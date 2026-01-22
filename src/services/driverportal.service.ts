import { driverportalApi } from "@/api/driverportal.api";
export interface DriverDashboard {
  status: "idle" | "assigned" | "in_transit";
  stats: {
    completedTrips: number;
    assignedTrips: number;
    inTransitTrips: number;
    delayedTrips: number;
    totalTrips: number;
  };
  assignedTrips: DriverTrip[];
  inTransitTrip: DriverTrip | null;
}

export interface DriverTrip {
  id: string;
  tripNumber: string;
  origin: string;
  destination: string;
  pickupTime: string;
  deliveryTime: string;
  weight: number;
  cargo: string;
  estimatedHours: number;
  status?: string;
  driverActivityStatus?: string;
  startedAt?: string;
  deliveredAt?: string;
  isDelayed?: boolean;
  delayedByMinutes?: number;
  truck: {
    plate: string;
    model: string;
  };
  currentLocation?: {
    latitude: number;
    longitude: number;
    address: string;
    speed: number;
  };
}

export const driverService = {
  async getAssignedTrips(page = 1, limit = 10) {
    const res = await driverportalApi.getAssignedTrips({ page, limit });
    return res.data.data || [];
  },

  async getInTransitTrip() {
    const res = await driverportalApi.getInTransitTrip();
    return res.data.data || null;
  },

  async getCompletedTrips(page = 1, limit = 10) {
    const res = await driverportalApi.getCompletedTrips({ page, limit });
    return res.data.data || [];
  },

  async getAllTrips(page = 1, limit = 10, status?: string) {
    const res = await driverportalApi.getAllTrips({ page, limit, status });
    return res.data.data || [];
  },

  async startTrip(tripId: string) {
    const res = await driverportalApi.startTrip(tripId);
    return res.data.data;
  },

  async completeTrip(tripId: string) {
    const res = await driverportalApi.completeTrip(tripId);
    return res.data.data;
  },

  async updateActivity(tripId: string, status: string) {
    const res = await driverportalApi.updateActivity(tripId, {
      driverActivityStatus: status,
    });
    return res.data.data;
  },
};