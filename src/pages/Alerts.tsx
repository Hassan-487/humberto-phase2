

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertTriangle,
  Clock,
  Truck,
  User,
  XCircle,
  Loader2,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAlerts, useResolveAlert } from '@/hooks/useAlerts';

const getSeverityStyles = (severity: string) => {
  switch (severity) {
    case 'resolved':
      return {
        badge: 'bg-success/10 text-success',
        border: 'border-l-success',
        Icon: ShieldCheck,
      };
    case 'critical':
      return {
        badge: 'bg-red-600 text-white',
        border: 'border-l-red-600',
        Icon: AlertTriangle,
      };
    case 'high':
      return {
        badge: 'bg-destructive/10 text-destructive',
        border: 'border-l-destructive',
        Icon: AlertTriangle,
      };
    case 'medium':
      return {
        badge: 'bg-warning/10 text-warning',
        border: 'border-l-warning',
        Icon: Clock,
      };
    default:
      return {
        badge: 'bg-info/10 text-info',
        border: 'border-l-info',
        Icon: Info,
      };
  }
};

export default function Alerts() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: alerts = [], isLoading } = useAlerts();
  const resolveMutation = useResolveAlert();

  const filteredAlerts = alerts.filter((a) => {
    const driverName = a.driver
      ? `${a.driver.firstName} ${a.driver.lastName}`.toLowerCase()
      : '';

    return (
      a.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.truck?.licensePlate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driverName.includes(searchTerm.toLowerCase())
    );
  });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('alerts.title')}</h2>

      <Input
        placeholder={t('alerts.searchPlaceholder')}
        className="max-w-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const { badge, border, Icon } = getSeverityStyles(alert.severity);
          const isResolved = alert.severity === 'resolved';

          return (
            <div
              key={alert._id}
              className={`border-l-4 ${border} p-5 rounded-xl bg-card ${
                isResolved ? 'opacity-80' : ''
              }`}
            >
              <div className="flex gap-4">
                <div className={`h-10 w-10 rounded-lg ${badge} flex items-center justify-center`}>
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <p className="font-semibold">{alert.message}</p>

                  <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                    <span className="flex items-center gap-1">
                      <Truck className="h-3 w-3" />
                      {alert.truck.licensePlate}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {alert.driver
                        ? `${alert.driver.firstName} ${alert.driver.lastName}`
                        : t('drivers.unassigned')}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(alert.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {!isResolved && (
                  <Button
                    size="sm"
                    onClick={() => resolveMutation.mutate(alert._id)}
                    disabled={resolveMutation.isPending}
                  >
                    {resolveMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      t('alerts.resolve')
                    )}
                  </Button>
                )}
              </div>
            </div>
          );
        })}

        {filteredAlerts.length === 0 && (
          <div className="text-center text-muted-foreground py-10">
            {t('alerts.noAlerts')}
          </div>
        )}
      </div>
    </div>
  );
}