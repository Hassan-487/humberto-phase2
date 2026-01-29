

import { useEffect, useState } from 'react';
import { Truck, Route, Users, AlertTriangle } from 'lucide-react';

import { KPICard } from '@/components/dashboard/KPICard';
import { AlertsTable } from '@/components/dashboard/AlertsTable';
import { TripsTable } from '@/components/dashboard/TripsTable';

import { dashboardService } from '@/services/dashboard.service';


export default function Dashboard() {
  const [kpiData, setKpiData] = useState({
    totalTrucks: 0,
    activeTrips: 0,
    driversOnDuty: 0,
    criticalAlerts: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await dashboardService.getKPIData();
        setKpiData(data);
      } catch (error) {
        console.error('Failed to load dashboard KPI data', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="text-muted-foreground">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Trucks"
          value={kpiData.totalTrucks}
          icon={Truck}
          variant="primary"
          trend={{ value: 8, isPositive: true }}
        />
        <KPICard
          title="Active Trips"
          value={kpiData.activeTrips}
          icon={Route}
          variant="success"
          trend={{ value: 12, isPositive: true }}
        />
        <KPICard
          title="Drivers On Duty"
          value={kpiData.driversOnDuty}
          icon={Users}
          variant="default"
          trend={{ value: 5, isPositive: true }}
        />
        <KPICard
          title="Critical Alerts"
          value={kpiData.criticalAlerts}
          icon={AlertTriangle}
          variant="danger"
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AlertsTable />
        <TripsTable />
      </div>
    </div>
  );
}
