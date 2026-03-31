

// import apiClient from "./apiClient";
// import { TRIP_API } from "@/api/trip.api";

// export interface Trip {
//   id: string;
//   tripId: string;
//   truck: string;
//   driver: string;
//   origin: string;
//   originPickupTime?: string;
//   destinationDeliveryTime?: string;
//   tripNumber?: string;
//   bookingNumber?: string;
//   customer?: string;
//   pickupTime?: string;
//   destinationTime?: string;
//   containers?: number;
//   LFD?: string;
//   schedule?: {
//     plannedStartTime?: string;
//     actualStartTime?: string;
//   };
//   destination: string;
//   status: string;
//   eta: string;
//   progress: number;
//   weight: number;
//   estimatedHours: number;
//   cargoDescription: string;
//   currentLocation?: {
//     latitude: number;
//     longitude: number;
//     address: string;
//   };
//   originLocation?: {
//     latitude: number;
//     longitude: number;
//     address: string;
//   };
//   destinationLocation?: {
//     latitude: number;
//     longitude: number;
//     address: string;
//   };
//   tripDocuments?: {
//     invoice1Url?: string;
//     invoice1UploadedAt?: string;
//     invoice2Url?: string;
//     invoice2UploadedAt?: string;
//     proofOfDeliveryUrl?: string;
//     proofOfDeliveryUploadedAt?: string;
//     deliveryPictureUrl?: string;
//     deliveryPictureUploadedAt?: string;
//   };
//   // AI METRICS
//   aiCurrentSpeed: number;
//   aiDistanceRemaining: number;
//   aiAverageSpeed: number;
//   aiMovementDetected: boolean;
//   aiEstimatedArrivalHuman: string;
//   aiEstimatedArrivalTime: string;
//   aiLastUpdated: string;
//   aiOriginToDestinationTotal: number;
//   driverStatus: string;
//   drivingMetrics: {
//     totalDrivingTime: number;
//     averageSpeed: number;
//     maxSpeed: number;
//     totalDistanceCovered: number;
//   };
// }

// const extractCity = (address: string) => {
//   if (!address) return "N/A";
//   const parts = address.split(",");
//   const clean = parts
//     .map((p) => p.trim())
//     .find((p) => isNaN(Number(p[0])));
//   return clean || parts[0];
// };

// const mapBackendTrip = (t: any): Trip => {
//   const id = t._id || t.id;
//   const firstContainer = t.containers?.[0];

//   return {
//     id,
//     tripNumber: t.tripNumber || "-",
//     bookingNumber: t.internalTripNumber || "-",
//     customer: firstContainer?.customerName || "N/A",
//     pickupTime: firstContainer?.pickupDate
//       ? new Date(firstContainer.pickupDate).toLocaleDateString()
//       : "-",
//     destinationTime: firstContainer?.deliveryDate
//       ? new Date(firstContainer.deliveryDate).toLocaleDateString()
//       : "-",
//     containers: t.containers?.length || 0,
//     LFD: "-",
//     tripId: t.tripNumber || `TRP-${id.slice(-6).toUpperCase()}`,
//     truck: t.truck?.truckNumber || t.truck?.licensePlate || "N/A",
//     driver: t.driver
//       ? `${t.driver.firstName} ${t.driver.lastName}`
//       : "Unassigned",
//     origin: extractCity(t.origin),
//     destination: extractCity(t.destination),
//     originPickupTime: firstContainer?.pickupDate,
//     destinationDeliveryTime: firstContainer?.deliveryDate,
//     schedule: {
//       plannedStartTime: t.schedule?.plannedStartTime,
//       actualStartTime: t.schedule?.actualStartTime,
//     },
//     status: t.status?.toLowerCase() || "scheduled",
//     eta: t.aiEstimatedArrivalHuman || "N/A",
//     progress:
//       typeof t.aiProgressPercentage === "number"
//         ? Math.min(100, Math.max(0, t.aiProgressPercentage))
//         : 0,
//     currentLocation: t.currentLocation,
//     originLocation: t.originLocation,
//     destinationLocation: t.destinationLocation,
//     weight: t.weight || 0,
//     estimatedHours: t.estimatedHours || 0,
//     cargoDescription: t.cargoDescription || "N/A",
//     aiCurrentSpeed: t.aiCurrentSpeed || 0,
//     aiAverageSpeed: t.aiAverageSpeed || 0,
//     aiDistanceRemaining: t.aiDistanceRemaining || 0,
//     aiMovementDetected: t.aiMovementDetected || false,
//     aiEstimatedArrivalHuman: t.aiEstimatedArrivalHuman || "Calculating...",
//     aiEstimatedArrivalTime: t.aiEstimatedArrivalTime || "",
//     aiLastUpdated: t.aiLastUpdated || "",
//     aiOriginToDestinationTotal: t.aiOriginToDestinationTotal || 0,
//     driverStatus: t.driverStatus || "unknown",
//     tripDocuments: t.tripDocuments || {},
//     drivingMetrics: {
//       totalDrivingTime: t.drivingMetrics?.totalDrivingTime || 0,
//       averageSpeed: t.drivingMetrics?.averageSpeed || 0,
//       maxSpeed: t.drivingMetrics?.maxSpeed || 0,
//       totalDistanceCovered: t.drivingMetrics?.totalDistanceCovered || 0,
//     },
//   };
// };

// export const tripService = {
//   // ─────────────────────────────────────────────────────────────────────────
//   // Core CRUD
//   // ─────────────────────────────────────────────────────────────────────────

//   async getTrips(): Promise<Trip[]> {
//     const res = await apiClient.get(TRIP_API.LIST);
//     return (res.data.data || []).map(mapBackendTrip);
//   },

//   async createTrip(payload: any) {
//     const res = await apiClient.post(TRIP_API.CREATE, payload);
//     return res.data.data;
//   },

//   async updateTrip(id: string, payload: any) {
//     const res = await apiClient.patch(TRIP_API.UPDATE(id), payload);
//     return mapBackendTrip(res.data.data);
//   },

//   async cancelTrip(id: string) {
//     const res = await apiClient.delete(TRIP_API.CANCEL(id));
//     return res.data.data;
//   },

//   async deleteTrip(id: string) {
//     return await apiClient.delete(TRIP_API.DELETE(id));
//   },

//   // ─────────────────────────────────────────────────────────────────────────
//   // M2 – Load Assignment
//   // ─────────────────────────────────────────────────────────────────────────

//   async assignTrip(id: string, payload: any) {
//     const res = await apiClient.patch(TRIP_API.ASSIGN(id), payload);
//     return res.data.data;
//   },

//   // ─────────────────────────────────────────────────────────────────────────
//   // M3 – Expense Pre-Assignment
//   // ─────────────────────────────────────────────────────────────────────────

//   async addPreExpenses(id: string, payload: any) {
//     const res = await apiClient.patch(TRIP_API.PRE_EXPENSE(id), payload);
//     return res.data.data;
//   },

//   // ─────────────────────────────────────────────────────────────────────────
//   // M4 – Driver Acceptance / Trip Start Documents (admin fallback upload)
//   // ─────────────────────────────────────────────────────────────────────────

//   async uploadStartDocuments(formData: FormData) {
//     const res = await apiClient.post(TRIP_API.START_DOCUMENTS, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return res.data.data;
//   },

//   // ─────────────────────────────────────────────────────────────────────────
//   // M7 – Delivery / POD  (works when trip is IN_TRANSIT or REACHED)
//   // ─────────────────────────────────────────────────────────────────────────

//   async recordDelivery(
//     id: string,
//     payload: {
//       containers: {
//         containerIndex: number;
//         actualDeliveryDate: string;
//         actualDeliveryHour: string;
//         podPhotos?: { url: string; caption?: string }[];
//       }[];
//       driverEndTrip: boolean;
//     }
//   ) {
//     const res = await apiClient.patch(TRIP_API.DELIVERY(id), payload);
//     return res.data.data;
//   },

//   // ─────────────────────────────────────────────────────────────────────────
//   // M8 – Customer Extra Costs (detention, dead freight, other per container)
//   // ─────────────────────────────────────────────────────────────────────────

//   async addExtraCosts(
//     id: string,
//     payload: {
//       containers: {
//         containerIndex: number;
//         detentionCharges?: number;
//         deadFreight?: number;
//         otherExtraCosts?: number;
//         extraCostNotes?: string;
//       }[];
//       tripLevelDetentionCharges?: number;
//       tripLevelDeadFreight?: number;
//       tripLevelOtherExtraCosts?: number;
//     }
//   ) {
//     const res = await apiClient.patch(TRIP_API.EXTRA_COSTS(id), payload);
//     return res.data.data;
//   },

//   // ─────────────────────────────────────────────────────────────────────────
//   // M9 – Empty Container Return
//   // ─────────────────────────────────────────────────────────────────────────

//   async recordContainerReturn(
//     id: string,
//     payload: {
//       containers: {
//         containerIndex: number;
//         deadFreight: boolean;
//         lastFreeDay: string;
//         emptyReturnDate: string;
//         emptyReturnHour: string;
//         portTerminalName: string;
//         portTerminalLocation?: {
//           latitude: number;
//           longitude: number;
//           address: string;
//           locationName?: string;
//         };
//         emptyReturnCarrier?: string;
//         emptyReturnTruckNumber?: string;
//       }[];
//       companyTripEndDate: string;
//       companyTripEndHour: string;
//     }
//   ) {
//     const res = await apiClient.patch(TRIP_API.CONTAINER_RETURN(id), payload);
//     return res.data.data;
//   },

//   // ─────────────────────────────────────────────────────────────────────────
//   // M10 – Operational Additional Costs
//   // ─────────────────────────────────────────────────────────────────────────

//   async addAdditionalCosts(
//     id: string,
//     payload: {
//       localFreightFee?: number;
//       localFreightLocation?: string;
//       localCarrierName?: string;
//       containerHandlingFee?: number;
//       roadServiceCost?: number;
//       roadServiceCompanyName?: string;
//       roadServiceDescription?: string;
//     }
//   ) {
//     const res = await apiClient.patch(TRIP_API.ADDITIONAL_COSTS(id), payload);
//     return res.data.data;
//   },

//   // ─────────────────────────────────────────────────────────────────────────
//   // M11 – Actual Trip Expenses  (works after trip is delivered or completed)
//   // ─────────────────────────────────────────────────────────────────────────

//   async recordActualExpenses(
//     id: string,
//     payload: {
//       realDiesel?: number;
//       realDef?: number;
//       realCashTolls?: number;
//       realDriverFood?: number;
//       additionalDriverExpenses?: number;
//       additionalExpenseNotes?: string;
//     }
//   ) {
//     const res = await apiClient.patch(TRIP_API.ACTUAL_EXPENSES(id), payload);
//     return res.data.data;
//   },

//   // ─────────────────────────────────────────────────────────────────────────
//   // M12 – Driver Wage
//   // ─────────────────────────────────────────────────────────────────────────

//   async recordDriverWage(
//     id: string,
//     payload: {
//       baseWageOverride?: number;
//       imssDeduction?: number;
//       infonavitDeduction?: number;
//       taxDeductions?: number;
//       driverExtraExpenses?: number;
//     }
//   ) {
//     const res = await apiClient.patch(TRIP_API.DRIVER_WAGE(id), payload);
//     return res.data.data;
//   },

//   // ─────────────────────────────────────────────────────────────────────────
//   // M13 – Settlement & Invoicing
//   // ─────────────────────────────────────────────────────────────────────────

//   async recordSettlement(
//     id: string,
//     payload: {
//       taxRate: number;
//       creditTermsDays?: number;
//       dueDate?: string;
//     }
//   ) {
//     const res = await apiClient.patch(TRIP_API.SETTLEMENT(id), payload);
//     return res.data.data;
//   },

//   // ─────────────────────────────────────────────────────────────────────────
//   // Documents
//   // ─────────────────────────────────────────────────────────────────────────

//   async uploadDocuments(formData: FormData) {
//     const res = await apiClient.post(TRIP_API.UPLOAD_DOCUMENTS, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return res.data.data;
//   },
// };

// export const uploadTripDocuments = async (formData: FormData) => {
//   const res = await apiClient.post(TRIP_API.UPLOAD_DOCUMENTS, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return res.data.data;
// };



import apiClient from "./apiClient";
import { TRIP_API } from "@/api/trip.api";

export interface Trip {
  id: string;
  tripId: string;
  truck: string;
  driver: string;
  origin: string;
  originPickupTime?: string;
  destinationDeliveryTime?: string;
  tripNumber?: string;
  bookingNumber?: string;
  customer?: string;
  pickupTime?: string;
  destinationTime?: string;
  containers?: any;
  LFD?: string;
  schedule?: {
    plannedStartTime?: string;
    actualStartTime?: string;
  };
  destination: string;
  status: string;
  eta: string;
  progress: number;
  weight: number;
  estimatedHours: number;
  cargoDescription: string;
  currentLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  originLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  destinationLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  tripDocuments?: {
    invoice1Url?: string;
    invoice1UploadedAt?: string;
    invoice2Url?: string;
    invoice2UploadedAt?: string;
    proofOfDeliveryUrl?: string;
    proofOfDeliveryUploadedAt?: string;
    deliveryPictureUrl?: string;
    deliveryPictureUploadedAt?: string;
  };
  // AI METRICS
  aiCurrentSpeed: number;
  aiDistanceRemaining: number;
  aiAverageSpeed: number;
  aiMovementDetected: boolean;
  aiEstimatedArrivalHuman: string;
  aiEstimatedArrivalTime: string;
  aiLastUpdated: string;
  aiOriginToDestinationTotal: number;
  driverStatus: string;
  drivingMetrics: {
    totalDrivingTime: number;
    averageSpeed: number;
    maxSpeed: number;
    totalDistanceCovered: number;
  };

  // ── Module fields ──────────────────────────────────────────────────
  planning?: {
    tripType?: string;
    trailerMode?: string;
    trailerType?: string;
    pickupDate?: string;
    pickupHour?: string;
    deliveryDate?: string;
    deliveryHour?: string;
    tripDistance?: number;
    tripPrice?: number;
    pickupAddress?: string;
    deliveryAddress?: string;
  };
  loadAssignment?: {
    carrier?: string;
    businessUnit?: string;
     truckId?: string;
  driverId?: string;
    tripPriceMXN?: number;
    internalTripNumber?: string;
    invoiceNumber?: string;
    dateOfAssignment?: string;
  };
  expensePreAssignment?: {
    estimatedDiesel?: number;
    estimatedDEF?: number;
    cashTolls?: number;
    driverFood?: number;
    otherExpenses?: { description: string; amount: number }[];
  };
  driverAcceptance?: {
    loadAcceptanceDate?: string;
    loadAcceptanceHour?: string;
    tripStartDate?: string;
    tripStartHour?: string;
    sleepBreakLog?: any[];
  };
  loadingData?: {
    arrivalDate?: string;
    arrivalHour?: string;
    containers?: any[];
  };
  monitoring?: {
    lastStatusUpdate?: string;
    statusUpdates?: any[];
    alerts?: any[];
    retellAiCalls?: any[];
  };
  unloading?: {
    deliveryEndDate?: string;
    deliveryEndHour?: string;
    podPhotos?: string[];
    notes?: string;
    tripEndedByDriver?: boolean;
    driverTripEndDate?: string;
    driverTripEndHour?: string;
  };
  customerExtraCosts?: {
    detentionCharges?: number;
    otherExtraCosts?: any[];
  };
  containerDelivery?: {
    deadFreight?: boolean;
    lastFreeDay?: string;
    containerDeliveryDate?: string;
    containerDeliveryHour?: string;
    portTerminalName?: string;
    portTerminalLocation?: string;
    carrier?: string;
    truckNumber?: string;
    tripEndDate?: string;
    tripEndHour?: string;
  };
  tripExpense?: {
    diesel?: number;
    def?: number;
    tolls?: number;
    food?: number;
    additionalDriverExpenses?: number;
    additionalExpenseNotes?: string;
  };
  driverWages?: {
    baseWage?: number;
    imss?: number;
    infonavit?: number;
    taxes?: number;
    driverExtraExpenses?: number;
    finalWage?: number;
  };
  settlement?: {
    taxApplied?: number;
    creditTermsDays?: number;
    dueDate?: string;
    paymentRemindersSent?: number;
    invoiceGenerated?: boolean;
    adminApproved?: boolean;
  };
  additionalCosts?: {
    localFreightFee?: number;
    localFreightLocation?: string;
    localCarrierName?: string;
    containerHandlingCompany?: string;
    roadServiceCost?: number;
    roadServiceCompany?: string;
    roadServiceDescription?: string;
  };
}

const extractCity = (address: string) => {
  if (!address) return "N/A";
  const parts = address.split(",");
  const clean = parts.map((p) => p.trim()).find((p) => isNaN(Number(p[0])));
  return clean || parts[0];
};

const mapBackendTrip = (t: any): Trip => {
  const id = t._id || t.id;
  const firstContainer = t.containers?.[0];

  // ── planning ────────────────────────────────────────────────────────
  const planning = {
    tripType: t.tripType || firstContainer?.tripType || "ONE_WAY",
    trailerMode: t.trailerMode || "SINGLE",
    trailerType: t.trailerType || "CONTAINER",
    pickupDate: firstContainer?.pickupDate
      ? new Date(firstContainer.pickupDate).toISOString().split("T")[0]
      : "",
    pickupHour: firstContainer?.pickupHour || "",
    deliveryDate: firstContainer?.deliveryDate
      ? new Date(firstContainer.deliveryDate).toISOString().split("T")[0]
      : "",
    deliveryHour: firstContainer?.deliveryHour || "",
    tripDistance: t.tripDistanceKm || 0,
    tripPrice: t.tripPrice || t.assignment?.tripPrice || 0,
    pickupAddress: firstContainer?.pickupAddress || t.origin || "",
    deliveryAddress: firstContainer?.deliveryAddress || t.destination || "",
  };

  // ── loadAssignment ──────────────────────────────────────────────────
  const assignment = t.assignment || {};
  const loadAssignment = {
    carrier: assignment.carrierType === "EXTERNAL" ? "External" : "Internal",
    businessUnit: assignment.businessUnit || "",
    truckNumber: t.truck?.truckNumber || t.truck?.licensePlate || assignment.truckId || "",
    driver: t.driver
      ? `${t.driver.firstName || ""} ${t.driver.lastName || ""}`.trim()
      : assignment.driverId || "",
    tripPriceMXN: assignment.tripPrice || 0,
    internalTripNumber: assignment.internalTripNumber || t.tripNumber || "",
    invoiceNumber: assignment.assignmentInvoice || "",
    dateOfAssignment: assignment.assignedAt
      ? new Date(assignment.assignedAt).toISOString().split("T")[0]
      : "",
  };

  // ── expensePreAssignment ────────────────────────────────────────────
  const preExp = t.preExpenses || t.estimatedExpenses || {};
  const expensePreAssignment = {
    estimatedDiesel: preExp.estimatedDiesel || 0,
    estimatedDEF: preExp.estimatedDef || 0,
    cashTolls: preExp.estimatedCashTolls || 0,
    driverFood: preExp.estimatedDriverFood || 0,
    otherExpenses: preExp.notes
      ? preExp.notes
          .split(",")
          .filter(Boolean)
          .map((note: string) => {
            const parts = note.split(":");
            return {
              description: parts[0]?.trim() || note.trim(),
              amount: parseFloat(parts[1]) || 0,
            };
          })
      : [],
  };

  // ── driverAcceptance ────────────────────────────────────────────────
  const da = t.driverAcceptance || {};
  const driverAcceptance = {
    loadAcceptanceDate: da.loadAcceptanceDate
      ? new Date(da.loadAcceptanceDate).toISOString().split("T")[0]
      : "",
    loadAcceptanceHour: da.loadAcceptanceHour || "",
    tripStartDate: da.tripStartDate
      ? new Date(da.tripStartDate).toISOString().split("T")[0]
      : t.schedule?.actualStartTime
      ? new Date(t.schedule.actualStartTime).toISOString().split("T")[0]
      : "",
    tripStartHour: da.tripStartHour || "",
    sleepBreakLog: da.sleepBreakLog || [],
  };

  // ── loadingData ─────────────────────────────────────────────────────
  const ld = t.loadingData || {};
  const loadingData = {
    arrivalDate: ld.arrivalDate
      ? new Date(ld.arrivalDate).toISOString().split("T")[0]
      : "",
    arrivalHour: ld.arrivalHour || "",
    containers: (t.containers || []).map((c: any, i: number) => ({
      containerNumber: c.containerNumber || "",
      sealNumber: c.sealNumber || ld.containers?.[i]?.sealNumber || "",
      customer: c.customerName || "",
      photos: c.photos || [],
    })),
  };

  // ── monitoring ──────────────────────────────────────────────────────
  const mon = t.monitoring || {};
  const monitoring = {
    lastStatusUpdate: t.aiLastUpdated || mon.lastStatusUpdate || "",
    statusUpdates: mon.statusUpdates || [],
    alerts: mon.alerts || [],
    retellAiCalls: mon.retellAiCalls || [],
  };

  // ── unloading ───────────────────────────────────────────────────────
  const unl = t.delivery || t.unloading || {};
  const firstDeliveredContainer = unl.containers?.[0] || {};
  const unloading = {
    deliveryEndDate: firstDeliveredContainer.actualDeliveryDate
      ? new Date(firstDeliveredContainer.actualDeliveryDate).toISOString().split("T")[0]
      : "",
    deliveryEndHour: firstDeliveredContainer.actualDeliveryHour || "",
    podPhotos: (firstDeliveredContainer.podPhotos || []).map((p: any) => p.url || p),
    notes: unl.notes || "",
    tripEndedByDriver: unl.driverEndTrip || false,
    driverTripEndDate: "",
    driverTripEndHour: "",
  };

  // ── customerExtraCosts ──────────────────────────────────────────────
  const ec = t.extraCosts || {};
  const customerExtraCosts = {
    detentionCharges: ec.tripLevelDetentionCharges || 0,
    otherExtraCosts: ec.containers
      ? ec.containers.flatMap((c: any) =>
          c.otherExtraCosts > 0
            ? [{ description: `Container ${c.containerIndex + 1}`, amount: c.otherExtraCosts }]
            : []
        )
      : [],
  };

  // ── containerDelivery ───────────────────────────────────────────────
  const cr = t.containerReturn || {};
  const firstReturn = cr.containers?.[0] || {};
  const containerDelivery = {
    deadFreight: firstReturn.deadFreight || false,
    lastFreeDay: firstReturn.lastFreeDay
      ? new Date(firstReturn.lastFreeDay).toISOString().split("T")[0]
      : "",
    containerDeliveryDate: firstReturn.emptyReturnDate || "",
    containerDeliveryHour: firstReturn.emptyReturnHour || "",
    portTerminalName: firstReturn.portTerminalName || "",
    portTerminalLocation: firstReturn.portTerminalLocation?.address || "",
    carrier: firstReturn.emptyReturnCarrier || "Internal",
    truckNumber: firstReturn.emptyReturnTruckNumber || "",
    tripEndDate: cr.companyTripEndDate || "",
    tripEndHour: cr.companyTripEndHour || "",
  };

  // ── tripExpense ─────────────────────────────────────────────────────
  const ae = t.actualExpenses || t.realExpenses || {};
  const tripExpense = {
    diesel: ae.realDiesel || 0,
    def: ae.realDef || 0,
    tolls: ae.realCashTolls || 0,
    food: ae.realDriverFood || 0,
    additionalDriverExpenses: ae.additionalDriverExpenses || 0,
    additionalExpenseNotes: ae.additionalExpenseNotes || "",
  };

  // ── driverWages ─────────────────────────────────────────────────────
  const dw = t.driverWage || t.wage || {};
  const baseWage = dw.baseWageOverride || dw.baseWage || 0;
  const imss = dw.imssDeduction || 0;
  const infonavit = dw.infonavitDeduction || 0;
  const taxes = dw.taxDeductions || 0;
  const driverExtraExpenses = dw.driverExtraExpenses || 0;
  const driverWages = {
    baseWage,
    imss,
    infonavit,
    taxes,
    driverExtraExpenses,
    finalWage: baseWage - imss - infonavit - taxes - driverExtraExpenses,
  };

  // ── settlement ──────────────────────────────────────────────────────
  const stl = t.settlement || {};
  const settlement = {
    taxApplied: stl.taxRate ? stl.taxRate * 100 : 16,
    creditTermsDays: stl.creditTermsDays || 30,
    dueDate: stl.dueDate
      ? new Date(stl.dueDate).toISOString().split("T")[0]
      : "",
    paymentRemindersSent: stl.paymentRemindersSent || 0,
    invoiceGenerated: stl.invoiceGenerated || false,
    adminApproved: stl.adminApproved || false,
  };

  // ── additionalCosts ─────────────────────────────────────────────────
  const ac = t.additionalCosts || {};
  const additionalCosts = {
    localFreightFee: ac.localFreightFee || 0,
    localFreightLocation: ac.localFreightLocation || "",
    localCarrierName: ac.localCarrierName || "",
    containerHandlingCompany: ac.containerHandlingCompany || "",
    roadServiceCost: ac.roadServiceCost || 0,
    roadServiceCompany: ac.roadServiceCompanyName || "",
    roadServiceDescription: ac.roadServiceDescription || "",
  };

  return {
    id,
    tripNumber: t.tripNumber || "-",
    bookingNumber: t.internalTripNumber || assignment.internalTripNumber || "-",
    customer: firstContainer?.customerName || "N/A",
    pickupTime: firstContainer?.pickupDate
      ? new Date(firstContainer.pickupDate).toLocaleDateString()
      : "-",
    destinationTime: firstContainer?.deliveryDate
      ? new Date(firstContainer.deliveryDate).toLocaleDateString()
      : "-",
    containers: t.containers?.length || 0,
    LFD: "-",
    tripId: t.tripNumber || `TRP-${id.slice(-6).toUpperCase()}`,
    truck: t.truck?.truckNumber || t.truck?.licensePlate || assignment.truckId || "N/A",
    driver: t.driver
      ? `${t.driver.firstName || ""} ${t.driver.lastName || ""}`.trim()
      : "Unassigned",
    origin: extractCity(t.origin),
    destination: extractCity(t.destination),
    originPickupTime: firstContainer?.pickupDate,
    destinationDeliveryTime: firstContainer?.deliveryDate,
    schedule: {
      plannedStartTime: t.schedule?.plannedStartTime,
      actualStartTime: t.schedule?.actualStartTime,
    },
    status: t.status?.toLowerCase() || "scheduled",
    eta: t.aiEstimatedArrivalHuman || "N/A",
    progress:
      typeof t.aiProgressPercentage === "number"
        ? Math.min(100, Math.max(0, t.aiProgressPercentage))
        : 0,
    currentLocation: t.currentLocation,
    originLocation: t.originLocation,
    destinationLocation: t.destinationLocation,
    weight: t.weight || 0,
    estimatedHours: t.estimatedHours || 0,
    cargoDescription: t.cargoDescription || "N/A",
    aiCurrentSpeed: t.aiCurrentSpeed || 0,
    aiAverageSpeed: t.aiAverageSpeed || 0,
    aiDistanceRemaining: t.aiDistanceRemaining || 0,
    aiMovementDetected: t.aiMovementDetected || false,
    aiEstimatedArrivalHuman: t.aiEstimatedArrivalHuman || "Calculating...",
    aiEstimatedArrivalTime: t.aiEstimatedArrivalTime || "",
    aiLastUpdated: t.aiLastUpdated || "",
    aiOriginToDestinationTotal: t.aiOriginToDestinationTotal || 0,
    driverStatus: t.driverStatus || "unknown",
    tripDocuments: t.tripDocuments || {},
    drivingMetrics: {
      totalDrivingTime: t.drivingMetrics?.totalDrivingTime || 0,
      averageSpeed: t.drivingMetrics?.averageSpeed || 0,
      maxSpeed: t.drivingMetrics?.maxSpeed || 0,
      totalDistanceCovered: t.drivingMetrics?.totalDistanceCovered || 0,
    },
    // module fields
    planning,
    loadAssignment,
    expensePreAssignment,
    driverAcceptance,
    loadingData,
    monitoring,
    unloading,
    customerExtraCosts,
    containerDelivery,
    tripExpense,
    driverWages,
    settlement,
    additionalCosts,
  };
};

export const tripService = {
  async getTrips(): Promise<Trip[]> {
    const res = await apiClient.get(TRIP_API.LIST);
    return (res.data.data || []).map(mapBackendTrip);
  },

  async createTrip(payload: any) {
    const res = await apiClient.post(TRIP_API.CREATE, payload);
    return res.data.data;
  },

  async updateTrip(id: string, payload: any) {
    const res = await apiClient.patch(TRIP_API.UPDATE(id), payload);
    return mapBackendTrip(res.data.data);
  },

  async cancelTrip(id: string) {
    const res = await apiClient.delete(TRIP_API.CANCEL(id));
    return res.data.data;
  },

  async deleteTrip(id: string) {
    return await apiClient.delete(TRIP_API.DELETE(id));
  },

  async assignTrip(id: string, payload: any) {
    const res = await apiClient.patch(TRIP_API.ASSIGN(id), payload);
    return res.data.data;
  },

  async addPreExpenses(id: string, payload: any) {
    const res = await apiClient.patch(TRIP_API.PRE_EXPENSE(id), payload);
    return res.data.data;
  },

  async uploadStartDocuments(formData: FormData) {
    const res = await apiClient.post(TRIP_API.START_DOCUMENTS, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  },

  async recordDelivery(
    id: string,
    payload: {
      containers: {
        containerIndex: number;
        actualDeliveryDate: string;
        actualDeliveryHour: string;
        podPhotos?: { url: string; caption?: string }[];
      }[];
      driverEndTrip: boolean;
    }
  ) {
    const res = await apiClient.patch(TRIP_API.DELIVERY(id), payload);
    return res.data.data;
  },

  async addExtraCosts(
    id: string,
    payload: {
      containers: {
        containerIndex: number;
        detentionCharges?: number;
        deadFreight?: number;
        otherExtraCosts?: number;
        extraCostNotes?: string;
      }[];
      tripLevelDetentionCharges?: number;
      tripLevelDeadFreight?: number;
      tripLevelOtherExtraCosts?: number;
    }
  ) {
    const res = await apiClient.patch(TRIP_API.EXTRA_COSTS(id), payload);
    return res.data.data;
  },

  async recordContainerReturn(
    id: string,
    payload: {
      containers: {
        containerIndex: number;
        deadFreight: boolean;
        lastFreeDay: string;
        emptyReturnDate: string;
        emptyReturnHour: string;
        portTerminalName: string;
        portTerminalLocation?: {
          latitude: number;
          longitude: number;
          address: string;
          locationName?: string;
        };
        emptyReturnCarrier?: string;
        emptyReturnTruckNumber?: string;
      }[];
      companyTripEndDate: string;
      companyTripEndHour: string;
    }
  ) {
    const res = await apiClient.patch(TRIP_API.CONTAINER_RETURN(id), payload);
    return res.data.data;
  },

  async addAdditionalCosts(
    id: string,
    payload: {
      localFreightFee?: number;
      localFreightLocation?: string;
      localCarrierName?: string;
      containerHandlingFee?: number;
      roadServiceCost?: number;
      roadServiceCompanyName?: string;
      roadServiceDescription?: string;
    }
  ) {
    const res = await apiClient.patch(TRIP_API.ADDITIONAL_COSTS(id), payload);
    return res.data.data;
  },

  async recordActualExpenses(
    id: string,
    payload: {
      realDiesel?: number;
      realDef?: number;
      realCashTolls?: number;
      realDriverFood?: number;
      additionalDriverExpenses?: number;
      additionalExpenseNotes?: string;
    }
  ) {
    const res = await apiClient.patch(TRIP_API.ACTUAL_EXPENSES(id), payload);
    return res.data.data;
  },

  async recordDriverWage(
    id: string,
    payload: {
      baseWageOverride?: number;
      imssDeduction?: number;
      infonavitDeduction?: number;
      taxDeductions?: number;
      driverExtraExpenses?: number;
    }
  ) {
    const res = await apiClient.patch(TRIP_API.DRIVER_WAGE(id), payload);
    return res.data.data;
  },

  async recordSettlement(
    id: string,
    payload: {
      taxRate: number;
      creditTermsDays?: number;
      dueDate?: string;
    }
  ) {
    const res = await apiClient.patch(TRIP_API.SETTLEMENT(id), payload);
    return res.data.data;
  },

  async uploadDocuments(formData: FormData) {
    const res = await apiClient.post(TRIP_API.UPLOAD_DOCUMENTS, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  },
};

export const uploadTripDocuments = async (formData: FormData) => {
  const res = await apiClient.post(TRIP_API.UPLOAD_DOCUMENTS, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};