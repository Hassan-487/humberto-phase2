// export const TRIP_API = {
//   LIST: "/trips",
//   DETAILS: (id: string) => `/trips/${id}`,
//   CREATE: "/trips",
//   UPDATE: (id: string) => `/trips/${id}`,
//   CANCEL: (id: string) => `/trips/${id}?action=cancel`,
//   DELETE: (id: string) => `/trips/${id}?action=delete`,

//   // 🔥 NEW
//   ASSIGN: (id: string) => `/trips/${id}/assign`,
//   PRE_EXPENSE: (id: string) => `/trips/${id}/expenses/pre`,
//   START_DOCUMENTS: "/documents/trip/start-documents",

//   START: (id: string) => `/trips/${id}/start`,
//   COMPLETE: (id: string) => `/trips/${id}/complete`,

//   UPLOAD_DOCUMENTS: "/documents/trip/upload",
// } as const;

export const TRIP_API = {
  LIST: "/trips",
  DETAILS: (id: string) => `/trips/${id}`,
  CREATE: "/trips",
  UPDATE: (id: string) => `/trips/${id}`,
  CANCEL: (id: string) => `/trips/${id}?action=cancel`,
  DELETE: (id: string) => `/trips/${id}?action=delete`,

  // M2 – Load Assignment
  ASSIGN: (id: string) => `/trips/${id}/assign`,

  // M3 – Expense Pre-Assignment
  PRE_EXPENSE: (id: string) => `/trips/${id}/expenses/pre`,

  // M4 – Driver Acceptance / Trip Start Documents
  START_DOCUMENTS: "/documents/trip/start-documents",

  START: (id: string) => `/trips/${id}/start`,
  COMPLETE: (id: string) => `/trips/${id}/complete`,

  UPLOAD_DOCUMENTS: "/documents/trip/upload",

  // M8 – Customer Extra Costs (detention, dead freight, other)
  EXTRA_COSTS: (id: string) => `/trips/${id}/extra-costs`,

  // M10 – Operational Additional Costs (local freight, road service, etc.)
  ADDITIONAL_COSTS: (id: string) => `/trips/${id}/additional-costs`,

  // M7 – Delivery / POD  (works when trip is IN_TRANSIT or REACHED)
  DELIVERY: (id: string) => `/trips/${id}/delivery`,

  // M9 – Empty Container Return
  CONTAINER_RETURN: (id: string) => `/trips/${id}/container-return`,

  // M11 – Actual Trip Expenses  (works after trip is delivered or completed)
  ACTUAL_EXPENSES: (id: string) => `/trips/${id}/expenses/actual`,

  // M12 – Driver Wage
  DRIVER_WAGE: (id: string) => `/trips/${id}/driver-wage`,

  // M13 – Settlement & Invoicing
  SETTLEMENT: (id: string) => `/trips/${id}/settlement`,
} as const;