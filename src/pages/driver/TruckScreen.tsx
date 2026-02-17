

import { AppLayout } from '@/components/layout/Driverlayout/AppLayout';
import { PageHeader } from '@/components/layout/Driverlayout/PageHeader';
import { useInTransitTrip, useAssignedTrips } from '@/hooks/usedriverportal';
import {
  Truck,
  Gauge,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const TruckScreen = () => {
  const { data: inTransitTrip, isLoading: loadingTransit } = useInTransitTrip();
  const { data: assignedTrips = [], isLoading: loadingAssigned } = useAssignedTrips();
  const { t } = useTranslation();

  const truck = inTransitTrip?.truck || assignedTrips[0]?.truck;
  const isLoading = loadingTransit || loadingAssigned;

  if (isLoading) {
    return (
      <AppLayout>
        <PageHeader title={t("driverTruck.title")} />
        <div className="px-4 py-12 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground mt-4">
            {t("driverTruck.loading")}
          </p>
        </div>
      </AppLayout>
    );
  }

  if (!truck) {
    return (
      <AppLayout>
        <PageHeader title={t("driverTruck.title")} />
        <div className="px-4 py-12 text-center space-y-4">
          <Truck className="w-16 h-16 mx-auto text-muted-foreground" />
          <div>
            <p className="font-medium">
              {t("driverTruck.noTruckTitle")}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("driverTruck.noTruckDesc")}
            </p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const getTruckStatus = () => {
    if (inTransitTrip) {
      return {
        label: t("driverTruck.status.active"),
        color: 'bg-success text-success-foreground',
      };
    }
    if (assignedTrips.length > 0) {
      return {
        label: t("driverTruck.status.assigned"),
        color: 'bg-primary/20 text-primary',
      };
    }
    return {
      label: t("driverTruck.status.idle"),
      color: 'bg-muted text-muted-foreground',
    };
  };

  const truckStatus = getTruckStatus();

  return (
    <AppLayout>
      <PageHeader title={t("driverTruck.title")} />

      <div className="px-4 pb-6 space-y-5">
        {/* Truck Card */}
        <div className="card-elevated p-5 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Truck className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">{truck.plate}</h2>
          <p className="text-muted-foreground">{truck.model}</p>
          <span
            className={cn(
              'inline-block mt-3 px-4 py-1.5 rounded-full text-sm font-medium',
              truckStatus.color
            )}
          >
            {truckStatus.label}
          </span>
        </div>

        {/* Current Trip */}
        {inTransitTrip && (
          <div className="card-elevated p-4">
            <h3 className="font-semibold mb-3">
              {t("driverTruck.currentTrip")}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {t("driverTruck.tripNumber")}
                </span>
                <span className="font-medium">
                  {inTransitTrip.tripNumber}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {t("driverTruck.from")}
                </span>
                <span className="font-medium">
                  {inTransitTrip.origin}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {t("driverTruck.to")}
                </span>
                <span className="font-medium">
                  {inTransitTrip.destination}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {t("driverTruck.cargo")}
                </span>
                <span className="font-medium">
                  {inTransitTrip.cargo}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Vehicle Details */}
        <div className="card-elevated p-4">
          <h3 className="font-semibold mb-4">
            {t("driverTruck.vehicleDetails")}
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <Truck className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-muted-foreground">
                  {t("driverTruck.licensePlate")}
                </span>
              </div>
              <span className="font-medium">{truck.plate}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <Gauge className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-muted-foreground">
                  {t("driverTruck.model")}
                </span>
              </div>
              <span className="font-medium">{truck.model}</span>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-muted-foreground">
                  {t("driverTruck.statusLabel")}
                </span>
              </div>
              <span className="font-medium">
                {truckStatus.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TruckScreen;
