


import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { dashboardService } from "@/services/dashboard.service";

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Active":
      return "status-badge status-active";
    case "Delayed":
      return "status-badge status-delayed";
    case "Completed":
      return "status-badge status-completed";
    default:
      return "status-badge";
  }
};

export function TripsTable() {
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    const loadTrips = async () => {
      const data = await dashboardService.getActiveTrips(5);
      setTrips(data);
    };

    loadTrips();
  }, []);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">
          Active Trips
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Truck Plate</th>
              <th>Driver</th>
              <th>Route</th>
              <th>Status</th>
              <th>ETA</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id}>
                <td className="font-medium text-foreground">
                  {trip.tripId}
                </td>
                <td className="text-foreground">{trip.driver}</td>
                <td className="text-muted-foreground">
                  <div className="flex flex-col">
                    <span className="text-xs">{trip.origin}</span>
                    <span className="text-xs">
                      → {trip.destination}
                    </span>
                  </div>
                </td>
                <td>
                  <span className={getStatusBadgeClass(trip.status)}>
                    {trip.status}
                  </span>
                </td>
                <td className="text-muted-foreground">{trip.aiEstimatedArrivalTime}</td>
              </tr>
            ))}

            {trips.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted-foreground py-6">
                  No active trips
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
