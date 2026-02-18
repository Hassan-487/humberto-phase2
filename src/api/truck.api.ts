export const TRUCK_API = {
  LIST: "/trucks",
  DETAILS: (id: string) => `/trucks/${id}`,
  CREATE: "/trucks",
  UPDATE: (id: string) => `/trucks/${id}`,
  DELETE: (id: string) => `/trucks/${id}`,
  STATUS: (id: string) => `/trucks/${id}/status`,
  LOCATION: (id: string) => `/trucks/${id}/location`,
  MAINTENANCE: (id: string) => `/trucks/${id}/maintenance`,
   UPLOAD_DOCUMENTS: "/documents/truck/upload",
} as const;

