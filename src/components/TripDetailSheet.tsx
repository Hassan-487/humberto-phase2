



// import { useTranslation } from "react-i18next";
// import {
//   MapPin,
//   Navigation,
//   Package,
//   Gauge,
//   Route,
//   MapPinned,
//   Clock,
//   Timer,
//   Activity,
//   History,
//   BarChart3,
// } from "lucide-react";
// import { Label } from "@/components/ui/label";
// import { LiveTripMap } from "@/components/LiveTripMap";

// interface TripProfileSheetProps {
//   selectedTrip: any;
//   getStatusBadgeStyles: (status: string) => string;
// }

// export function TripProfileSheet({
//   selectedTrip,
//   getStatusBadgeStyles,
// }: TripProfileSheetProps) {
//   const { t } = useTranslation();

//   if (!selectedTrip) return null;

//   const mexicoTimeOptions: Intl.DateTimeFormatOptions = {
//     dateStyle: "medium",
//     timeStyle: "short",
//     timeZone: "America/Mexico_City",
//   };

//   return (
//     <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none">
//       {/* GPS TRACKING */}
//       <section className="space-y-4">
//         <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
//           <MapPin className="h-4 w-4" /> {t("trips.liveTracking")}
//         </Label>

//         <div className="h-64 w-full relative">
//           {(() => {
//             const currentLocation = selectedTrip.currentLocation ?? selectedTrip.originLocation;
//             const hasCoords = currentLocation?.latitude !== undefined && currentLocation?.longitude !== undefined;

//             return hasCoords ? (
//               <LiveTripMap
//                 key={selectedTrip.tripId}
//                 current={{
//                   latitude: Number(currentLocation.latitude),
//                   longitude: Number(currentLocation.longitude),
//                 }}
//               />
//             ) : (
//               <div className="h-full w-full bg-muted rounded-lg flex items-center justify-center">
//                 <p className="text-xs text-muted-foreground">{t("trips.locationNotAvailable")}</p>
//               </div>
//             );
//           })()}
//         </div>
//       </section>

//       {/* LOCATION DETAILS */}
//       <section className="space-y-4 pt-2">
//         <Label className="font-bold uppercase text-[10px] tracking-widest text-primary">
//           {t("trips.locationDetails")}
//         </Label>
//         <div className="space-y-3">
//           {[
//             { label: t("trips.origin"), value: selectedTrip.originLocation?.address || selectedTrip.origin },
//             { label: t("trips.destination"), value: selectedTrip.destinationLocation?.address || selectedTrip.destination },
//             { label: t("trips.currentLocation"), value: selectedTrip.currentLocation?.address || selectedTrip.originLocation?.address },
//           ].map((item, i) => (
//             <div key={i} className="p-3 border rounded-lg bg-card">
//               <Label className="text-[10px] uppercase text-muted-foreground">{item.label}</Label>
//               <p className="text-sm font-semibold">{item.value || t("trips.notAvailable")}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* DRIVING METRICS */}
//       <section className="space-y-4 pt-4 border-t">
//         <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
//           <BarChart3 className="h-4 w-4" /> {t("trips.drivingMetrics")}
//         </Label>

//         <div className="grid grid-cols-2 gap-3">
//           <Metric
//             variant="blue"
//             icon={<Gauge className="h-3.5 w-3.5" />}
//             label={t("trips.currentSpeed")}
//             value={`${selectedTrip.aiCurrentSpeed ?? 0} km/h`}
//           />

//           <Metric
//             variant="emerald"
//             icon={<Route className="h-3.5 w-3.5" />}
//             label={t("trips.remainingDistance")}
//             value={`${selectedTrip.aiDistanceRemaining?.toFixed(1) ?? 0} km`}
//           />

//           <Metric
//             variant="orange"
//             icon={<MapPinned className="h-3.5 w-3.5" />}
//             label={t("trips.totalDistance")}
//             value={`${selectedTrip.aiOriginToDestinationTotal?.toFixed(1) ?? 0} km`}
//           />

//           {/* Actual Trip Start & Start Time Boxes */}
//           <div className="p-4 border rounded-xl bg-card col-span-2 space-y-3">
//             <div className="flex items-center gap-2">
//               <Navigation className="h-3.5 w-3.5 text-primary" />
//               <Label className="font-bold uppercase text-[10px] tracking-widest text-primary">
//                 {t("trips.actualTripStartedAt")}
//               </Label>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label className="text-[10px] uppercase text-muted-foreground">{t("trips.originPickupTime")}</Label>
//                 <p className="text-xs font-semibold">
//                   {selectedTrip.originPickupTime 
//                     ? new Date(selectedTrip.originPickupTime).toLocaleString("en-US", mexicoTimeOptions) 
//                     : t("trips.notAvailable")}
//                 </p>
//               </div>
//               <div>
//                 <Label className="text-[10px] uppercase text-muted-foreground">{t("trips.actualStartTime")}</Label>
//                 <p className="text-xs font-semibold">
//                   {selectedTrip.schedule?.actualStartTime 
//                     ? new Date(selectedTrip.schedule.actualStartTime).toLocaleString("en-US", mexicoTimeOptions) 
//                     : t("trips.notAvailable")}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <Metric
//             colSpan
//             label={t("trips.originalDeliveryTime")}
//             value={selectedTrip.destinationDeliveryTime 
//               ? new Date(selectedTrip.destinationDeliveryTime).toLocaleString("en-US", mexicoTimeOptions) 
//               : t("trips.notAvailable")}
//           />

//           <Metric
//             colSpan
//             variant="indigo"
//             icon={<Clock className="h-3.5 w-3.5" />}
//             label={t("trips.estimatedArrival")}
//             value={selectedTrip.aiEstimatedArrivalHuman || t("trips.calculating")}
//           />

//           <Metric
//             colSpan
//             icon={<Timer className="h-3.5 w-3.5" />}
//             label={t("trips.AIarrivalDateTime")}
//             value={selectedTrip.aiEstimatedArrivalTime 
//               ? new Date(selectedTrip.aiEstimatedArrivalTime).toLocaleString("en-US", mexicoTimeOptions) 
//               : t("trips.notAvailable")}
//           />

//           <Metric
//             colSpan
//             icon={<Activity className="h-3.5 w-3.5" />}
//             label={t("trips.movementStatus")}
//             value={selectedTrip.aiMovementDetected ? t("trips.vehicleMoving") : t("trips.vehicleStationary")}
//           />

//           <Metric
//             colSpan
//             icon={<History className="h-3.5 w-3.5" />}
//             label={t("trips.lastUpdatedLabel")}
//             className="bg-muted/30"
//             value={selectedTrip.aiLastUpdated 
//               ? new Date(selectedTrip.aiLastUpdated).toLocaleString("en-US", { ...mexicoTimeOptions, dateStyle: 'short', timeStyle: 'medium' }) 
//               : t("trips.noUpdatesYet")}
//           />
//         </div>
//       </section>
//     </div>
//   );
// }

// /* REUSABLE METRIC COMPONENT */
// function Metric({ icon, label, value, colSpan, variant, className }: any) {
//   const variants: any = {
//     blue: "bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 text-blue-700 dark:text-blue-400",
//     emerald: "bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 text-emerald-700 dark:text-emerald-400",
//     orange: "bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 text-orange-700 dark:text-orange-400",
//     indigo: "bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-900/20 text-indigo-700 dark:text-indigo-400",
//     default: "bg-card text-muted-foreground"
//   };

//   const activeVariant = variant ? variants[variant] : variants.default;

//   return (
//     <div className={`p-4 border rounded-xl ${colSpan ? "col-span-2" : ""} ${activeVariant} ${className}`}>
//       {label && (
//         <div className="flex items-center gap-2 mb-1">
//           {icon}
//           <Label className="text-[10px] font-bold uppercase tracking-tight opacity-80">
//             {label}
//           </Label>
//         </div>
//       )}
//       <p className={`font-semibold ${variant ? "text-lg font-bold" : "text-sm"} text-foreground`}>
//         {value}
//       </p>
//     </div>
//   );
// }