
import { useState } from "react";
import { 
  Plus, Search, MapPin, Loader2, Trash2, Edit3, Gauge, Navigation, 
  Package, Info, User, Activity, Timer, Zap, BarChart3, History 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useTrips, useDeleteTrip } from "@/hooks/useTrips"; 
import { CreateTripDialog } from "@/components/CreateTripDialog";
import { UpdateTripDialog } from "@/components/UpdateTripDialog";
// import { TripMap } from "@/components/TripMap";
import { PermissionGuard } from "@/components/PermissionGuard";
import { LiveTripMap } from "@/components/LiveTripMap";


const getStatusBadgeStyles = (status: string) => {
  switch (status?.toLowerCase()) {
    case "scheduled": return "bg-blue-500/10 text-blue-600 border-blue-200";
    case "in progress": return "bg-amber-500/10 text-amber-600 border-amber-200";
    case "delivered": return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
    case "cancelled": return "bg-rose-500/10 text-rose-600 border-rose-200";
    default: return "bg-slate-100 text-slate-600";
  }
};

export default function Trips() {
  const { data: trips, isLoading } = useTrips();
  const deleteMutation = useDeleteTrip();
  
  const [selectedTrip, setSelectedTrip] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  // SEARCH: Filters by Truck License or Driver Name
  const filtered = (trips || []).filter(t => 
    (t.truck || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.driver || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Trip Management</h2>
          <p className="text-sm text-muted-foreground font-medium">Monitor active shipments and real-time movement.</p>
        </div>
        <PermissionGuard>
          <Button onClick={() => setOpenCreate(true)} className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" /> Create Trip
          </Button>
        </PermissionGuard>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          className="pl-10" 
          placeholder="Search by truck or driver..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      {/* TABLE SECTION */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/30 border-b text-muted-foreground font-semibold">
              <th className="p-4 text-left">TRUCK LICENSE</th>
              <th className="p-4 text-left">DRIVER NAME</th>
              <th className="p-4 text-left">ROUTE</th>
              <th className="p-4 text-left">STATUS</th>
              <th className="p-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((trip) => (
              <tr key={trip.id} className="border-b hover:bg-muted/30 transition-all">
                <td className="p-4 font-bold text-foreground">{trip.truck}</td>
                <td className="p-4 font-medium text-foreground/80">{trip.driver}</td>
                <td className="p-4 text-muted-foreground">{trip.origin} → {trip.destination}</td>
                <td className="p-4">
                  <Badge variant="outline" className={`capitalize px-2.5 py-0.5 rounded-full ${getStatusBadgeStyles(trip.status)}`}>
                    {trip.status}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    {/* MOVEMENT PULSE INDICATOR */}
                    <div className="relative flex h-2 w-2">
                      {trip.aiMovementDetected && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      )}
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${trip.aiMovementDetected ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                    </div>
                    <Button variant="outline" size="sm" className="font-semibold" onClick={() => setSelectedTrip(trip)}>
                      View Profile
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SLIDING PROFILE SHEET */}
      <Sheet open={!!selectedTrip} onOpenChange={() => setSelectedTrip(null)}>
        <SheetContent className="sm:max-w-md flex flex-col h-full p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="flex items-center gap-2 text-xl font-bold">
              <Navigation className="h-5 w-5 text-primary fill-primary/10" /> 
              Trip Profile: {selectedTrip?.tripId}
            </SheetTitle>
          </SheetHeader>

          {selectedTrip && (
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none">
              
              {/* 1. GPS TRACKING SECTION */}
<section className="space-y-4">
  <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
    <MapPin className="h-4 w-4" /> Live Tracking
  </Label>

  <div className="h-64 w-full relative">
  {selectedTrip.currentLocation?.latitude !== undefined &&
   selectedTrip.currentLocation?.longitude !== undefined &&
   selectedTrip.destinationLocation?.latitude !== undefined &&
   selectedTrip.destinationLocation?.longitude !== undefined ? (
    <LiveTripMap
      key={selectedTrip._id}
      current={selectedTrip.currentLocation}
      destination={selectedTrip.destinationLocation}
    />
  ) : (
    <div className="h-full w-full bg-muted rounded-lg flex items-center justify-center">
      <p className="text-xs text-muted-foreground">
        Awaiting coordinates...
      </p>
    </div>
  )}
</div>

</section>

             {/* 2. DRIVING ANALYTICS */}
<section className="space-y-4">
  <Label className="font-bold flex items-center gap-2 text-primary uppercase text-[10px] tracking-widest">
    <BarChart3 className="h-4 w-4" /> Driving Metrics
  </Label>
  <div className="grid grid-cols-2 gap-4">
    <div className="p-4 border rounded-xl bg-card shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-[10px] font-bold">AVG SPEED</Label>
        <Zap className="h-3 w-3 text-amber-500" />
      </div>
      {/* FIXED: Added optional chaining to prevent crash */}
      <p className="text-lg font-black">
        {selectedTrip.drivingMetrics?.averageSpeed ?? 0} 
        <span className="text-[10px] font-normal"> km/h</span>
      </p>
    </div>
    
    <div className="p-4 border rounded-xl bg-card shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-[10px] font-bold">MAX SPEED</Label>
        <Gauge className="h-3 w-3 text-rose-500" />
      </div>
      <p className="text-lg font-black">
        {selectedTrip.drivingMetrics?.maxSpeed ?? 0} 
        <span className="text-[10px] font-normal"> km/h</span>
      </p>
    </div>

    <div className="p-4 border rounded-xl bg-card shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-[10px] font-bold">TOTAL DIST.</Label>
        <Activity className="h-3 w-3 text-blue-500" />
      </div>
      <p className="text-lg font-black">
        {selectedTrip.drivingMetrics?.totalDistanceCovered ?? 0} 
        <span className="text-[10px] font-normal"> km</span>
      </p>
    </div>

    <div className="p-4 border rounded-xl bg-card shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-[10px] font-bold">TIME ELAPSED</Label>
        <Timer className="h-3 w-3 text-primary" />
      </div>
      <p className="text-lg font-black">
        {selectedTrip.drivingMetrics?.totalDrivingTime ?? 0} 
        <span className="text-[10px] font-normal"> mins</span>
      </p>
    </div>
  </div>
</section>
              {/* 3. SHIPMENT DETAILS */}
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
            </div>
          )}

          <PermissionGuard>
          <SheetFooter className="p-6 border-t bg-muted/10">
            <div className="flex w-full gap-4">
              <Button className="flex-1 gap-2 h-11" variant="outline" onClick={() => setOpenUpdate(true)}>
                <Edit3 className="h-4 w-4" /> Edit Trip
              </Button>
              <Button 
                className="flex-1 gap-2 h-11" 
                variant="destructive" 
                onClick={() => { if(confirm("Permanently delete this trip record?")) deleteMutation.mutateAsync(selectedTrip.id); }}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
          </SheetFooter>
          </PermissionGuard>
        </SheetContent>
      </Sheet>

      <CreateTripDialog open={openCreate} onClose={() => setOpenCreate(false)} />
      {selectedTrip && <UpdateTripDialog open={openUpdate} onClose={() => setOpenUpdate(false)} trip={selectedTrip} />}
    </div>
  );
}