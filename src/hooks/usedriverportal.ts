// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { driverService } from "@/services/driverportal.service";

// export const DRIVER_KEYS = {
//   DASHBOARD: ["driver-dashboard"],
//   ASSIGNED: ["driver-assigned"],
//   IN_TRANSIT: ["driver-in-transit"],
//   COMPLETED: ["driver-completed"],
//   ALL: ["driver-all"],
// };

// export const useDriverDashboard = () => {
//   // dashboard already stored during login
//   const dashboard = localStorage.getItem("dashboard");
//   return dashboard ? JSON.parse(dashboard) : null;
// };

// export const useAssignedTrips = () =>
//   useQuery({
//     queryKey: DRIVER_KEYS.ASSIGNED,
//     queryFn: () => driverService.getAssignedTrips(),
//   });

// export const useInTransitTrip = () =>
//   useQuery({
//     queryKey: DRIVER_KEYS.IN_TRANSIT,
//     queryFn: driverService.getInTransitTrip,
//   });

// export const useCompletedTrips = () =>
//   useQuery({
//     queryKey: DRIVER_KEYS.COMPLETED,
//     queryFn: () => driverService.getCompletedTrips(),
//   });

// export const useStartTrip = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: driverService.startTrip,
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: DRIVER_KEYS.IN_TRANSIT });
//       qc.invalidateQueries({ queryKey: DRIVER_KEYS.ASSIGNED });
//     },
//   });
// };

// export const useCompleteTrip = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: driverService.completeTrip,
//     onSuccess: () => {
//       qc.invalidateQueries();
//     },
//   });
// };

// export const useUpdateActivity = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: ({ tripId, status }: { tripId: string; status: string }) =>
//       driverService.updateActivity(tripId, status),
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: DRIVER_KEYS.IN_TRANSIT });
//     },
//   });
// };



import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { driverService, DriverDashboard } from "@/services/driverportal.service";

export const DRIVER_KEYS = {
  DASHBOARD: ["driver-dashboard"],
  ASSIGNED: ["driver-assigned"],
  IN_TRANSIT: ["driver-in-transit"],
  COMPLETED: ["driver-completed"],
  ALL: ["driver-all"],
};

export const useDriverDashboard = (): DriverDashboard | null => {
  const dashboardStr = localStorage.getItem("driverDashboard");
  if (!dashboardStr) return null;
  
  try {
    const parsed = JSON.parse(dashboardStr);
    return parsed.driverDashboard || null;
  } catch (e) {
    return null;
  }
};

export const useAssignedTrips = () =>
  useQuery({
    queryKey: DRIVER_KEYS.ASSIGNED,
    queryFn: () => driverService.getAssignedTrips(),
  });

export const useInTransitTrip = () =>
  useQuery({
    queryKey: DRIVER_KEYS.IN_TRANSIT,
    queryFn: driverService.getInTransitTrip,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

export const useCompletedTrips = () =>
  useQuery({
    queryKey: DRIVER_KEYS.COMPLETED,
    queryFn: () => driverService.getCompletedTrips(),
  });

export const useStartTrip = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: driverService.startTrip,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: DRIVER_KEYS.IN_TRANSIT });
      qc.invalidateQueries({ queryKey: DRIVER_KEYS.ASSIGNED });
      qc.invalidateQueries({ queryKey: DRIVER_KEYS.DASHBOARD });
    },
  });
};

export const useCompleteTrip = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: driverService.completeTrip,
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
};

export const useUpdateActivity = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ tripId, status }: { tripId: string; status: string }) =>
      driverService.updateActivity(tripId, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: DRIVER_KEYS.IN_TRANSIT });
    },
  });
};
