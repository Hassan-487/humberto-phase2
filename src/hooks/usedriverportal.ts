
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { driverService } from "@/services/driverportal.service";

// export const DRIVER_KEYS = {
//   ASSIGNED: ["driver-assigned"],
//   IN_TRANSIT: ["driver-in-transit"],
//   COMPLETED: ["driver-completed"],
//   ALL: ["driver-all"],
// };

// /**
//  * Assigned trips
//  */
// export const useAssignedTrips = () =>
//   useQuery({
//     queryKey: DRIVER_KEYS.ASSIGNED,
//     queryFn: () => driverService.getAssignedTrips(),
//     staleTime: 30000,
//   });

// /**
//  * In-transit trip
//  */
// export const useInTransitTrip = () =>
//   useQuery({
//     queryKey: DRIVER_KEYS.IN_TRANSIT,
//     queryFn: driverService.getInTransitTrip,
//     refetchInterval: 30000,
//     staleTime: 10000,
//   });

// /**
//  * Completed trips
//  */
// export const useCompletedTrips = () =>
//   useQuery({
//     queryKey: DRIVER_KEYS.COMPLETED,
//     queryFn: () => driverService.getCompletedTrips(),
//     staleTime: 60000,
//   });

// /**
//  * Start trip mutation (🔥 FIXED)
//  */
// export const useStartTrip = () => {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: driverService.startTrip,

//     onSuccess: (_, tripId) => {
//       // 🔥 REMOVE trip from assigned cache instantly
//       qc.setQueryData(DRIVER_KEYS.ASSIGNED, (old: any[] = []) =>
//         old.filter(trip => trip.id !== tripId)
//       );

//       // 🔄 Refetch active trip
//       qc.invalidateQueries({ queryKey: DRIVER_KEYS.IN_TRANSIT });
//     },
//   });
// };

// /**
//  * Complete trip mutation
//  */
// // export const useCompleteTrip = () => {
// //   const qc = useQueryClient();

// //   return useMutation({
// //     mutationFn: driverService.completeTrip,

// //     onSuccess: () => {
// //       qc.invalidateQueries({ queryKey: DRIVER_KEYS.IN_TRANSIT });
// //       qc.invalidateQueries({ queryKey: DRIVER_KEYS.COMPLETED });
// //       qc.invalidateQueries({ queryKey: DRIVER_KEYS.ASSIGNED });
// //     },
// //   });
// // };
// export const useCompleteTrip = () => {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       tripId,
//       docs,
//     }: {
//       tripId: string;
//       docs: {
//         proofOfDeliveryUrl: string;
//         deliveryPictureUrl: string;
//       };
//     }) => driverService.completeTrip(tripId, docs),

//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: DRIVER_KEYS.IN_TRANSIT });
//       qc.invalidateQueries({ queryKey: DRIVER_KEYS.COMPLETED });
//       qc.invalidateQueries({ queryKey: DRIVER_KEYS.ASSIGNED });
//     },
//   });
// };

// /**
//  * Update activity
//  */
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


// export const useUploadProofOfDelivery = () => {
//   return useMutation({
//     mutationFn: (file: File) =>
//       driverService.uploadProofOfDelivery(file),
//   });
// };

// /**
//  * Upload Delivery Picture (Image)
//  * 🔥 Uploads immediately on file select
//  */
// export const useUploadDeliveryPicture = () => {
//   return useMutation({
//     mutationFn: (file: File) =>
//       driverService.uploadDeliveryPicture(file),
//   });
// };



import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { driverService } from "@/services/driverportal.service";

// ─────────────────────────────────────────────────────────────────────────────
// Query keys
// ─────────────────────────────────────────────────────────────────────────────

export const driverKeys = {
  all: ["driver"] as const,
  assigned: () => [...driverKeys.all, "assigned"] as const,
  inTransit: () => [...driverKeys.all, "inTransit"] as const,
  completed: () => [...driverKeys.all, "completed"] as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// Trip queries
// ─────────────────────────────────────────────────────────────────────────────

export function useAssignedTrips() {
  return useQuery({
    queryKey: driverKeys.assigned(),
    queryFn: () => driverService.getAssignedTrips(),
    staleTime: 30 * 1000,
    refetchOnMount: true,
  });
}

export function useInTransitTrip() {
  return useQuery({
    queryKey: driverKeys.inTransit(),
    queryFn: () => driverService.getInTransitTrip(),
    staleTime: 15 * 1000,
    refetchOnMount: true,
  });
}

export function useCompletedTrips() {
  return useQuery({
    queryKey: driverKeys.completed(),
    queryFn: () => driverService.getCompletedTrips(),
    staleTime: 60 * 1000,
    refetchOnMount: true,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Trip lifecycle mutations
// ─────────────────────────────────────────────────────────────────────────────

export function useStartTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tripId: string) => driverService.startTrip(tripId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: driverKeys.assigned() });
      queryClient.invalidateQueries({ queryKey: driverKeys.inTransit() });
    },
  });
}

export function useCompleteTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      tripId,
      docs,
    }: {
      tripId: string;
      docs: { proofOfDeliveryUrl: string; deliveryPictureUrl: string };
    }) => driverService.completeTrip(tripId, docs),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: driverKeys.inTransit() });
      queryClient.invalidateQueries({ queryKey: driverKeys.completed() });
      queryClient.invalidateQueries({ queryKey: driverKeys.assigned() });
    },
  });
}

export function useUpdateActivity() {
  return useMutation({
    mutationFn: ({ tripId, status }: { tripId: string; status: string }) =>
      driverService.updateActivity(tripId, status),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// M4 – Driver saves load acceptance & trip start timestamps
// ─────────────────────────────────────────────────────────────────────────────

export function useSaveDriverAcceptance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      tripId,
      payload,
    }: {
      tripId: string;
      payload: {
        loadAcceptanceDate: string;
        loadAcceptanceHour: string;
        tripStartDate: string;
        tripStartHour: string;
      };
    }) => driverService.saveDriverAcceptance(tripId, payload),
    onSuccess: () => {
      // Refresh both lists so admin sees updated data immediately
      queryClient.invalidateQueries({ queryKey: driverKeys.assigned() });
      queryClient.invalidateQueries({ queryKey: driverKeys.inTransit() });
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// M5 – Driver saves loading arrival + container data
// ─────────────────────────────────────────────────────────────────────────────

export function useSaveLoadingData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      tripId,
      payload,
    }: {
      tripId: string;
      payload: {
        arrivalDate: string;
        arrivalHour: string;
        containers: {
          containerNumber: string;
          sealNumber: string;
          customer: string;
        }[];
      };
    }) => driverService.saveLoadingData(tripId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: driverKeys.assigned() });
      queryClient.invalidateQueries({ queryKey: driverKeys.inTransit() });
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// M5 – Upload container photos (one call per container)
// ─────────────────────────────────────────────────────────────────────────────

export function useUploadContainerPhotos() {
  return useMutation({
    mutationFn: ({
      tripId,
      containerIndex,
      files,
    }: {
      tripId: string;
      containerIndex: number;
      files: File[];
    }) => driverService.uploadContainerPhotos(tripId, containerIndex, files),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Document upload mutations
// ─────────────────────────────────────────────────────────────────────────────

export function useUploadProofOfDelivery() {
  return useMutation({
    mutationFn: (file: File) => driverService.uploadProofOfDelivery(file),
  });
}

export function useUploadDeliveryPicture() {
  return useMutation({
    mutationFn: (file: File) => driverService.uploadDeliveryPicture(file),
  });
}