// tripStatusUtils.ts
// Status flow and module access control

export const TRIP_STATUSES = [
  "scheduled",
  "assigned",
  "started",
  "in_transit",
  "reached",
  "delivered",
  "closed",
  "invoiced",
  "paid",
  "outsourced",
] as const;

export type TripStatus = typeof TRIP_STATUSES[number];

export const STATUS_ORDER: Record<string, number> = {
  scheduled: 0,
  assigned: 1,
  outsourced: 1,
  started: 2,
  in_transit: 3,
  reached: 4,
  delivered: 5,
  closed: 6,
  invoiced: 7,
  paid: 8,
};

/** Returns true if a given status is at least as advanced as the required status */
export function statusAtLeast(current: string, required: string): boolean {
  return (STATUS_ORDER[current] ?? -1) >= (STATUS_ORDER[required] ?? 999);
}

/** Which modules are unlocked per status */
export const MODULE_UNLOCK_STATUS: Record<string, string> = {
  overview: "scheduled",       // Always visible
  loadAssignment: "scheduled", // M2 – after planning
  expensePreAssignment: "assigned", // M3
  driverAcceptance: "assigned",    // M4
  loadingData: "started",          // M5
  monitoring: "in_transit",        // M6
  unloading: "reached",            // M7
  customerExtraCosts: "reached",   // M8
  containerDelivery: "delivered",  // M9
  additionalCosts: "delivered",    // M10
  tripExpense: "closed",           // M11
  driverWages: "closed",           // M12
  settlement: "invoiced",          // M13
};

export const STATUS_BADGE_STYLES: Record<string, string> = {
  scheduled: "bg-blue-500/10 text-blue-600 border-blue-200",
  assigned: "bg-violet-500/10 text-violet-600 border-violet-200",
  outsourced: "bg-orange-400/10 text-orange-500 border-orange-200",
  started: "bg-cyan-500/10 text-cyan-600 border-cyan-200",
  in_transit: "bg-amber-500/10 text-amber-600 border-amber-200",
  reached: "bg-sky-500/10 text-sky-600 border-sky-200",
  delivered: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  closed: "bg-slate-400/10 text-slate-600 border-slate-300",
  invoiced: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
  paid: "bg-green-600/10 text-green-700 border-green-200",
};

export const STATUS_LABELS: Record<string, string> = {
  scheduled: "Scheduled",
  assigned: "Assigned",
  outsourced: "Outsourced",
  started: "Started",
  in_transit: "In Transit",
  reached: "Reached",
  delivered: "Delivered",
  closed: "Closed",
  invoiced: "Invoiced",
  paid: "Paid",
};

/** Next valid status transitions */
export const NEXT_STATUS: Record<string, string | null> = {
  scheduled: "assigned",
  assigned: "started",
  started: "in_transit",
  in_transit: "reached",
  reached: "delivered",
  delivered: "closed",
  closed: "invoiced",
  invoiced: "paid",
  paid: null,
  outsourced: null,
};