export const COMPANY_API = {
  LIST: "/companies",
  DETAILS: (id: string) => `/companies/${id}`,
  CREATE: "/companies",
  UPDATE: (id: string) => `/companies/${id}`,
  DELETE: (id: string) => `/companies/${id}`,

  UPLOAD_DOCUMENTS: "/documents/company/upload", // ✅ ADD THIS
} as const;