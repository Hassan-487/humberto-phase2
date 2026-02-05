


// import { AppLayout } from "@/components/layout/Driverlayout/AppLayout";
// import { useAuth } from "@/contexts/AuthContext";
// import {
//   useAssignedTrips,
//   useInTransitTrip,
//   useCompletedTrips,
// } from "@/hooks/usedriverportal";
// import { SummaryCard } from "@/components/ui/SummaryCard";
// import { TripCard } from "@/components/ui/TripCard";
// import {
//   Route,
//   CheckCircle2,
//   Clock,
//   AlertTriangle,
//   Package,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const DriverDashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const { data: assignedTrips = [] } = useAssignedTrips();
//   const { data: activeTrip, isLoading } = useInTransitTrip();
//   const { data: completedTrips = [] } = useCompletedTrips();

//   /** -------- Derived stats (same as old dashboard.stats) -------- */
//   const stats = {
//     totalTrips:
//       assignedTrips.length +
//       completedTrips.length +
//       (activeTrip ? 1 : 0),

//     assignedTrips: assignedTrips.length,
//     completedTrips: completedTrips.length,
//     inTransitTrips: activeTrip ? 1 : 0,

//     delayedTrips: completedTrips.filter(
//       (t: any) => t.isDelayed
//     ).length,
//   };

//   /** -------- Derived status (same as old dashboard.status) -------- */
//   const status = activeTrip
//     ? "in_transit"
//     : assignedTrips.length > 0
//     ? "assigned"
//     : "idle";

//   return (
//     <AppLayout>
//       {/* Header */}
//       <div className="px-4 pt-6 pb-4 bg-gradient-to-br from-primary/5 to-transparent">
//         <p className="text-sm text-muted-foreground">Welcome back,</p>
//         <h1 className="text-2xl font-bold">
//           {user?.firstName || "Driver"} 👋
//         </h1>
//         <p className="text-sm text-muted-foreground mt-1">
//           Status:{" "}
//           <span className="font-medium text-foreground capitalize">
//             {status.replace("_", " ")}
//           </span>
//         </p>
//       </div>

//       <div className="px-4 space-y-6 pb-6">
//         {/* Active Trip Section */}
//         {isLoading ? (
//           <div className="card-elevated p-6 text-center">
//             <p className="text-muted-foreground">
//               Checking for active trips...
//             </p>
//           </div>
//         ) : activeTrip ? (
//           <div className="space-y-2">
//             <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
//               Active Trip
//             </h2>
//             <TripCard
//               trip={{
//                 id: activeTrip.tripNumber,
//                 pickupLocation: activeTrip.origin,
//                 dropLocation: activeTrip.destination,
//                 status: "in_progress",
//                 date: new Date(
//                   activeTrip.pickupTime
//                 ).toLocaleDateString(),
//                 distance: `${activeTrip.estimatedHours}h`,
//                 pickupAddress: activeTrip.truck?.model,
//                 dropAddress: activeTrip.cargo,
//               }}
//               onClick={() =>
//                 navigate(`/driver/trips/${activeTrip.id}`)
//               }
//             />
//           </div>
//         ) : status === "assigned" ? (
//           <div className="card-elevated p-6 text-center space-y-2">
//             <Package className="w-12 h-12 mx-auto text-muted-foreground" />
//             <p className="font-medium">
//               You have assigned trips
//             </p>
//             <p className="text-sm text-muted-foreground">
//               Check your trips tab to start
//             </p>
//           </div>
//         ) : null}

//         {/* Stats Grid (UNCHANGED UI) */}
//         <div className="space-y-2">
//           <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
//             Overview
//           </h2>
//           <div className="grid grid-cols-2 gap-3">
//             <SummaryCard
//               title="Total Trips"
//               value={stats.totalTrips}
//               icon={Route}
//               variant="default"
//             />
//             <SummaryCard
//               title="Assigned"
//               value={stats.assignedTrips}
//               icon={Clock}
//               variant="primary"
//             />
//             <SummaryCard
//               title="Completed"
//               value={stats.completedTrips}
//               icon={CheckCircle2}
//               variant="success"
//             />
//             <SummaryCard
//               title="Delayed"
//               value={stats.delayedTrips}
//               icon={AlertTriangle}
//               variant="warning"
//             />
//           </div>
//         </div>

//         {/* Quick Actions / Upcoming Trips */}
//         {assignedTrips.length > 0 && (
//           <div className="space-y-2">
//             <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
//               Upcoming Trips
//             </h2>
//             <div className="space-y-3">
//               {assignedTrips.slice(0, 2).map((trip: any) => (
//                 <TripCard
//                   key={trip.id}
//                   trip={{
//                     id: trip.tripNumber,
//                     pickupLocation: trip.origin,
//                     dropLocation: trip.destination,
//                     status: "scheduled",
//                     date: new Date(
//                       trip.pickupTime
//                     ).toLocaleDateString(),
//                     distance: `${trip.estimatedHours}h`,
//                   }}
//                   onClick={() =>
//                     navigate(`/driver/trips/${trip.id}`)
//                   }
//                   compact
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </AppLayout>
//   );
// };

// export default DriverDashboard;


import { AppLayout } from "@/components/layout/Driverlayout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import {
  useAssignedTrips,
  useInTransitTrip,
  useCompletedTrips,
} from "@/hooks/usedriverportal";
import { SummaryCard } from "@/components/ui/SummaryCard";
import { TripCard } from "@/components/ui/TripCard";
import {
  Route,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Package,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DriverDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: assignedTrips = [] } = useAssignedTrips();
  const { data: activeTrip, isLoading } = useInTransitTrip();
  const { data: completedTrips = [] } = useCompletedTrips();

  const stats = {
    totalTrips:
      assignedTrips.length +
      completedTrips.length +
      (activeTrip ? 1 : 0),
    assignedTrips: assignedTrips.length,
    completedTrips: completedTrips.length,
    inTransitTrips: activeTrip ? 1 : 0,
    delayedTrips: completedTrips.filter((t) => t.isDelayed).length,
  };

  const status = activeTrip
    ? "in_transit"
    : assignedTrips.length > 0
    ? "assigned"
    : "idle";

  return (
    <AppLayout>
      {/* Header */}
      <div className="px-4 pt-6 pb-4 bg-gradient-to-br from-primary/5 to-transparent">
        <p className="text-sm text-muted-foreground">
          {t("driverDashboard.welcomeBack")}
        </p>

        <h1 className="text-2xl font-bold">
          {user?.firstName || "Driver"} 👋
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          {t("driverDashboard.statusLabel")}:{" "}
          <span className="font-medium text-foreground capitalize">
            {t(`status.${status}`)}
          </span>
        </p>
      </div>

      <div className="px-4 space-y-6 pb-6">
        {/* Active Trip Section */}
        {isLoading ? (
          <div className="card-elevated p-6 text-center">
            <p className="text-muted-foreground">
              {t("driverDashboard.checkingActiveTrips")}
            </p>
          </div>
        ) : activeTrip ? (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {t("driverDashboard.activeTrip")}
            </h2>

            <TripCard
              trip={{
                id: activeTrip.tripNumber,
                pickupLocation: activeTrip.origin,
                dropLocation: activeTrip.destination,
                status: "in_progress",
                date: new Date(activeTrip.pickupTime).toLocaleDateString(),
                distance: `${activeTrip.estimatedHours}h`,
                pickupAddress: activeTrip.truck?.model,
                dropAddress: activeTrip.cargo,
              }}
              onClick={() =>
                navigate(`/driver/trips/${activeTrip.id}`)
              }
            />
          </div>
        ) : status === "assigned" ? (
          <div className="card-elevated p-6 text-center space-y-2">
            <Package className="w-12 h-12 mx-auto text-muted-foreground" />
            <p className="font-medium">
              {t("driverDashboard.assignedTripsTitle")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("driverDashboard.assignedTripsSubtitle")}
            </p>
          </div>
        ) : null}

        {/* Stats */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            {t("driverDashboard.overview")}
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <SummaryCard
              title={t("driverDashboard.totalTrips")}
              value={stats.totalTrips}
              icon={Route}
            />
            <SummaryCard
              title={t("driverDashboard.assigned")}
              value={stats.assignedTrips}
              icon={Clock}
              variant="primary"
            />
            <SummaryCard
              title={t("driverDashboard.completed")}
              value={stats.completedTrips}
              icon={CheckCircle2}
              variant="success"
            />
            <SummaryCard
              title={t("driverDashboard.delayed")}
              value={stats.delayedTrips}
              icon={AlertTriangle}
              variant="warning"
            />
          </div>
        </div>

        {/* Upcoming Trips */}
        {assignedTrips.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {t("driverDashboard.upcomingTrips")}
            </h2>

            <div className="space-y-3">
              {assignedTrips.slice(0, 2).map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={{
                    id: trip.tripNumber,
                    pickupLocation: trip.origin,
                    dropLocation: trip.destination,
                    status: "scheduled",
                    date: new Date(trip.pickupTime).toLocaleDateString(),
                    distance: `${trip.estimatedHours}h`,
                  }}
                  onClick={() =>
                    navigate(`/driver/trips/${trip.id}`)
                  }
                  compact
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default DriverDashboard;
