import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Trip } from "@/utils/driver";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

interface TripCardProps {
  trip: Trip;
  onClick?: () => void;
  compact?: boolean;
}

export const TripCard = ({
  trip,
  onClick,
  compact = false,
}: TripCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "card-elevated p-4 transition-all active:scale-[0.98]",
        onClick && "cursor-pointer hover:shadow-md"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground">
          {trip.id}
        </span>
        <StatusBadge status={trip.status} />
      </div>

      <div className="space-y-3">
        {/* Route */}
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-success border-2 border-success/30" />
            <div className="w-0.5 h-8 bg-border my-1" />
            <div className="w-3 h-3 rounded-full bg-primary border-2 border-primary/30" />
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <p className="font-medium text-sm">
                {trip.pickupLocation}
              </p>
              {!compact && trip.pickupAddress && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {trip.pickupAddress}
                </p>
              )}
            </div>

            <div>
              <p className="font-medium text-sm">
                {trip.dropLocation}
              </p>
              {!compact && trip.dropAddress && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {trip.dropAddress}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {trip.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {trip.date}
              </span>
            )}

            {trip.distance && <span>{trip.distance}</span>}
          </div>

          {onClick && (
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>
    </div>
  );
};
