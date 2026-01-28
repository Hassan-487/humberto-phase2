
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { driverService } from "@/services/driver.service";

// export function useDrivers() {
//   const qc = useQueryClient();

//   const list = useQuery({
//     queryKey: ["drivers", "list"],
//     queryFn: driverService.getDrivers,
//     staleTime: 60_000,
//     refetchOnWindowFocus: false,
//   });

//   const create = useMutation({
//     mutationFn: driverService.createDriver,
//     onSuccess: () =>
//       qc.invalidateQueries({ queryKey: ["drivers", "list"] }),
//   });

//   const update = useMutation({
//     mutationFn: ({ id, data }: { id: string; data: any }) =>
//       driverService.updateDriver(id, data),
//     onSuccess: () =>
//       qc.invalidateQueries({ queryKey: ["drivers", "list"] }),
//   });

//   const remove = useMutation({
//     mutationFn: driverService.deleteDriver,
//     onSuccess: () =>
//       qc.invalidateQueries({ queryKey: ["drivers", "list"] }),
//   });

//   const uploadDocuments = useMutation({
//     mutationFn: driverService.uploadDriverDocuments,
//   });

//   return {
//     drivers: list.data ?? [],
//     loading: list.isLoading,

//     createDriver: create.mutateAsync,
//     updateDriver: update.mutateAsync,
//     deleteDriver: remove.mutateAsync,

//     uploadDriverDocuments: uploadDocuments.mutateAsync,

//     refetch: list.refetch,
//   };
// }




import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { driverService } from "@/services/driver.service";

export function useDrivers() {
  const qc = useQueryClient();

  const list = useQuery({
    queryKey: ["drivers", "list"],
    queryFn: driverService.getDrivers,

    // ✅ AUTO FETCH EVERY 2 MINUTES
    refetchInterval: 2 * 60 * 1000,
    refetchIntervalInBackground: true,

    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const create = useMutation({
    mutationFn: driverService.createDriver,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["drivers", "list"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      driverService.updateDriver(id, data),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["drivers", "list"] }),
  });

  const remove = useMutation({
    mutationFn: driverService.deleteDriver,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["drivers", "list"] }),
  });

  const uploadDocuments = useMutation({
    mutationFn: driverService.uploadDriverDocuments,
  });

  return {
    drivers: list.data ?? [],
    loading: list.isLoading,

    createDriver: create.mutateAsync,
    updateDriver: update.mutateAsync,
    deleteDriver: remove.mutateAsync,

    uploadDriverDocuments: uploadDocuments.mutateAsync,
  };
}
