

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { driverService } from "@/services/driver.service";

export function useDrivers() {
  const qc = useQueryClient();

  const list = useQuery({
    queryKey: ["drivers", "list"],
    queryFn: driverService.getDrivers,
    refetchInterval: 2 * 60 * 1000,
    refetchIntervalInBackground: true,

   // staleTime: 0,
    refetchOnWindowFocus: false,
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
