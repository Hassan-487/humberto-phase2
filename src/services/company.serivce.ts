import apiClient from "@/services/apiClient";
import { COMPANY_API } from "@/api/company.api";

/* ================= TYPES ================= */

export interface CompanyDocuments {
  rfcUrl?: string;
  specialPermitUrl?: string;
  insurancePolicyUrl?: string;
}

export interface Company {
  _id: string;
  legalName: string;
  rfc: string;
  Address: string;

  contactPersonName?: string;
  whatsappNumber?: string;
  contactEmail?: string;

  totalTrucks?: number;
  totalPrice?: number;

  status?: string;
  isActive?: boolean;
  notes?: string;

  CompanyDocuments?: CompanyDocuments;
}

/* ================= SERVICE ================= */

export const companyService = {
  /* 🔹 GET ALL */
  async getCompanies(): Promise<Company[]> {
    const res = await apiClient.get(COMPANY_API.LIST);

    // based on your response: :contentReference[oaicite:0]{index=0}
    if (Array.isArray(res.data?.data)) return res.data.data;
    if (res.data?.data?.companies) return res.data.data.companies;

    return [];
  },

  /* 🔹 CREATE */
  async createCompany(payload: any): Promise<Company> {
    const formattedPayload = {
      legalName: payload.legalName,
      rfc: payload.rfc,
      Address: payload.Address,

      contactPersonName: payload.contactPersonName,
      whatsappNumber: payload.whatsappNumber,
      contactEmail: payload.contactEmail,

      status: payload.status,
      totalTrucks: Number(payload.totalTrucks),
      totalPrice: Number(payload.totalPrice),
      notes: payload.notes,

      rfcUrl: payload.documents?.rfcUrl,
      specialPermitUrl: payload.documents?.permitUrl,
      insurancePolicyUrl: payload.documents?.insuranceUrl,
    };

    const res = await apiClient.post(COMPANY_API.CREATE, formattedPayload);
    return res.data.data;
  },

  /* 🔹 UPDATE */
  async updateCompany(
    id: string,
    payload: Partial<Company> & any
  ): Promise<Company> {
    const formattedPayload = {
      ...payload,

      rfcUrl: payload.documents?.rfcUrl || payload.rfcUrl,
      specialPermitUrl:
        payload.documents?.permitUrl || payload.specialPermitUrl,
      insurancePolicyUrl:
        payload.documents?.insuranceUrl || payload.insurancePolicyUrl,
    };

    const res = await apiClient.patch(
      COMPANY_API.UPDATE(id),
      formattedPayload
    );

    return res.data.data;
  },

  /* 🔹 DELETE */
  async deleteCompany(id: string): Promise<void> {
    await apiClient.delete(COMPANY_API.DELETE(id));
  },

  async uploadCompanyDocuments(formData: FormData) {
  const res = await apiClient.post(
    COMPANY_API.UPLOAD_DOCUMENTS,
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