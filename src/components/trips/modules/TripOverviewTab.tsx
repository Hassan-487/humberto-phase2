
// import {
//   MapPin,
//   Truck,
//   Package,
//   Clock,
//   Navigation,
// } from "lucide-react";

// import { Badge } from "@/components/ui/badge";
// import {
//   ModuleSection,
//   FormGrid,
//   ReadonlyField,
//   MetricCard,
// } from "@/components/trips/ModuleFormComponents";

// import {
//   STATUS_BADGE_STYLES,
//   STATUS_LABELS,
// } from "@/lib/tripStatusUtils";

// import { Trip } from "@/services/trip.service";
// import { LiveTripMap } from "@/components/LiveTripMap";

// export function TripOverviewTab({ trip }: { trip: Trip }) {
//   const mexicoTime = (iso?: string) =>
//     iso
//       ? new Date(iso).toLocaleString("en-US", {
//           dateStyle: "medium",
//           timeStyle: "short",
//           timeZone: "America/Mexico_City",
//         })
//       : "—";

//   const hasCoords = trip.currentLocation?.latitude !== undefined;

//   return (
//     <div className="space-y-6">

//       {/* Status */}
//       <div className="flex items-center justify-between bg-card border rounded-2xl px-6 py-4 shadow-sm">
//         <div>
//           <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">
//             Trip Status
//           </p>

//           <Badge
//             variant="outline"
//             className={`text-sm px-3 py-1 rounded-full capitalize ${
//               STATUS_BADGE_STYLES[trip.status] ?? ""
//             }`}
//           >
//             {STATUS_LABELS[trip.status] ?? trip.status}
//           </Badge>
//         </div>

//         <div className="text-right">
//           <p className="text-xs text-muted-foreground mb-1">Progress</p>

//           <div className="w-40">
//             <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-emerald-500"
//                 style={{ width: `${trip.progress}%` }}
//               />
//             </div>

//             <p className="text-xs mt-1 text-muted-foreground">
//               {trip.progress}% complete
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* AI Metrics */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//         <MetricCard label="Speed" value={`${trip.aiCurrentSpeed} km/h`} />
//         <MetricCard label="Distance Left" value={`${trip.aiDistanceRemaining} km`} />
//         <MetricCard label="ETA" value={trip.aiEstimatedArrivalHuman} />
//         <MetricCard
//           label="Movement"
//           value={trip.aiMovementDetected ? "Moving" : "Stopped"}
//         />
//       </div>

//       {/* Map */}
//       <ModuleSection title="Live Tracking" icon={<Navigation />}>
//         <div className="h-72 rounded-xl overflow-hidden bg-muted/20">
//           {hasCoords ? (
//             <LiveTripMap
//               current={{
//                 latitude: Number(trip.currentLocation?.latitude),
//                 longitude: Number(trip.currentLocation?.longitude),
//               }}
//             />
//           ) : (
//             <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
//               <MapPin className="mr-2" /> No location available
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
//           <ReadonlyField label="Origin" value={trip.origin} />
//           <ReadonlyField label="Current" value={trip.currentLocation?.address || "—"} />
//           <ReadonlyField label="Destination" value={trip.destination} />
//         </div>
//       </ModuleSection>

//       {/* Basic Info */}
//       <ModuleSection title="Trip Info" icon={<Package />}>
//         <FormGrid cols={3}>
//           <ReadonlyField label="Trip #" value={trip.tripNumber} />
//           <ReadonlyField label="Customer" value={trip.customer} />
//           <ReadonlyField label="Truck" value={trip.truck} />
//           <ReadonlyField label="Driver" value={trip.driver} />
//           <ReadonlyField label="Containers" value={trip.containers} />
//         </FormGrid>
//       </ModuleSection>

//       {/* Schedule */}
//       <ModuleSection title="Schedule" icon={<Clock />}>
//         <FormGrid cols={2}>
//           <ReadonlyField
//             label="Start Time"
//             value={mexicoTime(trip.schedule?.actualStartTime)}
//           />
//           <ReadonlyField
//             label="Delivery Time"
//             value={mexicoTime(trip.destinationDeliveryTime)}
//           />
//         </FormGrid>
//       </ModuleSection>

//     </div>
//   );
// }

import {
  MapPin,
  Truck,
  Package,
  Clock,
  Navigation,
  AlertTriangle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  ModuleSection,
  FormGrid,
  ReadonlyField,
  MetricCard,
} from "@/components/trips/ModuleFormComponents";

import {
  STATUS_BADGE_STYLES,
  STATUS_LABELS,
} from "@/lib/tripStatusUtils";

import { Trip } from "@/services/trip.service";
import { LiveTripMap } from "@/components/LiveTripMap";

export function TripOverviewTab({ trip }: { trip: Trip }) {
  const mexicoTime = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "America/Mexico_City",
        })
      : "—";

  const hasCoords = trip.currentLocation?.latitude !== undefined;

  return (
    <div className="space-y-6">

      {/* 🔴 Alerts */}
      {(!trip.truck || !trip.driver) && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Trip is not fully assigned yet
        </div>
      )}

      {trip.aiWillBeLate && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Delay predicted: {trip.aiDelayMinutes} minutes
        </div>
      )}

      {/* ✅ Status */}
      <div className="flex items-center justify-between bg-card border rounded-2xl px-6 py-4 shadow-sm">
        <div>
          <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">
            Trip Status
          </p>

          <Badge
            variant="outline"
            className={`text-sm px-3 py-1 rounded-full capitalize ${
              STATUS_BADGE_STYLES[trip.status] ?? ""
            }`}
          >
            {STATUS_LABELS[trip.status] ?? trip.status}
          </Badge>
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground mb-1">Progress</p>

          <div className="w-40">
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500"
                style={{ width: `${trip.progress}%` }}
              />
            </div>

            <p className="text-xs mt-1 text-muted-foreground">
              {trip.progress}% complete
            </p>
          </div>
        </div>
      </div>

      {/* ✅ AI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard label="Speed" value={`${trip.aiCurrentSpeed} km/h`} />
        <MetricCard label="Distance Left" value={`${trip.aiDistanceRemaining} km`} />
        <MetricCard label="ETA" value={trip.aiEstimatedArrivalHuman} />
        <MetricCard
          label="Movement"
          value={trip.aiMovementDetected ? "Moving" : "Stopped"}
        />
      </div>

      {/* ✅ Live Map */}
      <ModuleSection title="Live Tracking" icon={<Navigation />}>
        <div className="h-72 rounded-xl overflow-hidden bg-muted/20">
          {hasCoords ? (
            <LiveTripMap
              current={{
                latitude: Number(trip.currentLocation?.latitude),
                longitude: Number(trip.currentLocation?.longitude),
              }}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
              <MapPin className="mr-2" /> No location available
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <ReadonlyField label="Origin" value={trip.origin} />
          <ReadonlyField label="Current" value={trip.currentLocation?.address || "—"} />
          <ReadonlyField label="Destination" value={trip.destination} />
        </div>
      </ModuleSection>

      {/* 🚛 Assignment */}
      <ModuleSection title="Assignment Details" icon={<Truck />}>
        <FormGrid cols={3}>
          <ReadonlyField label="Truck" value={trip.truck || "Not Assigned"} />
          <ReadonlyField label="Driver" value={trip.driver || "Not Assigned"} />
          <ReadonlyField label="Carrier" value={trip.loadAssignment?.carrier || "—"} />
          <ReadonlyField label="Business Unit" value={trip.loadAssignment?.businessUnit || "—"} />
        </FormGrid>
      </ModuleSection>

      {/* 💰 Financial */}
      <ModuleSection title="Financial Overview" icon={<Package />}>
        <div className="grid grid-cols-3 gap-4">
          <MetricCard
            label="Trip Price"
            value={`$${trip.planning?.tripPrice?.toLocaleString() || 0}`}
          />
          <MetricCard
            label="Estimated Cost"
            value={`$${(trip.expensePreAssignment?.estimatedDiesel || 0).toLocaleString()}`}
          />
          <MetricCard
            label="Profit"
            value={`$${trip.netProfit?.toLocaleString?.() || 0}`}
            color={trip.netProfit > 0 ? "green" : "red"}
          />
        </div>
      </ModuleSection>

      {/* 📦 Trip Info */}
      <ModuleSection title="Trip Info" icon={<Package />}>
        <FormGrid cols={3}>
          <ReadonlyField label="Trip #" value={trip.tripNumber} />
          <ReadonlyField label="Customer" value={trip.customer} />
          <ReadonlyField label="Containers" value={trip.containers} />
        </FormGrid>
      </ModuleSection>

      {/* 📅 Key Dates */}
      <ModuleSection title="Key Dates" icon={<Clock />}>
        <FormGrid cols={3}>
          <ReadonlyField
            label="Pickup Date"
            value={mexicoTime(trip.originPickupTime)}
          />
          <ReadonlyField
            label="Delivery Date"
            value={mexicoTime(trip.destinationDeliveryTime)}
          />
          <ReadonlyField
            label="Assigned At"
            value={mexicoTime(trip.loadAssignment?.dateOfAssignment)}
          />
        </FormGrid>
      </ModuleSection>

      {/* ⏱ Schedule */}
      <ModuleSection title="Schedule" icon={<Clock />}>
        <FormGrid cols={2}>
          <ReadonlyField
            label="Start Time"
            value={mexicoTime(trip.schedule?.actualStartTime)}
          />
          <ReadonlyField
            label="Delivery Time"
            value={mexicoTime(trip.destinationDeliveryTime)}
          />
        </FormGrid>
      </ModuleSection>

    </div>
  );
}