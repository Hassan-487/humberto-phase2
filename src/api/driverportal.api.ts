// import apiClient from "@/services/apiClient";

// export const DRIVERPortal_API = {
//   LOGIN: "/api/v1/auth/login",
//   ASSIGNED_TRIPS: "/drivers/me/trips/assigned",
//   IN_TRANSIT: "/drivers/me/trips/in-transit",
//   COMPLETED: "/drivers/me/trips/completed",
//   ALL_TRIPS: "/drivers/me/trips",
//   START_TRIP: (id: string) => `/drivers/me/trips/${id}/start`,
//   COMPLETE_TRIP: (id: string) => `/drivers/me/trips/${id}/complete`,
//   ACTIVITY: (id: string) => `/drivers/me/trips/${id}/activity`,
//   UPLOAD_DELIVERY_DOCS: "/documents/trip/delivery-upload",
// };

// export const driverportalApi = {
//   getAssignedTrips: (params?: any) =>
//     apiClient.get(DRIVERPortal_API.ASSIGNED_TRIPS, { params }),

//   getInTransitTrip: () =>
//     apiClient.get(DRIVERPortal_API.IN_TRANSIT),

//   getCompletedTrips: (params?: any) =>
//     apiClient.get(DRIVERPortal_API.COMPLETED, { params }),

//   getAllTrips: (params?: any) =>
//     apiClient.get(DRIVERPortal_API.ALL_TRIPS, { params }),

//   startTrip: (tripId: string) =>
//     apiClient.patch(DRIVERPortal_API.START_TRIP(tripId), {}),

//   // completeTrip: (tripId: string) =>
//   //   apiClient.patch(DRIVERPortal_API.COMPLETE_TRIP(tripId), {}),

//   completeTrip: (
//     tripId: string,
//     payload: {
//       proofOfDeliveryUrl: string;
//       deliveryPictureUrl: string;
//     }
//   ) =>
//     apiClient.patch(
//       DRIVERPortal_API.COMPLETE_TRIP(tripId),
//       payload
//     ),


//   updateActivity: (tripId: string, payload: { driverActivityStatus: string }) =>
//     apiClient.patch(DRIVERPortal_API.ACTIVITY(tripId), payload),

//   uploadDeliveryDocuments: (formData: FormData) =>
//     apiClient.post(
//       DRIVERPortal_API.UPLOAD_DELIVERY_DOCS,
//       formData,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     ),
// };

import apiClient from "@/services/apiClient";

export const DRIVERPortal_API = {
  LOGIN: "/api/v1/auth/login",

  // Trips
  ASSIGNED_TRIPS: "/drivers/me/trips/assigned",
  IN_TRANSIT: "/drivers/me/trips/in-transit",
  COMPLETED: "/drivers/me/trips/completed",
  ALL_TRIPS: "/drivers/me/trips",

  START_TRIP: (id: string) => `/drivers/me/trips/${id}/start`,
  COMPLETE_TRIP: (id: string) => `/drivers/me/trips/${id}/complete`,
  ACTIVITY: (id: string) => `/drivers/me/trips/${id}/activity`,

  // Documents
  UPLOAD_DELIVERY_DOCS: "/documents/trip/delivery-upload",

  // NEW (M4 & M5)
  DRIVER_ACCEPTANCE: (id: string) =>
    `/driver/trips/${id}/driver-acceptance`,

  LOADING_DATA: (id: string) =>
    `/driver/trips/${id}/loading-data`,

  UPLOAD_CONTAINER_PHOTOS: "/driver/trips/container-photos",
};

export const driverportalApi = {
  // ───── Trips ─────
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

  updateActivity: (
    tripId: string,
    payload: { driverActivityStatus: string }
  ) =>
    apiClient.patch(DRIVERPortal_API.ACTIVITY(tripId), payload),

  // ───── Delivery Docs ─────
  uploadDeliveryDocuments: (formData: FormData) =>
    apiClient.post(
      DRIVERPortal_API.UPLOAD_DELIVERY_DOCS,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    ),

  // ───── NEW M4: Driver Acceptance ─────
  saveDriverAcceptance: (
    tripId: string,
    payload: {
      loadAcceptanceDate: string;
      loadAcceptanceHour: string;
      tripStartDate: string;
      tripStartHour: string;
    }
  ) =>
    apiClient.patch(
      DRIVERPortal_API.DRIVER_ACCEPTANCE(tripId),
      payload
    ),

  // ───── NEW M5: Loading Data ─────
  saveLoadingData: (
    tripId: string,
    payload: {
      arrivalDate: string;
      arrivalHour: string;
      containers: {
        containerNumber: string;
        sealNumber: string;
        customer: string;
      }[];
    }
  ) =>
    apiClient.patch(
      DRIVERPortal_API.LOADING_DATA(tripId),
      payload
    ),

  // ───── NEW M5: Upload Container Photos ─────
  uploadContainerPhotos: (formData: FormData) =>
    apiClient.post(
      DRIVERPortal_API.UPLOAD_CONTAINER_PHOTOS,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    ),
};