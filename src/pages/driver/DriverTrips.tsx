// import { AppLayout } from "@/components/layout/Driverlayout/AppLayout";
// import { PageHeader } from "@/components/layout/Driverlayout/PageHeader";
// import { useAssignedTrips } from "@/hooks/usedriverportal";
// import { TripCard } from "@/components/ui/TripCard";
// import { useNavigate } from "react-router-dom";

// const DriverTrips = () => {
//   const { data, isLoading } = useAssignedTrips();
//   const navigate = useNavigate();

//   return (
//     <AppLayout>
//       <PageHeader title="My Trips" />
//       <div className="px-4 pb-6 space-y-3">
//         {data?.map((trip: any) => (
//           <TripCard
//             key={trip.id}
//             trip={{
//               id: trip.id,
//               pickupLocation: trip.origin,
//               dropLocation: trip.destination,
//               status: "pending",
//               date: trip.pickupTime,
//               distance: `${trip.estimatedHours}h`,
//             }}
//             onClick={() => navigate(`/driver/trips/${trip.id}`)}
//           />
//         ))}
//       </div>
//     </AppLayout>
//   );
// };

// export default DriverTrips;




import { AppLayout } from "@/components/layout/Driverlayout/AppLayout";
import { PageHeader } from "@/components/layout/Driverlayout/PageHeader";
import { useAssignedTrips, useCompletedTrips } from "@/hooks/usedriverportal";
import { TripCard } from "@/components/ui/TripCard";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package } from "lucide-react";

const DriverTrips = () => {
  const { data: assignedTrips = [], isLoading: loadingAssigned } = useAssignedTrips();
  const { data: completedTrips = [], isLoading: loadingCompleted } = useCompletedTrips();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <PageHeader title="My Trips" />
      
      <div className="px-4 pb-6">
        <Tabs defaultValue="assigned" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="assigned">
              Assigned ({assignedTrips.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedTrips.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assigned" className="mt-4 space-y-3">
            {loadingAssigned ? (
              <div className="card-elevated p-6 text-center">
                <p className="text-muted-foreground">Loading trips...</p>
              </div>
            ) : assignedTrips.length === 0 ? (
              <div className="card-elevated p-8 text-center space-y-2">
                <Package className="w-12 h-12 mx-auto text-muted-foreground" />
                <p className="font-medium">No assigned trips</p>
                <p className="text-sm text-muted-foreground">
                  New trips will appear here when assigned
                </p>
              </div>
            ) : (
              assignedTrips.map((trip: any) => (
                <TripCard
                  key={trip.id}
                  trip={{
                    id: trip.tripNumber,
                    pickupLocation: trip.origin,
                    dropLocation: trip.destination,
                    status: "scheduled",
                    date: new Date(trip.pickupTime).toLocaleDateString(),
                    distance: `${trip.estimatedHours}h`,
                    pickupAddress: `${trip.weight} kg - ${trip.cargo}`,
                    dropAddress: `${trip.truck.plate} (${trip.truck.model})`,
                  }}
                  onClick={() => navigate(`/driver/trips/${trip.id}`)}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-4 space-y-3">
            {loadingCompleted ? (
              <div className="card-elevated p-6 text-center">
                <p className="text-muted-foreground">Loading trips...</p>
              </div>
            ) : completedTrips.length === 0 ? (
              <div className="card-elevated p-8 text-center space-y-2">
                {/* <CheckCircle2 className="w-12 h-12 mx-auto text-muted-foreground" /> */}
                <p className="font-medium">No completed trips</p>
                <p className="text-sm text-muted-foreground">
                  Completed trips will appear here
                </p>
              </div>
            ) : (
              completedTrips.map((trip: any) => (
                <TripCard
                  key={trip.id}
                  trip={{
                    id: trip.tripNumber,
                    pickupLocation: trip.origin,
                    dropLocation: trip.destination,
                    status: trip.isDelayed ? "delayed_delivered" : "delivered",
                    date: new Date(trip.deliveredAt).toLocaleDateString(),
                    distance: trip.isDelayed ? `Delayed by ${trip.delayedByMinutes}min` : "On time",
                    pickupAddress: `${trip.weight} kg - ${trip.cargo}`,
                  }}
                  onClick={() => navigate(`/driver/trips/${trip.id}`)}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default DriverTrips;