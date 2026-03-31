


import apiClient from "@/services/apiClient";
import { COMPANY_API } from "@/api/company.api";

/* ================= TYPES ================= */

export interface CompanyDocuments {
  rfcUrl?: string;
  rfcUploadedAt?: string;
  specialPermitUrl?: string;
  specialPermitUploadedAt?: string;
  insurancePolicyUrl?: string;
  insurancePolicyUploadedAt?: string;
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

  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;

  // Raw API shape
  CompanyDocuments?: CompanyDocuments;

  // Normalized (set by service layer)
  documents?: CompanyDocuments;
}

/* ================= NORMALIZE HELPER ================= */

function normalizeCompany(c: any): Company {
  return {
    ...c,
    // Always expose docs under `documents` regardless of raw key
    documents: c.CompanyDocuments || c.documents || {},
  };
}

/* ================= SERVICE ================= */

export const companyService = {

  /* 🔹 GET ALL */
  async getCompanies(): Promise<Company[]> {
    const res = await apiClient.get(COMPANY_API.LIST);

    const data = Array.isArray(res.data?.data)
      ? res.data.data
      : res.data?.data?.companies || [];

    return data.map(normalizeCompany);
  },

  /* 🔹 GET ONE */
  async getCompany(id: string): Promise<Company> {
    const res = await apiClient.get(COMPANY_API.DETAILS(id));
    return normalizeCompany(res.data?.data || res.data);
  },

  /* 🔹 CREATE */
  async createCompany(payload: any): Promise<Company> {
    const body = {
      legalName: payload.legalName,
      rfc: payload.rfc,
      Address: payload.Address,
      contactPersonName: payload.contactPersonName,
      whatsappNumber: payload.whatsappNumber,
      contactEmail: payload.contactEmail,
      status: payload.status || "active",
      totalTrucks: Number(payload.totalTrucks || 0),
      totalPrice: Number(payload.totalPrice || 0),
      notes: payload.notes,

      // API expects these at root level for create
      rfcUrl: payload.documents?.rfcUrl || undefined,
      specialPermitUrl: payload.documents?.permitUrl || undefined,
      insurancePolicyUrl: payload.documents?.insuranceUrl || undefined,
    };

    const res = await apiClient.post(COMPANY_API.CREATE, body);

    // API returns array in data
    const created = Array.isArray(res.data?.data)
      ? res.data.data[0]
      : res.data?.data;

    return normalizeCompany(created);
  },

  /* 🔹 UPDATE */
  async updateCompany(
    id: string,
    payload: Partial<Company> & any
  ): Promise<Company> {
    const body: any = {
      legalName: payload.legalName,
      rfc: payload.rfc,
      Address: payload.Address,
      contactPersonName: payload.contactPersonName,
      whatsappNumber: payload.whatsappNumber,
      contactEmail: payload.contactEmail,
      status: payload.status,
      totalTrucks: Number(payload.totalTrucks || 0),
      totalPrice: Number(payload.totalPrice || 0),
      notes: payload.notes,
      isActive: payload.isActive,

      // API expects these at root for PATCH
      rfcUrl: payload.documents?.rfcUrl || undefined,
      specialPermitUrl: payload.documents?.permitUrl || undefined,
      insurancePolicyUrl: payload.documents?.insuranceUrl || undefined,
    };

    // Strip undefined keys
    Object.keys(body).forEach((k) => body[k] === undefined && delete body[k]);

    const res = await apiClient.patch(COMPANY_API.UPDATE(id), body);
    return normalizeCompany(res.data?.data || res.data);
  },

  /* 🔹 DELETE */
  async deleteCompany(id: string): Promise<void> {
    await apiClient.delete(COMPANY_API.DELETE(id));
  },

  /* 🔹 UPLOAD DOCUMENTS */
  async uploadCompanyDocuments(formData: FormData): Promise<CompanyDocuments> {
    const res = await apiClient.post(
      COMPANY_API.UPLOAD_DOCUMENTS,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return res.data?.data || res.data;
  },
};