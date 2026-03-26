import apiClient from "@/services/apiClient";
import { AGREEMENT_API } from "@/api/agreement.api";

/* ================= TYPES ================= */

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  locationName: string;
}

export interface Agreement {
  _id: string;

  customer:
    | string
    | {
        _id: string;
        legalName: string;
        rfc: string;
        contactPhone: string;
        contactEmail: string;
      };

  originAddress: string;
  originLocation: Location;

  destinationAddress: string;
  destinationLocation: Location;

  tripEndAddress?: string;
  tripEndLocation?: Location;

  tripType: string;
  trailerMode: string;
  trailerType: string;

  tripDistanceKm: number;
  tripPrice: number;
}

/* ================= SERVICE ================= */

export const agreementService = {
  /* 🔹 GET ALL */
  async getAgreements(): Promise<Agreement[]> {
    const res = await apiClient.get(AGREEMENT_API.LIST);

    // based on your response :contentReference[oaicite:0]{index=0}
    if (Array.isArray(res.data?.data)) return res.data.data;
    if (res.data?.data?.agreements) return res.data.data.agreements;

    return [];
  },

  /* 🔹 GET SINGLE */
  async getAgreement(id: string): Promise<Agreement> {
    const res = await apiClient.get(AGREEMENT_API.DETAILS(id));
    return res.data.data;
  },

  /* 🔹 CREATE */
  async createAgreement(payload: Partial<Agreement>): Promise<Agreement> {
    const res = await apiClient.post(AGREEMENT_API.CREATE, payload);
    return res.data.data;
  },

  /* 🔹 UPDATE */
  async updateAgreement(
    id: string,
    payload: Partial<Agreement>
  ): Promise<Agreement> {
    const res = await apiClient.patch(
      AGREEMENT_API.UPDATE(id),
      payload
    );
    return res.data.data;
  },

  /* 🔹 DELETE */
  async deleteAgreement(id: string): Promise<void> {
    await apiClient.delete(AGREEMENT_API.DELETE(id));
  },
};