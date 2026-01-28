
import apiClient from "./apiClient";
import { TRIP_API } from "@/api/trip.api";

export interface Trip {
  id: string;
  tripId: string;
  truck: string;
  driver: string;
  origin: string;
  destination: string;
  status: string;
  eta: string;
  progress: number;
  weight: number;
  estimatedHours: number;
  cargoDescription: string;
  currentLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  tripDocuments?: {
    invoice1Url?: string;
    invoice1UploadedAt?: string;
    invoice2Url?: string;
    invoice2UploadedAt?: string;
  };
  aiCurrentSpeed: number;
  // NEW METRICS FIELDS
  aiTotalDistanceCoveredKm: number;
  aiAverageSpeed: number;
  aiMovementDetected: boolean;
  driverStatus: string;
  drivingMetrics: {
    totalDrivingTime: number;
    averageSpeed: number;
    maxSpeed: number;
    totalDistanceCovered: number;
  };
  
}

const mapBackendTrip = (t: any): Trip => {
  const id = t._id || t.id;
  
  return {
    id: id,
    tripId: t.tripNumber || `TRP-${id.slice(-6).toUpperCase()}`,
    truck: t.truck?.licensePlate || "N/A", 
    driver: t.driver ? `${t.driver.firstName} ${t.driver.lastName}` : "Unassigned",
    origin: t.origin,
    destination: t.destination,
    status: t.status?.replace("_", " ") || "scheduled",
    eta: t.aiEstimatedArrivalHuman || "N/A",
    progress: t.status === "delivered" ? 100 : (t.status === "in_progress" ? 50 : 0),
    currentLocation: t.currentLocation,
    weight: t.weight || 0,
    estimatedHours: t.estimatedHours || 0,
    cargoDescription: t.cargoDescription || "N/A",
    
    // AI Metrics
    aiCurrentSpeed: t.aiCurrentSpeed || 0,
    aiAverageSpeed: t.aiAverageSpeed || 0,
    aiTotalDistanceCoveredKm: t.aiTotalDistanceCoveredKm || 0,
    aiMovementDetected: t.aiMovementDetected || false,
    driverStatus: t.driverStatus || "unknown",
     tripDocuments: t.tripDocuments || {},
    // Native Driving Metrics
    drivingMetrics: {
      totalDrivingTime: t.drivingMetrics?.totalDrivingTime || 0,
      averageSpeed: t.drivingMetrics?.averageSpeed || 0,
      maxSpeed: t.drivingMetrics?.maxSpeed || 0,
      totalDistanceCovered: t.drivingMetrics?.totalDistanceCovered || 0,
      
    }
  };
};
export const tripService = {
  async getTrips(): Promise<Trip[]> {
    const res = await apiClient.get(TRIP_API.LIST);
    return (res.data.data || []).map(mapBackendTrip);
  },
  async createTrip(payload: any) {
    const res = await apiClient.post(TRIP_API.CREATE, payload);
    return mapBackendTrip(res.data.data[0] || res.data.data);
  },
  async updateTrip(id: string, payload: any) {
    const res = await apiClient.patch(TRIP_API.UPDATE(id), payload);
    return mapBackendTrip(res.data.data);
  },
 
  async cancelTrip(id: string) {
    const res = await apiClient.delete(TRIP_API.CANCEL(id));
    return mapBackendTrip(res.data.data);
  },

  async deleteTrip(id: string) {
    return await apiClient.delete(TRIP_API.DELETE(id));
  },
};

export const uploadTripDocuments = async (formData: FormData) => {
  const res = await apiClient.post(TRIP_API.UPLOAD_DOCUMENTS, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.data;
};
