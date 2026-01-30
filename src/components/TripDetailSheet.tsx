
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
  if (!selectedTrip) return null;

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none">
      {/* 1. GPS TRACKING SECTION */}
      <section className="space-y-4">
        <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
          <MapPin className="h-4 w-4" /> Live Tracking
        </Label>

        <div className="h-64 w-full relative">
          {(() => {
            const currentLocation = selectedTrip.currentLocation ?? selectedTrip.originLocation;

            const hasCoords =
              currentLocation?.latitude !== undefined &&
              currentLocation?.longitude !== undefined;

            return hasCoords ? (
              <LiveTripMap
                key={selectedTrip.tripNumber}
                current={{
                  latitude: Number(currentLocation.latitude),
                  longitude: Number(currentLocation.longitude),
                }}
              />
            ) : (
              <div className="h-full w-full bg-muted rounded-lg flex items-center justify-center">
                <p className="text-xs text-muted-foreground">
                  Location data not available
                </p>
              </div>
            );
          })()}
        </div>
      </section>

      {/* LOCATION DETAILS */}
      <section className="space-y-4 pt-2">
        <Label className="font-bold uppercase text-[10px] tracking-widest text-primary">
          Location Details
        </Label>

        <div className="space-y-3">
          <div className="p-3 border rounded-lg bg-card">
            <Label className="text-[10px] uppercase text-muted-foreground">
              Origin
            </Label>
            <p className="text-sm font-semibold">
              {selectedTrip.originLocation?.address ||
                selectedTrip.origin ||
                "Not available"}
            </p>
          </div>

          <div className="p-3 border rounded-lg bg-card">
            <Label className="text-[10px] uppercase text-muted-foreground">
              Destination
            </Label>
            <p className="text-sm font-semibold">
              {selectedTrip.destinationLocation?.address ||
                selectedTrip.destination ||
                "Not available"}
            </p>
          </div>

          <div className="p-3 border rounded-lg bg-card">
            <Label className="text-[10px] uppercase text-muted-foreground">
              Current Location
            </Label>
            <p className="text-sm font-semibold">
              {selectedTrip.currentLocation?.address ||
                selectedTrip.originLocation?.address ||
                "Awaiting live update"}
            </p>
          </div>
        </div>
      </section>

      {/* ENHANCED DRIVING METRICS */}
      <section className="space-y-4 pt-4 border-t">
        <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
          <BarChart3 className="h-4 w-4" /> Driving Metrics
        </Label>

        <div className="grid grid-cols-2 gap-3">
          {/* Current Speed */}
          <div className="p-4 border rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20">
            <div className="flex items-center gap-2 mb-1">
              <Gauge className="h-3.5 w-3.5 text-blue-600" />
              <Label className="text-[10px] font-bold text-blue-700 dark:text-blue-400">CURRENT SPEED</Label>
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
              <Label className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">REMAINING DISTANCE</Label>
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
              <Label className="text-[10px] font-bold text-orange-700 dark:text-orange-400">TOTAL DISTANCE</Label>
            </div>
            <p className="text-2xl font-black text-orange-900 dark:text-orange-300">
              {selectedTrip.aiOriginToDestinationTotal?.toFixed(1) ?? 0}
              <span className="text-xs font-normal ml-1">km</span>
            </p>
          </div>

          {/* ETA Human Readable */}
          <div className="p-4 border rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-900/20 col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-3.5 w-3.5 text-indigo-600" />
              <Label className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400">ESTIMATED TIME OF ARRIVAL</Label>
            </div>
            <p className="text-lg font-bold text-indigo-900 dark:text-indigo-300">
              {selectedTrip.aiEstimatedArrivalHuman || "Calculating..."}
            </p>
          </div>

          {/* ETA Exact Time */}
          <div className="p-4 border rounded-xl bg-card col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <Timer className="h-3.5 w-3.5 text-muted-foreground" />
              <Label className="text-[10px] font-bold text-muted-foreground">ARRIVAL DATE & TIME</Label>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {selectedTrip.aiEstimatedArrivalTime
                ? new Date(selectedTrip.aiEstimatedArrivalTime).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })
                : "Not available"}
            </p>
          </div>

          {/* Movement Status */}
          <div className="p-4 border rounded-xl bg-card col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="h-3.5 w-3.5 text-muted-foreground" />
              <Label className="text-[10px] font-bold text-muted-foreground">MOVEMENT STATUS</Label>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex h-2.5 w-2.5 rounded-full ${selectedTrip.aiMovementDetected ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
              <p className="text-sm font-bold">
                {selectedTrip.aiMovementDetected ? "Vehicle is Moving" : "Vehicle is Stationary"}
              </p>
            </div>
          </div>

          {/* Last Updated */}
          <div className="p-4 border rounded-xl bg-muted/20 col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <History className="h-3.5 w-3.5 text-muted-foreground" />
              <Label className="text-[10px] font-bold text-muted-foreground">LAST UPDATED</Label>
            </div>
            <p className="text-xs font-medium text-muted-foreground">
              {selectedTrip.aiLastUpdated
                ? new Date(selectedTrip.aiLastUpdated).toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'medium'
                  })
                : "No updates yet"}
            </p>
          </div>
        </div>
      </section>

      {/* SHIPMENT DETAILS */}
      <section className="space-y-4 pt-4 border-t">
        <div className="p-4 bg-muted/20 border rounded-xl space-y-3">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">Cargo Type</Label>
              <p className="text-xs font-bold capitalize">{selectedTrip.cargoDescription}</p>
            </div>
            <div className="text-right space-y-1">
              <Label className="text-[10px] uppercase font-bold text-muted-foreground">Weight</Label>
              <p className="text-xs font-bold">{selectedTrip.weight.toLocaleString()} kg</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRIP DOCUMENTS */}
      <section className="space-y-4 pt-4 border-t">
        <Label className="font-bold uppercase text-[10px] tracking-widest text-primary">
          Trip Documents
        </Label>

        <div className="space-y-2">
          {/* Invoice 1 */}
          {selectedTrip.tripDocuments?.invoice1Url ? (
            <a
              href={selectedTrip.tripDocuments.invoice1Url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
            >
              <Package className="h-4 w-4" />
              View Invoice 1
            </a>
          ) : (
            <p className="text-xs text-muted-foreground">
              Invoice 1 not uploaded
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
              View Invoice 2
            </a>
          ) : (
            <p className="text-xs text-muted-foreground">
              Invoice 2 not uploaded
            </p>
          )}
        </div>
      </section>
    </div>
  );
}