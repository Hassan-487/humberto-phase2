import apiClient from "@/services/apiClient";

export const DRIVERPortal_API = {
  LOGIN: "/api/v1/auth/login",
  ASSIGNED_TRIPS: "/drivers/me/trips/assigned",
  IN_TRANSIT: "/drivers/me/trips/in-transit",
  COMPLETED: "/drivers/me/trips/completed",
  ALL_TRIPS: "/drivers/me/trips",
  START_TRIP: (id: string) => `/drivers/me/trips/${id}/start`,
  COMPLETE_TRIP: (id: string) => `/drivers/me/trips/${id}/complete`,
  ACTIVITY: (id: string) => `/drivers/me/trips/${id}/activity`,
  UPLOAD_DELIVERY_DOCS: "/documents/trip/delivery-upload",
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

  // completeTrip: (tripId: string) =>
  //   apiClient.patch(DRIVERPortal_API.COMPLETE_TRIP(tripId), {}),

  completeTrip: (
    tripId: string,
    payload: {
      proofOfDeliveryUrl: string;
      deliveryPictureUrl: string;
    }
  ) =>
    apiClient.patch(
      DRIVERPortal_API.COMPLETE_TRIP(tripId),
      payload
    ),


  updateActivity: (tripId: string, payload: { driverActivityStatus: string }) =>
    apiClient.patch(DRIVERPortal_API.ACTIVITY(tripId), payload),

  uploadDeliveryDocuments: (formData: FormData) =>
    apiClient.post(
      DRIVERPortal_API.UPLOAD_DELIVERY_DOCS,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    ),
};