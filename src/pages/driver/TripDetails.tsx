// import { useParams } from "react-router-dom";
// import { AppLayout } from "@/components/layout/Driverlayout/AppLayout";
// import { PageHeader } from "@/components/layout/Driverlayout/PageHeader";
// import { useInTransitTrip, useStartTrip, useCompleteTrip } from "@/hooks/usedriverportal";
// import { Button } from "@/components/ui/button";

// const TripDetails = () => {
//   const { tripId } = useParams();
//   const { data: trip } = useInTransitTrip();
//   const startTrip = useStartTrip();
//   const completeTrip = useCompleteTrip();

//   if (!trip || trip.id !== tripId) return null;

//   return (
//     <AppLayout>
//       <PageHeader title="Trip Details" showBack />

//       <div className="px-4 pb-6 space-y-4">
//         <p><b>From:</b> {trip.origin}</p>
//         <p><b>To:</b> {trip.destination}</p>

//         {trip.status === "scheduled" && (
//           <Button onClick={() => startTrip.mutate(trip.id)}>Start Trip</Button>
//         )}

//         {trip.status === "in_progress" && (
//           <Button onClick={() => completeTrip.mutate(trip.id)}>
//             Complete Trip
//           </Button>
//         )}
//       </div>
//     </AppLayout>
//   );
// };

// export default TripDetails;





import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/Driverlayout/AppLayout";
import { PageHeader } from "@/components/layout/Driverlayout/PageHeader";
import { useInTransitTrip, useStartTrip, useCompleteTrip, useUpdateActivity, useDriverDashboard } from "@/hooks/usedriverportal";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MapPin, Calendar, Package, Truck, Clock, Play, CheckCircle, Coffee, Moon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const TripDetails = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const dashboard = useDriverDashboard();
  const { data: inTransitTrip, isLoading } = useInTransitTrip();
  const startTrip = useStartTrip();
  const completeTrip = useCompleteTrip();
  const updateActivity = useUpdateActivity();
  const [isStarting, setIsStarting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  // Find trip in assigned or in-transit
  const trip = inTransitTrip?.id === tripId 
    ? inTransitTrip 
    : dashboard?.assignedTrips?.find((t: any) => t.id === tripId);

  if (isLoading) {
    return (
      <AppLayout>
        <PageHeader title="Trip Details" showBack />
        <div className="px-4 py-8 text-center">
          <p className="text-muted-foreground">Loading trip details...</p>
        </div>
      </AppLayout>
    );
  }

  if (!trip) {
    return (
      <AppLayout>
        <PageHeader title="Trip Details" showBack />
        <div className="px-4 py-8 text-center space-y-4">
          <p className="text-muted-foreground">Trip not found</p>
          <Button onClick={() => navigate("/driver/trips")}>
            Back to Trips
          </Button>
        </div>
      </AppLayout>
    );
  }

  const handleStartTrip = async () => {
    setIsStarting(true);
    try {
      await startTrip.mutateAsync(trip.id);
      toast({
        title: "Trip started!",
        description: "Drive safely and stay focused.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to start trip",
        description: error.response?.data?.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsStarting(false);
    }
  };

  const handleCompleteTrip = async () => {
    setIsCompleting(true);
    try {
      await completeTrip.mutateAsync(trip.id);
      toast({
        title: "Trip completed!",
        description: "Great job! Trip has been marked as delivered.",
      });
      navigate("/driver/dashboard");
    } catch (error: any) {
      toast({
        title: "Failed to complete trip",
        description: error.response?.data?.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  const handleActivityChange = async (status: string) => {
    try {
      await updateActivity.mutateAsync({ tripId: trip.id, status });
      toast({
        title: "Status updated",
        description: `Activity changed to ${status.replace('_', ' ')}`,
      });
    } catch (error) {
      toast({
        title: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const isInProgress = trip.status === "in_progress";
  const isScheduled = trip.status === "scheduled" || !trip.status;

  return (
    <AppLayout>
      <PageHeader title="Trip Details" showBack />

      <div className="px-4 pb-6 space-y-4">
        {/* Trip Header */}
        <div className="card-elevated p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">{trip.tripNumber}</h2>
              <p className="text-sm text-muted-foreground">
                {new Date(trip.pickupTime).toLocaleDateString()}
              </p>
            </div>
            <StatusBadge status={trip.status || "scheduled"} />
          </div>

          {/* Route */}
          <div className="flex items-start gap-3 mt-4">
            <div className="flex flex-col items-center pt-1">
              <div className="w-3 h-3 rounded-full bg-success border-2 border-success/30" />
              <div className="w-0.5 h-12 bg-border my-1" />
              <div className="w-3 h-3 rounded-full bg-primary border-2 border-primary/30" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Pickup</p>
                <p className="font-semibold">{trip.origin}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(trip.pickupTime).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Delivery</p>
                <p className="font-semibold">{trip.destination}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(trip.deliveryTime).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Info */}
        <div className="card-elevated p-4 space-y-3">
          <h3 className="font-semibold">Trip Information</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Package className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Cargo</p>
                <p className="font-medium text-sm">{trip.cargo}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Package className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Weight</p>
                <p className="font-medium text-sm">{trip.weight} kg</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Estimated</p>
                <p className="font-medium text-sm">{trip.estimatedHours}h</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Truck className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Truck</p>
                <p className="font-medium text-sm">{trip.truck.plate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Location (if in progress) */}
        {isInProgress && trip.currentLocation && (
          <div className="card-elevated p-4">
            <h3 className="font-semibold mb-3">Current Location</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">{trip.currentLocation.address}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Speed: {trip.currentLocation.speed} km/h
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Last updated: {new Date(trip.currentLocation.updatedAt || Date.now()).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Activity Status Controls (if in progress) */}
        {isInProgress && (
          <div className="card-elevated p-4">
            <h3 className="font-semibold mb-3">Activity Status</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={trip.driverActivityStatus === "in_progress" ? "default" : "outline"}
                size="sm"
                onClick={() => handleActivityChange("in_progress")}
                className="flex flex-col h-auto py-3 gap-1"
              >
                <Play className="w-4 h-4" />
                <span className="text-xs">Driving</span>
              </Button>
              <Button
                variant={trip.driverActivityStatus === "on_break" ? "default" : "outline"}
                size="sm"
                onClick={() => handleActivityChange("on_break")}
                className="flex flex-col h-auto py-3 gap-1"
              >
                <Coffee className="w-4 h-4" />
                <span className="text-xs">Break</span>
              </Button>
              <Button
                variant={trip.driverActivityStatus === "sleep" ? "default" : "outline"}
                size="sm"
                onClick={() => handleActivityChange("sleep")}
                className="flex flex-col h-auto py-3 gap-1"
              >
                <Moon className="w-4 h-4" />
                <span className="text-xs">Sleep</span>
              </Button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {isScheduled && (
            <Button
              onClick={handleStartTrip}
              disabled={isStarting}
              className="w-full h-12"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2" />
              {isStarting ? "Starting..." : "Start Trip"}
            </Button>
          )}

          {isInProgress && (
            <Button
              onClick={handleCompleteTrip}
              disabled={isCompleting}
              className="w-full h-12 bg-success hover:bg-success/90"
              size="lg"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {isCompleting ? "Completing..." : "Complete Trip"}
            </Button>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default TripDetails;