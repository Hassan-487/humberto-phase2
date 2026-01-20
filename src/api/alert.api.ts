export const ALERT_API = {
  LIST: "/alerts/active",
  DETAILS: (id: string) => `/alerts/${id}`,
  ACKNOWLEDGE: (id: string) => `/alerts/${id}/acknowledge`,
  RESOLVE: (id: string) => `/alerts/${id}/resolve`,
  DISMISS: (id: string) => `/alerts/${id}/ignore`,
  STATS: "/alerts/stats/summary",
} as const;