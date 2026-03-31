

import { useState, useEffect } from "react";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { STATUS_BADGE_STYLES, STATUS_LABELS } from "@/lib/tripStatusUtils";
import { TripDetailPage } from "@/components/trips/TripDetailSheet";
import { CreateTripPage } from "@/components/trips/CreateTripDialog";
import { useTrips } from "@/hooks/useTrips";
import { Trip } from "@/services/trip.service";

export default function Trips() {
  const { data: trips = [], isLoading } = useTrips();

  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  // 🔎 Search Filter
  const filtered = trips.filter((t: any) => {
    const term = searchTerm.toLowerCase();

    return (
      t.tripNumber?.toLowerCase().includes(term) ||
      t.truck?.toLowerCase().includes(term) ||
      t.driver?.toLowerCase().includes(term) ||
      (t.customer || "").toLowerCase().includes(term)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  // 🔄 Status Update (local UI only)
  const handleStatusUpdate = (tripNumber: string, newStatus: string) => {
    if (selectedTrip?.tripNumber === tripNumber) {
      setSelectedTrip((prev) =>
        prev ? { ...prev, status: newStatus } : prev
      );
    }
  };

  // 🔄 Loading State
  if (isLoading) {
    return <div className="p-6">Loading trips...</div>;
  }

  // ───────── Trip Detail Page ─────────
  if (selectedTrip) {
    return (
      <TripDetailPage
        trip={selectedTrip}
        onBack={() => setSelectedTrip(null)}
        onStatusUpdate={handleStatusUpdate}
      />
    );
  }

  // ───────── Create Trip Page ─────────
  if (isCreating) {
    return (
      <CreateTripPage
        onBack={() => setIsCreating(false)}
        onCreated={() => setIsCreating(false)}
      />
    );
  }

  // ───────── Trips List Page ─────────
  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Trip Management
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Manage all trips across the full lifecycle
          </p>
        </div>

        <Button
          onClick={() => setIsCreating(true)}
          className="gap-2 shadow-sm w-fit"
        >
          <Plus className="h-4 w-4" />
          Create Trip
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        <Input
          className="pl-10"
          placeholder="Search by trip number, truck, driver..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            {/* Header */}
            <thead>
              <tr className="bg-muted/40 border-b text-muted-foreground text-xs uppercase tracking-wide font-semibold">
                <th className="p-4 text-left">Trip #</th>
                {/* <th className="p-4 text-left">Booking #</th> */}
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Truck</th>
                <th className="p-4 text-left">Driver</th>
                <th className="p-4 text-left">Route</th>
                <th className="p-4 text-left">Pickup Time</th>
                <th className="p-4 text-left">Destination Time</th>
                <th className="p-4 text-left">Total Containers</th>
                <th className="p-4 text-left">LFD</th>
                <th className="p-4 text-left">Progress</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-border/60">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={13} className="p-12 text-center text-muted-foreground">
                    No trips found.
                  </td>
                </tr>
              ) : (
                paginated.map((trip: any) => (
                  <tr
                    key={trip.id}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="p-4 font-bold text-foreground">
                      {trip.tripNumber}
                    </td>

                    {/* <td className="p-4">
                      {trip.bookingNumber || "-"}
                    </td> */}

                    <td className="p-4">
                      {trip.customer || "-"}
                    </td>

                    <td className="p-4">
                      {trip.truck}
                    </td>

                    <td className="p-4">
                      {trip.driver}
                    </td>

                    <td className="p-4 text-xs text-muted-foreground">
                      {trip.origin} → {trip.destination}
                    </td>

                    <td className="p-4 text-xs">
                      {trip.pickupTime || "-"}
                    </td>

                    <td className="p-4 text-xs">
                      {trip.destinationTime || "-"}
                    </td>

                    <td className="p-4">
                      {trip.containers || 0}
                    </td>

                    <td className="p-4">
                      {trip.LFD || "-"}
                    </td>

                    {/* Progress */}
                    <td className="p-4">
                      <div className="w-28">
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all"
                            style={{ width: `${trip.progress || 0}%` }}
                          />
                        </div>

                        <p className="text-[10px] mt-1 text-muted-foreground">
                          {trip.progress || 0}%
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={`text-xs rounded-full capitalize ${STATUS_BADGE_STYLES[trip.status]}`}
                      >
                        {STATUS_LABELS[trip.status] ?? trip.status}
                      </Badge>
                    </td>

                    {/* ✅ Action (NO HOVER NOW) */}
                    <td className="p-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTrip(trip)}
                      >
                        View Detail
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Showing {Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)}
          –
          {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} trips
        </p>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm font-medium px-2">
            {page} / {totalPages}
          </span>

          <Button
            size="sm"
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

    </div>
  );
}