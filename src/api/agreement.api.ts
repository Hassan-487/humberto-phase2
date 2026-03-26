export const AGREEMENT_API = {
  LIST: "/agreements",
  DETAILS: (id: string) => `/agreements/${id}`,
  CREATE: "/agreements",
  UPDATE: (id: string) => `/agreements/${id}`,
  DELETE: (id: string) => `/agreements/${id}`,
} as const;