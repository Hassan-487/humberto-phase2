

import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { driverService } from "@/services/driver.service";

export function useDrivers(
  page?: number,
  limit?: number,
  search?: string
) {
  const qc = useQueryClient();

  const list = useQuery({
    queryKey: ["drivers", page, limit, search],
    queryFn: () =>
      driverService.getDrivers({
        page,
        limit,
        search: search || undefined,
      }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,

    enabled: page === undefined || limit === undefined || (page > 0 && limit > 0),
  });

  const create = useMutation({
    mutationFn: driverService.createDriver,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      driverService.updateDriver(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers"] }),
  });

  const remove = useMutation({
    mutationFn: driverService.deleteDriver,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drivers"] }),
  });

  const uploadDocuments = useMutation({
    mutationFn: driverService.uploadDriverDocuments,
  });

  return {
    drivers: list.data?.data ?? [],
    pagination: list.data?.pagination,
    loading: list.isLoading,

    createDriver: create.mutateAsync,
    updateDriver: update.mutateAsync,
    deleteDriver: remove.mutateAsync,
    uploadDriverDocuments: uploadDocuments.mutateAsync,
  };
}

