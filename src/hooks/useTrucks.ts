
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { truckService, Truck } from "@/services/truck.service";

export const truckKeys = {
  all: ["trucks"] as const,
  list: () => [...truckKeys.all, "list"] as const,
  detail: (id: string) => [...truckKeys.all, "detail", id] as const,
};
 
export function useTrucks() {
  const query = useQuery<Truck[]>({
    queryKey: truckKeys.list(),
    queryFn: truckService.getTrucks,
    staleTime: 2 * 60 * 1000, 
    refetchOnWindowFocus: true,
    refetchOnMount: false, 
  });
  return { trucks: query.data ?? [], loading: query.isLoading };
}

export function useCreateTruck() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: truckService.createTruck,
    onSuccess: () => qc.invalidateQueries({ queryKey: truckKeys.list() }),
  });
}

export function useUpdateTruck() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Truck> }) =>
      truckService.updateTruck(id, payload),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: truckKeys.list() });
      qc.invalidateQueries({ queryKey: truckKeys.detail(vars.id) });
    },
  });
}

export function useDeleteTruck() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: truckService.deleteTruck,
    onSuccess: () => qc.invalidateQueries({ queryKey: truckKeys.list() }),
  });
}