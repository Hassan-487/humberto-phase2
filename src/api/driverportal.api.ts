// import apiClient from "@/services/apiClient";

// export const DRIVER_API = {
//   DASHBOARD: "/api/v1/auth/login", // dashboard comes from login
//   ASSIGNED_TRIPS: "/api/v1/drivers/me/trips/assigned",
//   IN_TRANSIT: "/api/v1/drivers/me/trips/in-transit",
//   COMPLETED: "/api/v1/drivers/me/trips/completed",
//   ALL_TRIPS: "/api/v1/drivers/me/trips",
//   START_TRIP: (id: string) => `/api/v1/drivers/me/trips/${id}/start`,
//   COMPLETE_TRIP: (id: string) => `/api/v1/drivers/me/trips/${id}/complete`,
//   ACTIVITY: (id: string) => `/api/v1/drivers/me/trips/${id}/activity`,
// };

// export const driverApi = {
//   getAssignedTrips: (params?: any) =>
//     apiClient.get(DRIVER_API.ASSIGNED_TRIPS, { params }),

//   getInTransitTrip: () =>
//     apiClient.get(DRIVER_API.IN_TRANSIT),

//   getCompletedTrips: (params?: any) =>
//     apiClient.get(DRIVER_API.COMPLETED, { params }),

//   getAllTrips: (params?: any) =>
//     apiClient.get(DRIVER_API.ALL_TRIPS, { params }),

//   startTrip: (tripId: string) =>
//     apiClient.patch(DRIVER_API.START_TRIP(tripId)),

//   completeTrip: (tripId: string) =>
//     apiClient.patch(DRIVER_API.COMPLETE_TRIP(tripId)),

//   updateActivity: (tripId: string, payload: { driverActivityStatus: string }) =>
//     apiClient.patch(DRIVER_API.ACTIVITY(tripId), payload),
// };







import apiClient from "@/services/apiClient";
import { DRIVER_API } from "./driver.api";

export const DRIVERPortal_API = {
  LOGIN: "/api/v1/auth/login",
  ASSIGNED_TRIPS: "/api/v1/drivers/me/trips/assigned",
  IN_TRANSIT: "/api/v1/drivers/me/trips/in-transit",
  COMPLETED: "/api/v1/drivers/me/trips/completed",
  ALL_TRIPS: "/api/v1/drivers/me/trips",
  START_TRIP: (id: string) => `/api/v1/drivers/me/trips/${id}/start`,
  COMPLETE_TRIP: (id: string) => `/api/v1/drivers/me/trips/${id}/complete`,
  ACTIVITY: (id: string) => `/api/v1/drivers/me/trips/${id}/activity`,
};

export const driverportalApi = {
  getAssignedTrips: (params?: any) =>
    apiClient.get(DRIVERPortal_API.ASSIGNED_TRIPS, { params }),

  getInTransitTrip: () =>
    apiClient.get(DRIVERPortal_API.IN_TRANSIT),

  getCompletedTrips: (params?: any) =>
    apiClient.get(DRIVERPortal_API.COMPLETED, { params }),

  getAllTrips: (params?: any) =>
    apiClient.get(DRIVERPortal_API.ALL_TRIPS, { params }),

  startTrip: (tripId: string) =>
    apiClient.patch(DRIVERPortal_API.START_TRIP(tripId), {}),

  completeTrip: (tripId: string) =>
    apiClient.patch(DRIVERPortal_API.COMPLETE_TRIP(tripId), {}),

  updateActivity: (tripId: string, payload: { driverActivityStatus: string }) =>
    apiClient.patch(DRIVERPortal_API.ACTIVITY(tripId), payload),
};