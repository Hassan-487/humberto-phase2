
// // import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // import { driverService } from "@/services/driver.service";

// // export function useDrivers() {
// //   const qc = useQueryClient();

// //   const list = useQuery({
// //     queryKey: ["drivers"],
// //     queryFn: driverService.getDrivers,
// //   });

// //   const create = useMutation({
// //     mutationFn: driverService.createDriver,
// //     onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers"] }),
// //   });

// //   const update = useMutation({
// //     mutationFn: ({ id, data }: { id: string; data: any }) =>
// //       driverService.updateDriver(id, data),
// //     onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers"] }),
// //   });

// //   const remove = useMutation({
// //     mutationFn: driverService.deleteDriver,
// //     onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers"] }),
// //   });

// //   return {
// //     drivers: list.data ?? [],
// //     loading: list.isLoading,
// //     createDriver: create.mutateAsync,
// //     updateDriver: update.mutateAsync,
// //     deleteDriver: remove.mutateAsync,
// //   };
// // }


// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { driverService } from "@/services/driver.service";

// export function useDrivers() {
//   const qc = useQueryClient();

//   const list = useQuery({
//     queryKey: ["drivers", "list"], // Specific key for better management
//     queryFn: driverService.getDrivers,
//     // --- CACHE SETTINGS ---
//     staleTime: 5 * 60 * 1000,     // Consider data fresh for 5 mins
//     refetchOnMount: false,        // Don't refetch just because component mounted
//     refetchOnWindowFocus: false,  // Don't refetch on tab switch
//   });

//   const create = useMutation({
//     mutationFn: driverService.createDriver,
//     onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers", "list"] }),
//   });

//   const update = useMutation({
//     mutationFn: ({ id, data }: { id: string; data: any }) =>
//       driverService.updateDriver(id, data),
//     onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers", "list"] }),
//   });

//   const remove = useMutation({
//     mutationFn: driverService.deleteDriver,
//     onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers", "list"] }),
//   });

//   return {
//     drivers: list.data ?? [],
//     loading: list.isLoading,
//     createDriver: create.mutateAsync,
//     updateDriver: update.mutateAsync,
//     deleteDriver: remove.mutateAsync,
//     isDeleting: remove.isPending
//   };
// }



import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { driverService } from "@/services/driver.service";

export function useDrivers() {
  const qc = useQueryClient();

  const list = useQuery({
    queryKey: ["drivers", "list"],
    queryFn: driverService.getDrivers,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const create = useMutation({
    mutationFn: driverService.createDriver,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers", "list"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      driverService.updateDriver(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers", "list"] }),
  });

  const remove = useMutation({
    mutationFn: driverService.deleteDriver,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers", "list"] }),
  });

  return {
    drivers: list.data ?? [],
    loading: list.isLoading,
    createDriver: create.mutateAsync,
    updateDriver: update.mutateAsync,
    deleteDriver: remove.mutateAsync,
    isDeleting: remove.isPending,
  };
}
