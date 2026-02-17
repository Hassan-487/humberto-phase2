

import { useState } from "react";
import { 
  Plus, Search, Loader2, Trash2, Edit3, Navigation, CircleX
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useTrips, useCancelTrip, useDeleteTrip } from "@/hooks/useTrips"; 
import { CreateTripDialog } from "@/components/CreateTripDialog";
import { UpdateTripDialog } from "@/components/UpdateTripDialog";
import { PermissionGuard } from "@/components/PermissionGuard";
import { TripProfileSheet } from "@/components/TripDetailSheet";
import { useTranslation } from 'react-i18next';

const getStatusBadgeStyles = (status: string) => {
  switch (status?.toLowerCase()) {
    
    case "scheduled": return "bg-blue-500/10 text-blue-600 border-blue-200";
    case "in_progress": return "bg-amber-500/10 text-amber-600 border-amber-200";
    case "delivered": return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
    case "cancelled": return "bg-rose-500/10 text-rose-600 border-rose-200";
    default: return "bg-slate-100 text-slate-600";
  }
};

export default function Trips() {
  const { data: trips, isLoading } = useTrips();
  const cancelMutation = useCancelTrip();
  const deleteMutation = useDeleteTrip();
  const { t } = useTranslation();

  const [selectedTrip, setSelectedTrip] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  // SEARCH: Filters by Truck License or Driver Name
 const filtered = (trips || []).filter((trip) => {
  const term = searchTerm.toLowerCase();

  return (
    trip.tripId?.toLowerCase().includes(term) ||        // ✅ Trip Number
    trip.truck?.toLowerCase().includes(term) ||         // Truck Number
    trip.driver?.toLowerCase().includes(term)        // Driver
       
  );
});


  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t('trips.title')}
          </h2>
          <p className="text-sm text-muted-foreground font-medium">
            {t('trips.description')}
          </p>
        </div>
        <PermissionGuard>
          <Button onClick={() => setOpenCreate(true)} className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" /> {t('trips.createTrip')}
          </Button>
        </PermissionGuard>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          className="pl-10" 
          placeholder={t('trips.search')}
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      {/* TABLE SECTION */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
  <table className="w-full text-sm">
    <thead>
      <tr className="bg-muted/30 border-b text-muted-foreground font-semibold">
      <th className="p-4 text-left">{t('trips.tripNumber')}</th>
        <th className="p-4 text-left">{t('trips.truckNumber')}</th>
        <th className="p-4 text-left">{t('trips.driverName')}</th>
        <th className="p-4 text-left">{t('trips.route')}</th>
        <th className="p-4 text-left">{t('trips.progress')}</th>
        <th className="p-4 text-left">{t('trips.status')}</th>
        <th className="p-4 text-right">{t('trips.action')}</th>
      </tr>
    </thead>

    <tbody>
      {filtered.map((trip) => {
        // ✅ normalize backend status safely
        const normalizedStatus = trip.status
          ?.toLowerCase()
          .trim()
          .replace(/\s+/g, "_");

        return (
          <tr key={trip.id} className="border-b hover:bg-muted/30 transition-all">
            <td className="p-4 font-bold text-foreground">{trip.tripId}</td>
            <td className="p-4 font-bold text-foreground">{trip.truck}</td>
            <td className="p-4 font-medium text-foreground/80">{trip.driver}</td>
            <td className="p-4 text-muted-foreground">
              {trip.origin} → {trip.destination}
            </td>
            <td className="p-4">
  <div className="w-full max-w-[120px]">
    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-emerald-500 transition-all"
        style={{ width: `${trip.progress}%` }}
      />
    </div>
    <p className="text-[10px] text-muted-foreground mt-1">
      {trip.progress.toFixed(0)}%
    </p>
  </div>
</td>


            <td className="p-4">
              <Badge
                variant="outline"
                className={`capitalize px-2.5 py-0.5 rounded-full ${getStatusBadgeStyles(normalizedStatus)}`}
              >
                {t(`status.${normalizedStatus}`)}
              </Badge>
            </td>

            <td className="p-4 text-right">
              <div className="flex items-center justify-end gap-3">
                {/* MOVEMENT PULSE INDICATOR */}
                <div className="relative flex h-2 w-2">
                  {trip.aiMovementDetected && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      trip.aiMovementDetected ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  ></span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="font-semibold"
                  onClick={() => setSelectedTrip(trip)}
                >
                  {t('trips.viewProfile')}
                </Button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


      {/* SLIDING PROFILE SHEET */}
      <Sheet open={!!selectedTrip} onOpenChange={() => setSelectedTrip(null)}>
        <SheetContent className="sm:max-w-md flex flex-col h-full p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="flex items-center gap-2 text-xl font-bold">
              <Navigation className="h-5 w-5 text-primary fill-primary/10" /> 
              {t('trips.tripProfile')}: {selectedTrip?.tripId}
            </SheetTitle>
          </SheetHeader>

          <TripProfileSheet
            selectedTrip={selectedTrip}
            getStatusBadgeStyles={getStatusBadgeStyles}
          />

          <PermissionGuard>
            <SheetFooter className="p-6 border-t bg-muted/10">
              <div className="flex w-full gap-4">
                <Button
                  className="flex-1 gap-2 h-11"
                  variant="outline"
                  onClick={() => setOpenUpdate(true)}
                >
                  <Edit3 className="h-4 w-4" /> {t('trips.editTrip')}
                </Button>

                {selectedTrip?.status !== "cancelled" ? (
                  <Button
                    className="flex-1 gap-2 h-11"
                    variant="destructive"
                    onClick={() => {
                      if (confirm(t('trips.cancelConfirm'))) {
                        cancelMutation.mutateAsync(selectedTrip.id);
                      }
                    }}
                    disabled={cancelMutation.isPending}
                  >
                    <CircleX className="h-4 w-4" /> {t('trips.cancel')}
                  </Button>
                ) : (
                  <Button
                    className="flex-1 gap-2 h-11"
                    variant="destructive"
                    onClick={() => {
                      if (confirm(t('trips.deleteConfirm'))) {
                        deleteMutation.mutateAsync(selectedTrip.id);
                      }
                    }}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" /> {t('trips.delete')}
                  </Button>
                )}
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