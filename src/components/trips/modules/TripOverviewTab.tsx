// modules/TripOverviewTab.tsx
import { MapPin, Truck, User, Package, Activity, Clock, Navigation, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ModuleSection, FormGrid, ReadonlyField, MetricCard } from "@/components/trips/ModuleFormComponents";
import { STATUS_BADGE_STYLES, STATUS_LABELS } from "@/lib/tripStatusUtils";
import { Trip } from "@/data/mockTripData";
import { LiveTripMap } from "@/components/LiveTripMap";

export function TripOverviewTab({ trip }: { trip: Trip }) {
  const p = trip.planning;
  const la = trip.loadAssignment;
  const mon = trip.monitoring;

  const mexicoTime = (iso: string) =>
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
      {/* Status banner */}
      <div className="flex items-center justify-between bg-card border rounded-2xl px-6 py-4 shadow-sm">
        <div>
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1">Trip Status</p>
          <Badge
            variant="outline"
            className={`text-sm px-3 py-1 rounded-full capitalize ${STATUS_BADGE_STYLES[trip.status] ?? ""}`}
          >
            {STATUS_LABELS[trip.status] ?? trip.status}
          </Badge>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground mb-1">Progress</p>
          <div className="w-40">
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${trip.progress}%` }} />
            </div>
            <p className="text-xs mt-1 text-muted-foreground text-right">{trip.progress}% complete</p>
          </div>
        </div>
      </div>

      {/* AI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard label="Current Speed" value={`${trip.aiCurrentSpeed ?? 0} km/h`} color={trip.aiMovementDetected ? "blue" : "default"} />
        <MetricCard label="Distance Left" value={`${trip.aiDistanceRemaining?.toFixed(0) ?? "—"} km`} color="amber" />
        <MetricCard label="ETA" value={trip.aiEstimatedArrivalHuman || "Calculating…"} color="green" />
        <MetricCard
          label="Movement"
          value={trip.aiMovementDetected ? "Moving" : "Stationary"}
          color={trip.aiMovementDetected ? "green" : "red"}
        />
      </div>

      {/* Live Map */}
      <ModuleSection title="Live Tracking" icon={<Navigation className="h-4 w-4" />}>
        <div className="h-72 rounded-xl overflow-hidden bg-muted/20">
          {hasCoords ? (
            <LiveTripMap
              key={trip.tripId}
              current={{
                latitude: Number(trip.currentLocation!.latitude),
                longitude: Number(trip.currentLocation!.longitude),
              }}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
              <MapPin className="h-5 w-5 mr-2" /> Location not yet available
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <ReadonlyField label="Origin" value={trip.originLocation?.address ?? p.pickupAddress} />
          <ReadonlyField label="Current Location" value={trip.currentLocation?.address ?? "—"} />
          <ReadonlyField label="Destination" value={trip.destinationLocation?.address ?? p.deliveryAddress} />
        </div>
      </ModuleSection>

      {/* Planning Summary */}
      <ModuleSection title="Planning Summary" icon={<Package className="h-4 w-4" />}>
        <FormGrid cols={3}>
          <ReadonlyField label="Trip Number" value={p.tripNumber} />
          <ReadonlyField label="Customer" value={p.customer} />
          <ReadonlyField label="Route" value={p.route} />
          <ReadonlyField label="Trip Type" value={p.tripType} />
          <ReadonlyField label="Trailer Mode" value={p.trailerMode} />
          <ReadonlyField label="Trailer Type" value={p.trailerType} />
          <ReadonlyField label="Pickup Date & Time" value={`${p.pickupDate} ${p.pickupHour}`} />
          <ReadonlyField label="Delivery Date & Time" value={`${p.deliveryDate} ${p.deliveryHour}`} />
          <ReadonlyField label="Distance" value={`${p.tripDistance} km`} />
          <ReadonlyField label="Trip Price" value={`$${p.tripPrice?.toLocaleString()} MXN`} />
          <ReadonlyField label="Pickup Address" value={p.pickupAddress} span />
          <ReadonlyField label="Delivery Address" value={p.deliveryAddress} span />
        </FormGrid>
      </ModuleSection>

      {/* Assignment Summary */}
      <ModuleSection title="Assignment Summary" icon={<Truck className="h-4 w-4" />}>
        <FormGrid cols={3}>
          <ReadonlyField label="Business Unit" value={la.businessUnit} />
          <ReadonlyField label="Carrier" value={la.carrier} />
          <ReadonlyField label="Truck" value={la.truckNumber} />
          <ReadonlyField label="Driver" value={la.driver} />
          <ReadonlyField label="Internal Trip #" value={la.internalTripNumber} />
          <ReadonlyField label="Invoice #" value={la.invoiceNumber || "—"} />
        </FormGrid>
      </ModuleSection>

      {/* Delivery Times */}
      <ModuleSection title="Schedule" icon={<Clock className="h-4 w-4" />}>
        <FormGrid cols={2}>
          <ReadonlyField label="Actual Start Time" value={mexicoTime(trip.schedule?.actualStartTime)} />
          <ReadonlyField label="Scheduled Delivery" value={mexicoTime(trip.destinationDeliveryTime)} />
          <ReadonlyField label="Last GPS Update" value={mexicoTime(mon.lastStatusUpdate)} />
          <ReadonlyField label="ETA" value={trip.aiEstimatedArrivalHuman || "—"} />
        </FormGrid>
      </ModuleSection>

      {/* Active Alerts */}
      {mon.alerts?.length > 0 && (
        <ModuleSection title="Active Alerts" icon={<AlertTriangle className="h-4 w-4" />}>
          <div className="space-y-3">
            {mon.alerts.map((a, i) => (
              <div key={i} className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-800">{a.message}</p>
                  <p className="text-xs text-amber-600 mt-0.5">
                    {new Date(a.time).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ModuleSection>
      )}
    </div>
  );
}