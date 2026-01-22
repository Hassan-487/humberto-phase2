import { AppLayout } from '@/components/layout/Driverlayout/AppLayout';
import { PageHeader } from '@/components/layout/Driverlayout/PageHeader';
import { mockTruck } from '@/data/demoData';
import { 
  Truck, 
  Gauge, 
  Fuel, 
  Wrench, 
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const TruckScreen = () => {
  const truck = mockTruck;
  
  const statusConfig = {
    active: { label: 'Active', color: 'bg-success text-success-foreground' },
    maintenance: { label: 'In Maintenance', color: 'bg-warning text-warning-foreground' },
    idle: { label: 'Idle', color: 'bg-muted text-muted-foreground' },
  };

  return (
    <AppLayout>
      <PageHeader title="My Truck" />
      
      <div className="px-4 pb-6 space-y-5">
        {/* Truck Card */}
        <div className="card-elevated p-5 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Truck className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">{truck.number}</h2>
          <p className="text-muted-foreground">{truck.model}</p>
          <span className={cn(
            'inline-block mt-3 px-4 py-1.5 rounded-full text-sm font-medium',
            statusConfig[truck.status].color
          )}>
            {statusConfig[truck.status].label}
          </span>
        </div>

        {/* Fuel Level */}
        <div className="card-elevated p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Fuel className="w-4 h-4" />
              Fuel Level
            </h3>
            <span className="font-bold text-lg">{truck.fuelLevel}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn(
                'h-full rounded-full transition-all',
                truck.fuelLevel > 50 ? 'bg-success' : 
                truck.fuelLevel > 25 ? 'bg-warning' : 'bg-destructive'
              )}
              style={{ width: `${truck.fuelLevel}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {truck.fuelLevel > 25 ? (
              <span className="flex items-center gap-1 text-success">
                <CheckCircle2 className="w-3 h-3" />
                Fuel level is adequate
              </span>
            ) : (
              <span className="flex items-center gap-1 text-destructive">
                <AlertCircle className="w-3 h-3" />
                Refuel soon
              </span>
            )}
          </p>
        </div>

        {/* Truck Details */}
        <div className="card-elevated p-4">
          <h3 className="font-semibold mb-4">Vehicle Details</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <Truck className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-muted-foreground">Model</span>
              </div>
              <span className="font-medium">{truck.model}</span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <Gauge className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-muted-foreground">Capacity</span>
              </div>
              <span className="font-medium">{truck.capacity}</span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <Gauge className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-muted-foreground">Mileage</span>
              </div>
              <span className="font-medium">{truck.mileage}</span>
            </div>
          </div>
        </div>

        {/* Service Info */}
        <div className="card-elevated p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Service Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Last Service</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="font-semibold">{truck.lastService}</span>
              </div>
            </div>
            <div className="bg-accent/10 rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Next Service</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="font-semibold text-accent">{truck.nextService}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TruckScreen;
