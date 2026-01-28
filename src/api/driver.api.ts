

import apiClient from "@/services/apiClient";

/* ================= TYPES ================= */

export interface Driver {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
  password: string;
  licenseNumber: string;
  licenseExpiry?: string;
    licenseUrl?: string;
  taxStatusCertificateUrl?: string;
   identityCardUrl?: string;
  employmentStatus: "active" | "inactive" | "on_leave";
  createdAt: string;
}

/* ================= API PATHS ================= */

export const DRIVER_API = {
  LIST: "/drivers",
  DETAILS: (id: string) => `/auth/drivers/${id}`,
  CREATE: "/auth/create-driver", // ✅ FIXED
  UPDATE: (id: string) => `/drivers/${id}`,
  DELETE: (authUser: string) => `/drivers/${authUser}`,
  UPLOAD_DOCUMENTS: "/documents/driver/upload",
};

/* ================= API METHODS ================= */

export const driverApi = {
  getDrivers: (params?: Record<string, any>) =>
    apiClient.get(DRIVER_API.LIST, { params }),

  getDriver: (id: string) =>
    apiClient.get(DRIVER_API.DETAILS(id)),

  createDriver: (payload: any) =>
    apiClient.post(DRIVER_API.CREATE, payload),

  updateDriver: (id: string, payload: Partial<Driver>) =>
    apiClient.patch(DRIVER_API.UPDATE(id), payload),

  deleteDriver: (id: string) =>
    apiClient.delete(DRIVER_API.DELETE(id)),

  uploadDriverDocuments: (formData: FormData) =>
    apiClient.post(DRIVER_API.UPLOAD_DOCUMENTS, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

