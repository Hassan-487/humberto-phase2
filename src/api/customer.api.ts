export const CUSTOMER_API = {
  LIST: "/customers",
  DETAILS: (id: string) => `/customers/${id}`,
  CREATE: "/customers",
  UPDATE: (id: string) => `/customers/${id}`,
  DELETE: (id: string) => `/customers/${id}`,
  UPLOAD_DOCUMENTS: "/documents/customer/upload", // adjust if backend differs
} as const;