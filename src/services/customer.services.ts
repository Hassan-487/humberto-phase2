import apiClient from "@/services/apiClient";
import { CUSTOMER_API } from "@/api/customer.api";

/* ================= TYPES ================= */

export interface CustomerDocumentUploadResponse {
  rfc?: { url: string; fileName: string };
  serviceContract?: { url: string; fileName: string };
  specialPermit?: { url: string; fileName: string };
}

export interface Customer {
  _id: string;
  legalName: string;
  businessName?: string;
  rfc: string;
  customerType: "INDIVIDUAL" | "COMPANY";

  contactPersonName?: string;
  contactPhone?: string;
  contactEmail?: string;
  whatsappNumber: string;

  paymentTermsDays?: number;
  currency?: string;

  documents?: {
    rfcUrl?: string;
    serviceContractUrl?: string;
    specialPermitUrl?: string;
  };

  status?: string;
}

/* ================= SERVICE ================= */

export const customerService = {
  async getCustomers(): Promise<Customer[]> {
    const res = await apiClient.get(CUSTOMER_API.LIST);

    if (Array.isArray(res.data?.data)) return res.data.data;
    if (res.data?.data?.customers) return res.data.data.customers;

    return [];
  },

  async createCustomer(payload: any): Promise<Customer> {
    const formattedPayload = {
      legalName: payload.legalName,
      rfc: payload.rfc,

      // ✅ FIX: enforce correct enum
      customerType:
        payload.customerType?.toUpperCase() === "INDIVIDUAL"
          ? "INDIVIDUAL"
          : "COMPANY",

      contactPersonName: payload.contactPerson,
      contactPhone: payload.contactNumber,
      contactEmail: payload.email,

      // ✅ REQUIRED FIELD
      whatsappNumber: payload.whatsappNumber || payload.contactNumber,

      businessUnit: payload.businessName,
      paymentTermsDays: parseInt(payload.paymentTerms) || 30,
      currency: payload.currency,

      // ✅ IMPORTANT: NEVER send empty strings
      rfcUrl: payload.documents?.rfcUrl || undefined,
      serviceContractUrl:
        payload.documents?.contractUrl || undefined,
      specialPermitUrl:
        payload.documents?.permitUrl || undefined,
    };

    const res = await apiClient.post(
      CUSTOMER_API.CREATE,
      formattedPayload
    );

    return res.data.data;
  },

  async updateCustomer(id: string, payload: Partial<Customer>) {
    const res = await apiClient.patch(
      CUSTOMER_API.UPDATE(id),
      payload
    );
    return res.data.data;
  },

  async deleteCustomer(id: string) {
    await apiClient.delete(CUSTOMER_API.DELETE(id));
  },

  async uploadCustomerDocuments(
    formData: FormData
  ): Promise<CustomerDocumentUploadResponse> {
    const res = await apiClient.post(
      CUSTOMER_API.UPLOAD_DOCUMENTS,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return res.data.data;
  },
};