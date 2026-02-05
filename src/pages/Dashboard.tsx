

import { useEffect, useState } from 'react';
import { Truck, Route, Users, AlertTriangle } from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { AlertsTable } from '@/components/dashboard/AlertsTable';
import { TripsTable } from '@/components/dashboard/TripsTable';
import { dashboardService } from '@/services/dashboard.service';
// 1. Import the hook
import { useTranslation } from 'react-i18next'; 

export default function Dashboard() {
  // 2. Initialize the translation function
  const { t } = useTranslation(); 
  
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
    // 3. Translate the loading state too!
    return <div className="text-muted-foreground">{t('dashboard.loading')}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          // 4. Use the t() function for titles
          title={t('dashboard.totalTrucks')}
          value={kpiData.totalTrucks}
          icon={Truck}
          variant="primary"
          trend={{ value: 8, isPositive: true }}
        />
        <KPICard
          title={t('dashboard.activeTrips')}
          value={kpiData.activeTrips}
          icon={Route}
          variant="success"
          trend={{ value: 12, isPositive: true }}
        />
        <KPICard
          title={t('dashboard.driversOnDuty')}
          value={kpiData.driversOnDuty}
          icon={Users}
          variant="default"
          trend={{ value: 5, isPositive: true }}
        />
        <KPICard
          title={t('dashboard.criticalAlerts')}
          value={kpiData.criticalAlerts}
          icon={AlertTriangle}
          variant="danger"
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AlertsTable />
        <TripsTable />
      </div>
    </div>
  );
}