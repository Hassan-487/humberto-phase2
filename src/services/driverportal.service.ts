// import { driverportalApi } from "@/api/driverportal.api";
// export interface DriverDashboard {
//   status: "idle" | "assigned" | "in_transit";
//   stats: {
//     completedTrips: number;
//     assignedTrips: number;
//     inTransitTrips: number;
//     delayedTrips: number;
//     totalTrips: number;
//   };
//   assignedTrips: DriverTrip[];
//   inTransitTrip: DriverTrip | null;
// }

// export interface DriverTrip {
//   id: string;
//   tripNumber: string;
//   origin: string;
//   destination: string;
//   pickupTime: string;
//   deliveryTime: string;
//   weight: number;
//   cargo: string;
//   estimatedHours: number;
//   status?: string;
//   driverActivityStatus?: string;
//   startedAt?: string;
//   deliveredAt?: string;
//   isDelayed?: boolean;
//   delayedByMinutes?: number;
//   truck: {
//     plate: string;
//     model: string;
//   };
//   currentLocation?: {
//     latitude: number;
//     longitude: number;
//     address: string;
//     speed: number;
//   };
// }

// export const driverService = {
//   async getAssignedTrips(page = 1, limit = 10) {
//     const res = await driverportalApi.getAssignedTrips({ page, limit });
//     return res.data.data || [];
//   },

//   async getInTransitTrip() {
//     const res = await driverportalApi.getInTransitTrip();
//     return res.data.data || null;
//   },

//   async getCompletedTrips(page = 1, limit = 10) {
//     const res = await driverportalApi.getCompletedTrips({ page, limit });
//     return res.data.data || [];
//   },

//   async getAllTrips(page = 1, limit = 10, status?: string) {
//     const res = await driverportalApi.getAllTrips({ page, limit, status });
//     return res.data.data || [];
//   },

//   async startTrip(tripId: string) {
//     const res = await driverportalApi.startTrip(tripId);
//     return res.data.data;
//   },

 

// async completeTrip(
//     tripId: string,
//     docs: {
//       proofOfDeliveryUrl: string;
//       deliveryPictureUrl: string;
//     }
//   ) {
//     const res = await driverportalApi.completeTrip(tripId, docs);
//     return res.data.data;
//   },

//   async updateActivity(tripId: string, status: string) {
//     const res = await driverportalApi.updateActivity(tripId, {
//       driverActivityStatus: status,
//     });
//     return res.data.data;
//   },

//   async uploadProofOfDelivery(file: File) {
//     const fd = new FormData();
//     fd.append("proofOfDelivery", file);

//     const res = await driverportalApi.uploadDeliveryDocuments(fd);
//     // return res.data.data?.proofOfDelivery;
//     return res.data.data.proofOfDelivery;
//   },

//   // ✅ Upload Delivery Picture (Image)
//   async uploadDeliveryPicture(file: File) {
//     const fd = new FormData();
//     fd.append("deliveryPicture", file);

//     const res = await driverportalApi.uploadDeliveryDocuments(fd);
//     // return res.data.data?.deliveryPicture;

// return res.data.data.deliveryPicture; 
//  },
// };


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
  // ─────────────────────────────────────────────────────────────────────────
  // Trip queries
  // ─────────────────────────────────────────────────────────────────────────

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

  // ─────────────────────────────────────────────────────────────────────────
  // Trip lifecycle
  // ─────────────────────────────────────────────────────────────────────────

  async startTrip(tripId: string) {
    const res = await driverportalApi.startTrip(tripId);
    return res.data.data;
  },

  async completeTrip(
    tripId: string,
    docs: {
      proofOfDeliveryUrl: string;
      deliveryPictureUrl: string;
    }
  ) {
    const res = await driverportalApi.completeTrip(tripId, docs);
    return res.data.data;
  },

  async updateActivity(tripId: string, status: string) {
    const res = await driverportalApi.updateActivity(tripId, {
      driverActivityStatus: status,
    });
    return res.data.data;
  },

  // ─────────────────────────────────────────────────────────────────────────
  // M4 – Driver saves load acceptance & trip start timestamps
  // PATCH /trips/:tripId/driver-acceptance  (adjust path to match your backend)
  // ─────────────────────────────────────────────────────────────────────────

  async saveDriverAcceptance(
    tripId: string,
    payload: {
      loadAcceptanceDate: string;   // "YYYY-MM-DD"
      loadAcceptanceHour: string;   // "HH:MM"
      tripStartDate: string;        // "YYYY-MM-DD"
      tripStartHour: string;        // "HH:MM"
    }
  ) {
    const res = await driverportalApi.saveDriverAcceptance(tripId, payload);
    return res.data.data;
  },

  // ─────────────────────────────────────────────────────────────────────────
  // M5 – Driver saves loading arrival + container data (photos via FormData)
  // PATCH /trips/:tripId/loading-data  (adjust path to match your backend)
  // ─────────────────────────────────────────────────────────────────────────

  async saveLoadingData(
    tripId: string,
    payload: {
      arrivalDate: string;    // "YYYY-MM-DD"
      arrivalHour: string;    // "HH:MM"
      containers: {
        containerNumber: string;
        sealNumber: string;
        customer: string;
      }[];
    }
  ) {
    const res = await driverportalApi.saveLoadingData(tripId, payload);
    return res.data.data;
  },

  // Upload container photos for a specific container (multipart)
  async uploadContainerPhotos(tripId: string, containerIndex: number, files: File[]) {
    const fd = new FormData();
    files.forEach((f) => fd.append(`containerPhotos`, f));
    fd.append("tripId", tripId);
    fd.append("containerIndex", String(containerIndex));
    const res = await driverportalApi.uploadContainerPhotos(fd);
    return res.data.data;
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Document uploads
  // ─────────────────────────────────────────────────────────────────────────

  async uploadProofOfDelivery(file: File) {
    const fd = new FormData();
    fd.append("proofOfDelivery", file);
    const res = await driverportalApi.uploadDeliveryDocuments(fd);
    return res.data.data.proofOfDelivery;
  },

  async uploadDeliveryPicture(file: File) {
    const fd = new FormData();
    fd.append("deliveryPicture", file);
    const res = await driverportalApi.uploadDeliveryDocuments(fd);
    return res.data.data.deliveryPicture;
  },
};