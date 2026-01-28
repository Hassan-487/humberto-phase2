

export const ALERT_API = {
  LIST: '/alerts',
  //ACKNOWLEDGE: (id: string) => `/alert/${id}/acknowledge`,
  RESOLVE: (id: string) => `/alert/${id}/resolve`,
  //STATS: '/alert/stats',
} as const;
