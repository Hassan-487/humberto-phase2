// Types stay SAME as your UI expects
export interface KPIData {
  totalTrucks: number;
  activeTrips: number;
  driversOnDuty: number;
  criticalAlerts: number;
}

export interface DashboardAlert {
  id: number;
  type: string;
  severity: 'Low' | 'Medium' | 'High';
  message: string;
  timestamp: string;
  truck: string;
  driver: string;
}

export interface DashboardTrip {
  id: number;
  tripId: string;
  driver: string;
  origin: string;
  destination: string;
  status: string;
  progress: number;
  aiEstimatedArrivalTime: string;
}

const getStoredDashboard = () => {
  const raw = localStorage.getItem("dashboard");
  if (!raw) throw new Error("Dashboard not found");
  return JSON.parse(raw);
};

export const dashboardService = {
  async getKPIData(): Promise<KPIData> {
    const dashboard = getStoredDashboard();

    return {
      totalTrucks: dashboard.summary.trucks.total,
      activeTrips: dashboard.summary.trips.active,
      driversOnDuty: dashboard.summary.drivers.available,
      criticalAlerts: dashboard.alerts.criticalCount,
    };
  },

  async getRecentAlerts(limit = 5): Promise<DashboardAlert[]> {
    const dashboard = getStoredDashboard();

    return dashboard.alerts.critical.slice(0, limit).map((alert: any, index: number) => ({
      id: index,
      type: alert.severity === 'critical' ? 'Critical' : 'Warning',
      severity: 'High',
      message: alert.message,
      timestamp: alert.timeIntervals?.[0] ?? "N/A",
      truck: alert.truck?.plate ?? 'Null',
      driver: alert.driver.name,
    }));
  },

  async getActiveTrips(limit = 5): Promise<DashboardTrip[]> {
    const dashboard = getStoredDashboard();

    return dashboard.activeTrips.trips.slice(0, limit).map((trip: any, index: number) => ({
      id: index,
      tripId: trip.truck?.plate ?? 'Null',
      driver: trip.driver.name,
      origin: trip.origin,
      destination: trip.destination,
      status: trip.status === 'in_progress' ? 'Active' : trip.status,
      progress: 50, // backend not sending yet
      aiEstimatedArrivalTime: new Date(trip.estimatedArrival).toLocaleString(
  'en-US',
  {
    timeZone: 'America/Mexico_City',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }
),

    }));
  },
};
