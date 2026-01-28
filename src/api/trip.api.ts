

export const TRIP_API = {
  LIST: "/trips",
  DETAILS: (id: string) => `/trips/${id}`,
  CREATE: "/trips",
  UPDATE: (id: string) => `/trips/${id}`,
  CANCEL: (id: string) => `/trips/${id}?action=cancel`,
  DELETE: (id: string) => `/trips/${id}?action=delete`,
  START: (id: string) => `/trips/${id}/start`,
  COMPLETE: (id: string) => `/trips/${id}/complete`,
  STOPS: (id: string) => `/trips/${id}/stops`,
  UPDATE_PROGRESS: (id: string) => `/trips/${id}/progress`,
  UPLOAD_DOCUMENTS: "/documents/trip/upload",
} as const;
