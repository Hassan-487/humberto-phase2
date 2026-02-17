
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
// import { Badge } from "@/components/ui/badge";
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

//   return (
//     <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none">
//       {/* 1. GPS TRACKING SECTION */}
//       <section className="space-y-4">
//         <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
//           <MapPin className="h-4 w-4" /> {t('trips.liveTracking')}
//         </Label>

//         <div className="h-64 w-full relative">
//           {(() => {
//             const currentLocation = selectedTrip.currentLocation ?? selectedTrip.originLocation;

//             const hasCoords =
//               currentLocation?.latitude !== undefined &&
//               currentLocation?.longitude !== undefined;

//             return hasCoords ? (
//               <LiveTripMap
//                 key={selectedTrip.tripNumber}
//                 current={{
//                   latitude: Number(currentLocation.latitude),
//                   longitude: Number(currentLocation.longitude),
//                 }}
//               />
//             ) : (
//               <div className="h-full w-full bg-muted rounded-lg flex items-center justify-center">
//                 <p className="text-xs text-muted-foreground">
//                   {t('trips.locationNotAvailable')}
//                 </p>
//               </div>
//             );
//           })()}
//         </div>
//       </section>

//       {/* LOCATION DETAILS */}
//       <section className="space-y-4 pt-2">
//         <Label className="font-bold uppercase text-[10px] tracking-widest text-primary">
//           {t('trips.locationDetails')}
//         </Label>

//         <div className="space-y-3">
//           <div className="p-3 border rounded-lg bg-card">
//             <Label className="text-[10px] uppercase text-muted-foreground">
//               {t('trips.origin')}
//             </Label>
//             <p className="text-sm font-semibold">
//               {selectedTrip.originLocation?.address ||
//                 selectedTrip.origin ||
//                 t('trips.notAvailable')}
//             </p>
//           </div>

//           <div className="p-3 border rounded-lg bg-card">
//             <Label className="text-[10px] uppercase text-muted-foreground">
//               {t('trips.destination')}
//             </Label>
//             <p className="text-sm font-semibold">
//               {selectedTrip.destinationLocation?.address ||
//                 selectedTrip.destination ||
//                 t('trips.notAvailable')}
//             </p>
//           </div>

//           <div className="p-3 border rounded-lg bg-card">
//             <Label className="text-[10px] uppercase text-muted-foreground">
//               {t('trips.currentLocation')}
//             </Label>
//             <p className="text-sm font-semibold">
//               {selectedTrip.currentLocation?.address ||
//                 selectedTrip.originLocation?.address ||
//                 t('trips.awaitingUpdate')}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ENHANCED DRIVING METRICS */}
//       <section className="space-y-4 pt-4 border-t">
//         <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
//           <BarChart3 className="h-4 w-4" /> {t('trips.drivingMetrics')}
//         </Label>

//         <div className="grid grid-cols-2 gap-3">
//           {/* Current Speed */}
//           <div className="p-4 border rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20">
//             <div className="flex items-center gap-2 mb-1">
//               <Gauge className="h-3.5 w-3.5 text-blue-600" />
//               <Label className="text-[10px] font-bold text-blue-700 dark:text-blue-400">{t('trips.currentSpeed')}</Label>
//             </div>
//             <p className="text-2xl font-black text-blue-900 dark:text-blue-300">
//               {selectedTrip.aiCurrentSpeed ?? 0}
//               <span className="text-xs font-normal ml-1">km/h</span>
//             </p>
//           </div>

//           {/* Distance Covered */}
//           <div className="p-4 border rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20">
//             <div className="flex items-center gap-2 mb-1">
//               <Route className="h-3.5 w-3.5 text-emerald-600" />
//               <Label className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">{t('trips.remainingDistance')}</Label>
//             </div>
//             <p className="text-2xl font-black text-emerald-900 dark:text-emerald-300">
//               {selectedTrip.aiDistanceRemaining?.toFixed(1) ?? 0}
//               <span className="text-xs font-normal ml-1">km</span>
//             </p>
//           </div>

//           {/* Total Distance */}
//           <div className="p-4 border rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20">
//             <div className="flex items-center gap-2 mb-1">
//               <MapPinned className="h-3.5 w-3.5 text-orange-600" />
//               <Label className="text-[10px] font-bold text-orange-700 dark:text-orange-400">{t('trips.totalDistance')}</Label>
//             </div>
//             <p className="text-2xl font-black text-orange-900 dark:text-orange-300">
//               {selectedTrip.aiOriginToDestinationTotal?.toFixed(1) ?? 0}
//               <span className="text-xs font-normal ml-1">km</span>
//             </p>
//           </div>

//           {/* ETA Human Readable */}
//           <div className="p-4 border rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-900/20 col-span-2">
//             <div className="flex items-center gap-2 mb-1">
//               <Clock className="h-3.5 w-3.5 text-indigo-600" />
//               <Label className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400">{t('trips.estimatedArrival')}</Label>
//             </div>
//             <p className="text-lg font-bold text-indigo-900 dark:text-indigo-300">
//               {selectedTrip.aiEstimatedArrivalHuman || t('trips.calculating')}
//             </p>
//           </div>

//           {/* ETA Exact Time */}
//           <div className="p-4 border rounded-xl bg-card col-span-2">
//             <div className="flex items-center gap-2 mb-1">
//               <Timer className="h-3.5 w-3.5 text-muted-foreground" />
//               <Label className="text-[10px] font-bold text-muted-foreground">{t('trips.arrivalDateTime')}</Label>
//             </div>
//             <p className="text-sm font-semibold text-foreground">
//               {selectedTrip.aiEstimatedArrivalTime
//                 ? new Date(selectedTrip.aiEstimatedArrivalTime).toLocaleString('en-US', {
//                     dateStyle: 'medium',
//                     timeStyle: 'short',
//                      timeZone: 'America/Mexico_City',
//                   })
//                 : t('trips.notAvailable')}
//             </p>
//           </div>

//           {/* Movement Status */}
//           <div className="p-4 border rounded-xl bg-card col-span-2">
//             <div className="flex items-center gap-2 mb-1">
//               <Activity className="h-3.5 w-3.5 text-muted-foreground" />
//               <Label className="text-[10px] font-bold text-muted-foreground">{t('trips.movementStatus')}</Label>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className={`inline-flex h-2.5 w-2.5 rounded-full ${selectedTrip.aiMovementDetected ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
//               <p className="text-sm font-bold">
//                 {selectedTrip.aiMovementDetected ? t('trips.vehicleMoving') : t('trips.vehicleStationary')}
//               </p>
//             </div>
//           </div>

//           {/* Last Updated */}
//           <div className="p-4 border rounded-xl bg-muted/20 col-span-2">
//             <div className="flex items-center gap-2 mb-1">
//               <History className="h-3.5 w-3.5 text-muted-foreground" />
//               <Label className="text-[10px] font-bold text-muted-foreground">{t('trips.lastUpdatedLabel')}</Label>
//             </div>
//             <p className="text-xs font-medium text-muted-foreground">
//               {selectedTrip.aiLastUpdated
//                 ? new Date(selectedTrip.aiLastUpdated).toLocaleString('en-US', {
//                     dateStyle: 'short',
//                     timeStyle: 'medium',
//                      timeZone: 'America/Mexico_City',
//                   })
//                 : t('trips.noUpdatesYet')}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* SHIPMENT DETAILS */}
//       <section className="space-y-4 pt-4 border-t">
//         <div className="p-4 bg-muted/20 border rounded-xl space-y-3">
//           <div className="flex justify-between items-center">
//             <div className="space-y-1">
//               <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t('trips.cargoType')}</Label>
//               <p className="text-xs font-bold capitalize">{selectedTrip.cargoDescription}</p>
//             </div>
//             <div className="text-right space-y-1">
//               <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t('trips.weightLabel')}</Label>
//               <p className="text-xs font-bold">{selectedTrip.weight.toLocaleString()} kg</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* TRIP DOCUMENTS */}
//       {/* <section className="space-y-4 pt-4 border-t">
//         <Label className="font-bold uppercase text-[10px] tracking-widest text-primary">
//           {t('trips.tripDocuments')}
//         </Label>

//         <div className="space-y-2">
         
//           {selectedTrip.tripDocuments?.invoice1Url ? (
//             <a
//               href={selectedTrip.tripDocuments.invoice1Url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
//             >
//               <Package className="h-4 w-4" />
//               {t('trips.viewInvoice1')}
//             </a>
//           ) : (
//             <p className="text-xs text-muted-foreground">
//               {t('trips.invoice1NotUploaded')}
//             </p>
//           )}

        
//           {selectedTrip.tripDocuments?.invoice2Url ? (
//             <a
//               href={selectedTrip.tripDocuments.invoice2Url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
//             >
//               <Package className="h-4 w-4" />
//               {t('trips.viewInvoice2')}
//             </a>
//           ) : (
//             <p className="text-xs text-muted-foreground">
//               {t('trips.invoice2NotUploaded')}
//             </p>
//           )}
//         </div>
//       </section> */}
//     {/* TRIP DOCUMENTS */}
// <section className="space-y-4 pt-4 border-t">
//   <Label className="font-bold uppercase text-[10px] tracking-widest text-primary">
//     {t("trips.tripDocuments")}
//   </Label>

//   <div className="space-y-3">

//     {/* Invoice 1 */}
//     {selectedTrip.tripDocuments?.invoice1Url ? (
//       <a
//         href={selectedTrip.tripDocuments.invoice1Url}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
//       >
//         <Package className="h-4 w-4" />
//         {t("trips.viewInvoice1")}
//       </a>
//     ) : (
//       <p className="text-xs text-muted-foreground">
//         {t("trips.invoice1NotUploaded")}
//       </p>
//     )}

//     {/* Invoice 2 */}
//     {selectedTrip.tripDocuments?.invoice2Url ? (
//       <a
//         href={selectedTrip.tripDocuments.invoice2Url}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
//       >
//         <Package className="h-4 w-4" />
//         {t("trips.viewInvoice2")}
//       </a>
//     ) : (
//       <p className="text-xs text-muted-foreground">
//         {t("trips.invoice2NotUploaded")}
//       </p>
//     )}

//     {/* PROOF OF DELIVERY (PDF) */}
//     {selectedTrip.tripDocuments?.proofOfDeliveryUrl ? (
//       <a
//         href={selectedTrip.tripDocuments.proofOfDeliveryUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:underline"
//       >
//         <Package className="h-4 w-4" />
//         {t("trips.viewProofOfDelivery")}
//       </a>
//     ) : (
//       <p className="text-xs text-muted-foreground">
//         {t("trips.podNotUploaded")}
//       </p>
//     )}

//     {/* DELIVERY PICTURE (IMAGE PREVIEW) */}
//     {selectedTrip.tripDocuments?.deliveryPictureUrl && (
//       <div className="space-y-2">
//         <Label className="text-[10px] uppercase font-bold text-muted-foreground">
//           {t("trips.deliveryPicture")}
//         </Label>

//         <a
//           href={selectedTrip.tripDocuments.deliveryPictureUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="block"
//         >
//           <img
//             src={selectedTrip.tripDocuments.deliveryPictureUrl}
//             alt="Delivery Proof"
//             className="w-full max-w-xs rounded-lg border shadow-sm hover:opacity-90 transition"
//           />
//         </a>

//         <p className="text-[10px] text-muted-foreground">
//           Uploaded on{" "}
//           {new Date(
//             selectedTrip.tripDocuments.deliveryPictureUploadedAt
//           ).toLocaleString("en-US", {
//             dateStyle: "medium",
//             timeStyle: "short",
//              timeZone: 'America/Mexico_City',
//           })}
//         </p>
//       </div>
//     )}

//   </div>
// </section>

    
    
//     </div>
//   );
// }




import { useTranslation } from "react-i18next";
import {
  MapPin,
  Navigation,
  Package,
  Gauge,
  Route,
  MapPinned,
  Clock,
  Timer,
  Activity,
  History,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { LiveTripMap } from "@/components/LiveTripMap";

interface TripProfileSheetProps {
  selectedTrip: any;
  getStatusBadgeStyles: (status: string) => string;
}

export function TripProfileSheet({
  selectedTrip,
  getStatusBadgeStyles,
}: TripProfileSheetProps) {
  const { t } = useTranslation();

  if (!selectedTrip) return null;

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none">
      {/* 1. GPS TRACKING SECTION */}
      <section className="space-y-4">
        <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
          <MapPin className="h-4 w-4" /> {t('trips.liveTracking')}
        </Label>

        <div className="h-64 w-full relative">
          {(() => {
            const currentLocation = selectedTrip.currentLocation ?? selectedTrip.originLocation;

            const hasCoords =
              currentLocation?.latitude !== undefined &&
              currentLocation?.longitude !== undefined;

            return hasCoords ? (
              <LiveTripMap
                key={selectedTrip.tripId}
                current={{
                  latitude: Number(currentLocation.latitude),
                  longitude: Number(currentLocation.longitude),
                }}
              />
            ) : (
              <div className="h-full w-full bg-muted rounded-lg flex items-center justify-center">
                <p className="text-xs text-muted-foreground">
                  {t('trips.locationNotAvailable')}
                </p>
              </div>
            );
          })()}
        </div>
      </section>

      {/* LOCATION DETAILS */}
      <section className="space-y-4 pt-2">
        <Label className="font-bold uppercase text-[10px] tracking-widest text-primary">
          {t('trips.locationDetails')}
        </Label>

        <div className="space-y-3">
          <div className="p-3 border rounded-lg bg-card">
            <Label className="text-[10px] uppercase text-muted-foreground">
              {t('trips.origin')}
            </Label>
            <p className="text-sm font-semibold">
              {selectedTrip.originLocation?.address ||
                selectedTrip.origin ||
                t('trips.notAvailable')}
            </p>
          </div>

          <div className="p-3 border rounded-lg bg-card">
            <Label className="text-[10px] uppercase text-muted-foreground">
              {t('trips.destination')}
            </Label>
            <p className="text-sm font-semibold">
              {selectedTrip.destinationLocation?.address ||
                selectedTrip.destination ||
                t('trips.notAvailable')}
            </p>
          </div>

          <div className="p-3 border rounded-lg bg-card">
            <Label className="text-[10px] uppercase text-muted-foreground">
              {t('trips.currentLocation')}
            </Label>
            <p className="text-sm font-semibold">
              {selectedTrip.currentLocation?.address ||
                selectedTrip.originLocation?.address ||
                t('trips.awaitingUpdate')}
            </p>
          </div>
        </div>
      </section>

      {/* ENHANCED DRIVING METRICS */}
      <section className="space-y-4 pt-4 border-t">
        <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
          <BarChart3 className="h-4 w-4" /> {t('trips.drivingMetrics')}
        </Label>

        <div className="grid grid-cols-2 gap-3">
          {/* Current Speed */}
          <div className="p-4 border rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20">
            <div className="flex items-center gap-2 mb-1">
              <Gauge className="h-3.5 w-3.5 text-blue-600" />
              <Label className="text-[10px] font-bold text-blue-700 dark:text-blue-400">{t('trips.currentSpeed')}</Label>
            </div>
            <p className="text-2xl font-black text-blue-900 dark:text-blue-300">
              {selectedTrip.aiCurrentSpeed ?? 0}
              <span className="text-xs font-normal ml-1">km/h</span>
            </p>
          </div>

          {/* Distance Covered */}
          <div className="p-4 border rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20">
            <div className="flex items-center gap-2 mb-1">
              <Route className="h-3.5 w-3.5 text-emerald-600" />
              <Label className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">{t('trips.remainingDistance')}</Label>
            </div>
            <p className="text-2xl font-black text-emerald-900 dark:text-emerald-300">
              {selectedTrip.aiDistanceRemaining?.toFixed(1) ?? 0}
              <span className="text-xs font-normal ml-1">km</span>
            </p>
          </div>

          {/* Total Distance */}
          <div className="p-4 border rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20">
            <div className="flex items-center gap-2 mb-1">
              <MapPinned className="h-3.5 w-3.5 text-orange-600" />
              <Label className="text-[10px] font-bold text-orange-700 dark:text-orange-400">{t('trips.totalDistance')}</Label>
            </div>
            <p className="text-2xl font-black text-orange-900 dark:text-orange-300">
              {selectedTrip.aiOriginToDestinationTotal?.toFixed(1) ?? 0}
              <span className="text-xs font-normal ml-1">km</span>
            </p>
          </div>

          {/* Trip Started (NEW SECTION) */}
          <div className="p-4 border rounded-xl bg-card col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <Navigation className="h-3.5 w-3.5 text-primary" />
              <Label className="font-bold uppercase text-[10px] tracking-widest text-primary">
                {t("trips.tripStarted")}
              </Label>
            </div>
            <p className="text-sm font-semibold">
              {selectedTrip.originPickupTime
                ? new Date(selectedTrip.originPickupTime).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "America/Mexico_City",
                  })
                : t("trips.notAvailable")}
            </p>
          </div>

          {/* ETA Human Readable */}
          <div className="p-4 border rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-900/20 col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-3.5 w-3.5 text-indigo-600" />
              <Label className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400">{t('trips.estimatedArrival')}</Label>
            </div>
            <p className="text-lg font-bold text-indigo-900 dark:text-indigo-300">
              {selectedTrip.aiEstimatedArrivalHuman || t('trips.calculating')}
            </p>
          </div>

          {/* ETA Exact Time */}
          <div className="p-4 border rounded-xl bg-card col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <Timer className="h-3.5 w-3.5 text-muted-foreground" />
              <Label className="text-[10px] font-bold text-muted-foreground">{t('trips.arrivalDateTime')}</Label>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {selectedTrip.aiEstimatedArrivalTime
                ? new Date(selectedTrip.aiEstimatedArrivalTime).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                    timeZone: 'America/Mexico_City',
                  })
                : t('trips.notAvailable')}
            </p>
          </div>

          {/* Movement Status */}
          <div className="p-4 border rounded-xl bg-card col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="h-3.5 w-3.5 text-muted-foreground" />
              <Label className="text-[10px] font-bold text-muted-foreground">{t('trips.movementStatus')}</Label>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex h-2.5 w-2.5 rounded-full ${selectedTrip.aiMovementDetected ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
              <p className="text-sm font-bold">
                {selectedTrip.aiMovementDetected ? t('trips.vehicleMoving') : t('trips.vehicleStationary')}
              </p>
            </div>
          </div>

          {/* Last Updated */}
          <div className="p-4 border rounded-xl bg-muted/20 col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <History className="h-3.5 w-3.5 text-muted-foreground" />
              <Label className="text-[10px] font-bold text-muted-foreground">{t('trips.lastUpdatedLabel')}</Label>
            </div>
            <p className="text-xs font-medium text-muted-foreground">
              {selectedTrip.aiLastUpdated
                ? new Date(selectedTrip.aiLastUpdated).toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'medium',
                    timeZone: 'America/Mexico_City',
                  })
                : t('trips.noUpdatesYet')}
            </p>
          </div>
        </div>
      </section>

      {/* SHIPMENT DETAILS */}
      <section className="space-y-4 pt-4 border-t">
        <div className="p-4 bg-muted/20 border rounded-xl space-y-3">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t('trips.cargoType')}</Label>
              <p className="text-xs font-bold capitalize">{selectedTrip.cargoDescription}</p>
            </div>
            <div className="text-right space-y-1">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t('trips.weightLabel')}</Label>
              <p className="text-xs font-bold">{selectedTrip.weight.toLocaleString()} kg</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRIP DOCUMENTS */}
      <section className="space-y-4 pt-4 border-t">
        <Label className="font-bold uppercase text-[10px] tracking-widest text-primary">
          {t("trips.tripDocuments")}
        </Label>

        <div className="space-y-3">
          {/* Invoice 1 */}
          {selectedTrip.tripDocuments?.invoice1Url ? (
            <a
              href={selectedTrip.tripDocuments.invoice1Url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
            >
              <Package className="h-4 w-4" />
              {t("trips.viewInvoice1")}
            </a>
          ) : (
            <p className="text-xs text-muted-foreground">
              {t("trips.invoice1NotUploaded")}
            </p>
          )}

          {/* Invoice 2 */}
          {selectedTrip.tripDocuments?.invoice2Url ? (
            <a
              href={selectedTrip.tripDocuments.invoice2Url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
            >
              <Package className="h-4 w-4" />
              {t("trips.viewInvoice2")}
            </a>
          ) : (
            <p className="text-xs text-muted-foreground">
              {t("trips.invoice2NotUploaded")}
            </p>
          )}

          {/* PROOF OF DELIVERY (PDF) */}
          {selectedTrip.tripDocuments?.proofOfDeliveryUrl ? (
            <a
              href={selectedTrip.tripDocuments.proofOfDeliveryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:underline"
            >
              <Package className="h-4 w-4" />
              {t("trips.viewProofOfDelivery")}
            </a>
          ) : (
            <p className="text-xs text-muted-foreground">
              {t("trips.podNotUploaded")}
            </p>
          )}

          {/* DELIVERY PICTURE (IMAGE PREVIEW) */}
          {selectedTrip.tripDocuments?.deliveryPictureUrl && (
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">
                {t("trips.deliveryPicture")}
              </Label>

              <a
                href={selectedTrip.tripDocuments.deliveryPictureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={selectedTrip.tripDocuments.deliveryPictureUrl}
                  alt="Delivery Proof"
                  className="w-full max-w-xs rounded-lg border shadow-sm hover:opacity-90 transition"
                />
              </a>

              <p className="text-[10px] text-muted-foreground">
                Uploaded on{" "}
                {new Date(
                  selectedTrip.tripDocuments.deliveryPictureUploadedAt
                ).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: 'America/Mexico_City',
                })}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}