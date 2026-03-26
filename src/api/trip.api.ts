export const TRIP_API = {
  LIST: "/trips",
  DETAILS: (id: string) => `/trips/${id}`,
  CREATE: "/trips",
  UPDATE: (id: string) => `/trips/${id}`,
  CANCEL: (id: string) => `/trips/${id}?action=cancel`,
  DELETE: (id: string) => `/trips/${id}?action=delete`,

  // 🔥 NEW
  ASSIGN: (id: string) => `/trips/${id}/assign`,
  PRE_EXPENSE: (id: string) => `/trips/${id}/expenses/pre`,
  START_DOCUMENTS: "/documents/trip/start-documents",

  START: (id: string) => `/trips/${id}/start`,
  COMPLETE: (id: string) => `/trips/${id}/complete`,

  UPLOAD_DOCUMENTS: "/documents/trip/upload",
} as const;