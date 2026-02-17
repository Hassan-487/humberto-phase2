
import apiClient from "@/services/apiClient";
import { TRUCK_API } from "@/api/truck.api";

/* ================= TYPES ================= */

export interface TruckDocumentUploadResponse {
  registration?: {
    url: string;
    fileName: string;
  };
  insurance?: {
    url: string;
    fileName: string;
  };
}

export interface Truck {
  _id: string;
  truckNumber: string;
  licensePlate: string;
  model: string;
  year: number;
  weight_capacity: number;
  samsaraDeviceId: string;
  fuelType: string;
  status: string;

  currentDriver?: {
    firstName: string;
    lastName: string;
  };

  lastKnownLocation?: {
    address?: string;
    updatedAt?: string;
  };
}
 
/* ================= SERVICE ================= */

export const truckService = {
  async getTrucks(): Promise<Truck[]> {
    const res = await apiClient.get(TRUCK_API.LIST);

    if (Array.isArray(res.data?.data)) {
      return res.data.data;
    }
    if (res.data?.data?.trucks) {
      return res.data.data.trucks;
    }
    return [];
  },

  async createTruck(payload: Partial<Truck> & {
    registrationUrl: string;
    insuranceUrl: string;
  }): Promise<Truck> {
    const res = await apiClient.post(TRUCK_API.CREATE, payload);
    return res.data.data;
  },

  async updateTruck(
    id: string,
    payload: Partial<Truck>
  ): Promise<Truck> {
    const res = await apiClient.patch(TRUCK_API.UPDATE(id), payload);
    return res.data.data;
  },

  async deleteTruck(id: string): Promise<void> {
    await apiClient.delete(TRUCK_API.DELETE(id));
  },

  // ✅ ADD THIS (IMPORTANT)
  async uploadTruckDocuments(
    formData: FormData
  ): Promise<TruckDocumentUploadResponse> {
    const res = await apiClient.post(
      TRUCK_API.UPLOAD_DOCUMENTS,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.data;
  },
};
