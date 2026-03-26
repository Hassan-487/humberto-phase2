

import apiClient from "./apiClient";
import { TRIP_API } from "@/api/trip.api";

export interface Trip {
  id: string;
  tripId: string;
  truck: string;
  driver: string;
  origin: string;
  originPickupTime?: string;
destinationDeliveryTime?: string;

  schedule?: {
    plannedStartTime?: string;
    actualStartTime?: string;
  };
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
  originLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  destinationLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  tripDocuments?: {
  invoice1Url?: string;
  invoice1UploadedAt?: string;

  invoice2Url?: string;
  invoice2UploadedAt?: string;

  proofOfDeliveryUrl?: string;
  proofOfDeliveryUploadedAt?: string;

  deliveryPictureUrl?: string;
  deliveryPictureUploadedAt?: string;
};

  // AI METRICS
  aiCurrentSpeed: number;
  aiDistanceRemaining: number;
  aiAverageSpeed: number;
  aiMovementDetected: boolean;
  aiEstimatedArrivalHuman: string;
  aiEstimatedArrivalTime: string;
  aiLastUpdated: string;
  aiOriginToDestinationTotal: number;
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
    truck: t.truck?.truckNumber || t.truck?.licensePlate || "N/A",
    driver: t.driver ? `${t.driver.firstName} ${t.driver.lastName}` : "Unassigned",
    origin: t.origin,
    destination: t.destination,
        originPickupTime: t.originPickupTime,
destinationDeliveryTime: t.destinationDeliveryTime,

schedule: {
  plannedStartTime: t.schedule?.plannedStartTime,
  actualStartTime: t.schedule?.actualStartTime,
},

    status: t.status?.replace("_", " ") || "scheduled",
    eta: t.aiEstimatedArrivalHuman || "N/A",
progress:
  typeof t.aiProgressPercentage === "number"
    ? Math.min(100, Math.max(0, t.aiProgressPercentage))
    : 0,
    currentLocation: t.currentLocation,
    originLocation: t.originLocation,
    destinationLocation: t.destinationLocation,
    weight: t.weight || 0,
    estimatedHours: t.estimatedHours || 0,
    cargoDescription: t.cargoDescription || "N/A",
    
    // AI Metrics
    aiCurrentSpeed: t.aiCurrentSpeed || 0,
    aiAverageSpeed: t.aiAverageSpeed || 0,
    aiDistanceRemaining: t.aiDistanceRemaining || 0,
    aiMovementDetected: t.aiMovementDetected || false,
    aiEstimatedArrivalHuman: t.aiEstimatedArrivalHuman || "Calculating...",
    aiEstimatedArrivalTime: t.aiEstimatedArrivalTime || "",
    aiLastUpdated: t.aiLastUpdated || "",
    aiOriginToDestinationTotal: t.aiOriginToDestinationTotal || 0,
    driverStatus: t.driverStatus || "unknown",
tripDocuments: {
  invoice1Url: t.tripDocuments?.invoice1Url,
  invoice1UploadedAt: t.tripDocuments?.invoice1UploadedAt,

  invoice2Url: t.tripDocuments?.invoice2Url,
  invoice2UploadedAt: t.tripDocuments?.invoice2UploadedAt,

  proofOfDeliveryUrl: t.tripDocuments?.proofOfDeliveryUrl,
  proofOfDeliveryUploadedAt: t.tripDocuments?.proofOfDeliveryUploadedAt,

  deliveryPictureUrl: t.tripDocuments?.deliveryPictureUrl,
  deliveryPictureUploadedAt: t.tripDocuments?.deliveryPictureUploadedAt,
},
    
    // Native Driving Metrics
    drivingMetrics: {
      totalDrivingTime: t.drivingMetrics?.totalDrivingTime || 0,
      averageSpeed: t.drivingMetrics?.averageSpeed || 0,
      maxSpeed: t.drivingMetrics?.maxSpeed || 0,
      totalDistanceCovered: t.drivingMetrics?.totalDistanceCovered || 0,
    }
  };
};

// export const tripService = {
//   async getTrips(): Promise<Trip[]> {
//     const res = await apiClient.get(TRIP_API.LIST);
//     return (res.data.data || []).map(mapBackendTrip);
//   },
//   async createTrip(payload: any) {
//     const res = await apiClient.post(TRIP_API.CREATE, payload);
//     return mapBackendTrip(res.data.data[0] || res.data.data);
//   },
//   async updateTrip(id: string, payload: any) {
//     const res = await apiClient.patch(TRIP_API.UPDATE(id), payload);
//     return mapBackendTrip(res.data.data);
//   },
 
//   async cancelTrip(id: string) {
//     const res = await apiClient.delete(TRIP_API.CANCEL(id));
//     return mapBackendTrip(res.data.data);
//   },

//   async deleteTrip(id: string) {
//     return await apiClient.delete(TRIP_API.DELETE(id));
//   },
// };
export const tripService = {
  async getTrips(): Promise<Trip[]> {
    const res = await apiClient.get(TRIP_API.LIST);
    return (res.data.data || []).map(mapBackendTrip);
  },

  async createTrip(payload: any) {
    const res = await apiClient.post(TRIP_API.CREATE, payload);
    return res.data.data;
  },

  async assignTrip(id: string, payload: any) {
    const res = await apiClient.patch(TRIP_API.ASSIGN(id), payload);
    return res.data.data;
  },

  async addPreExpenses(id: string, payload: any) {
    const res = await apiClient.patch(TRIP_API.PRE_EXPENSE(id), payload);
    return res.data.data;
  },

  async uploadStartDocuments(formData: FormData) {
    const res = await apiClient.post(
      TRIP_API.START_DOCUMENTS,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data.data;
  },

  async updateTrip(id: string, payload: any) {
    const res = await apiClient.patch(TRIP_API.UPDATE(id), payload);
    return mapBackendTrip(res.data.data);
  },

  async cancelTrip(id: string) {
    const res = await apiClient.delete(TRIP_API.CANCEL(id));
    return res.data.data;
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