import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  AlertTriangle, 
  Clock, 
  Truck, 
  User, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  ShieldAlert, 
  Info 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  useAlerts, 
  useAlertStats, 
  useAcknowledgeAlert, 
  useResolveAlert 
} from '@/hooks/useAlerts';

/**
 * Maps severity to UI styles based on backend enum: 
 * ['low', 'medium', 'high', 'critical']
 */
const getSeverityStyles = (severity: string) => {
  const s = severity?.toLowerCase();
  switch (s) {
    case 'critical':
      return {
        badge: 'bg-red-600 text-white border-red-700',
        border: 'border-l-red-600',
        icon: 'text-red-600',
        IconComponent: ShieldAlert
      };
    case 'high':
      return {
        badge: 'bg-destructive/10 text-destructive border-destructive/20',
        border: 'border-l-destructive',
        icon: 'text-destructive',
        IconComponent: AlertTriangle
      };
    case 'medium':
      return {
        badge: 'bg-warning/10 text-warning border-warning/20',
        border: 'border-l-warning',
        icon: 'text-warning',
        IconComponent: Clock
      };
    case 'low':
    default:
      return {
        badge: 'bg-info/10 text-info border-info/20',
        border: 'border-l-info',
        icon: 'text-info',
        IconComponent: Info
      };
  }
};

export default function Alerts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'acknowledged' | 'resolved'>('all');

  // React Query Hooks
  const { data: alerts, isLoading: alertsLoading } = useAlerts();
  const { data: stats } = useAlertStats();
  const acknowledgeMutation = useAcknowledgeAlert();
  const resolveMutation = useResolveAlert();

  // Client-side filtering
  const filteredAlerts = (alerts || []).filter(alert => {
    const matchesSearch = 
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.truck.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.driver.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'active') return matchesSearch && !alert.acknowledged && !alert.resolved;
    if (filter === 'acknowledged') return matchesSearch && alert.acknowledged && !alert.resolved;
    if (filter === 'resolved') return matchesSearch && alert.resolved;
    return matchesSearch;
  });

  if (alertsLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-primary opacity-50" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Alerts</h2>
        <p className="text-muted-foreground">Real-time fleet monitoring and incident response</p>
      </div>

      {/* Stats Cards - Connected to Backend Aggregate Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button 
          onClick={() => setFilter('all')} 
          className={`kpi-card text-left transition-all hover:shadow-md ${filter === 'all' ? 'ring-2 ring-primary bg-primary/5' : 'bg-card'}`}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <span className="text-lg font-bold">{stats?.total || 0}</span>
            </div>
            <div><p className="text-sm text-muted-foreground">Total</p><p className="font-semibold">All Alerts</p></div>
          </div>
        </button>

        <button 
          onClick={() => setFilter('active')} 
          className={`kpi-card text-left transition-all hover:shadow-md ${filter === 'active' ? 'ring-2 ring-destructive bg-destructive/5' : 'bg-card'}`}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <span className="text-lg font-bold text-destructive">{stats?.active || 0}</span>
            </div>
            <div><p className="text-sm text-muted-foreground">Active</p><p className="font-semibold">Require Action</p></div>
          </div>
        </button>

        <button 
          onClick={() => setFilter('acknowledged')} 
          className={`kpi-card text-left transition-all hover:shadow-md ${filter === 'acknowledged' ? 'ring-2 ring-warning bg-warning/5' : 'bg-card'}`}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <span className="text-lg font-bold text-warning">{stats?.acknowledged || 0}</span>
            </div>
            <div><p className="text-sm text-muted-foreground">Acknowledged</p><p className="font-semibold">In Progress</p></div>
          </div>
        </button>

        <button 
          onClick={() => setFilter('resolved')} 
          className={`kpi-card text-left transition-all hover:shadow-md ${filter === 'resolved' ? 'ring-2 ring-success bg-success/5' : 'bg-card'}`}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <span className="text-lg font-bold text-success">{stats?.resolved || 0}</span>
            </div>
            <div><p className="text-sm text-muted-foreground">Resolved</p><p className="font-semibold">Completed</p></div>
          </div>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search by truck, driver or message..." 
          className="pl-10" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      {/* Alert Cards List */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => {
            const { badge, border, icon, IconComponent } = getSeverityStyles(alert.severity);
            
            return (
              <div 
                key={alert.id} 
                className={`bg-card rounded-xl border border-border border-l-4 ${border} p-5 transition-all shadow-sm ${
                  alert.resolved ? 'opacity-60 grayscale-[0.5]' : ''
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Severity Icon */}
                    <div className={`h-10 w-10 rounded-lg ${badge} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className={`h-5 w-5 ${icon}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-semibold text-foreground">{alert.type}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${badge}`}>
                          {alert.severity}
                        </span>
                        {alert.acknowledged && !alert.resolved && (
                          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-muted text-muted-foreground">
                            Monitoring
                          </span>
                        )}
                      </div>
                      
                      <p className="text-foreground text-sm mb-3 line-clamp-2">{alert.message}</p>
                      
                      {/* Meta Data */}
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5 font-medium text-foreground/80">
                          <Truck className="h-3.5 w-3.5" />
                          {alert.truck}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" />
                          {alert.driver}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {alert.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 lg:ml-auto">
                    {!alert.acknowledged && !alert.resolved && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-9"
                        onClick={() => acknowledgeMutation.mutate(alert.id)} 
                        disabled={acknowledgeMutation.isPending}
                      >
                        {acknowledgeMutation.isPending ? (
                          <Loader2 className="animate-spin h-4 w-4" />
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Acknowledge
                          </>
                        )}
                      </Button>
                    )}
                    
                    {!alert.resolved && (
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="h-9"
                        onClick={() => resolveMutation.mutate({ id: alert.id, outcome: 'support_intervened' })} 
                        disabled={resolveMutation.isPending}
                      >
                        {resolveMutation.isPending ? (
                          <Loader2 className="animate-spin h-4 w-4" />
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 mr-2" />
                            Resolve
                          </>
                        )}
                      </Button>
                    )}

                    {alert.resolved && (
                      <div className="flex items-center gap-1.5 text-success font-medium text-sm px-2">
                        <CheckCircle className="h-4 w-4" />
                        Closed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-muted">
            <Info className="h-10 w-10 text-muted-foreground mb-3 opacity-20" />
            <p className="text-muted-foreground font-medium">No alerts found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}