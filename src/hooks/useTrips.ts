



import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tripService, Trip } from "@/services/trip.service";

export const tripKeys = {
  all: ["trips"] as const,
  lists: () => [...tripKeys.all, "list"] as const,
  detail: (id: string) => [...tripKeys.all, "detail", id] as const,
};

export function useTrips() {
  return useQuery<Trip[]>({
    queryKey: tripKeys.lists(),
    queryFn: tripService.getTrips,
    staleTime: 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useCreateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<Trip>) =>
      tripService.createTrip(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
      await queryClient.refetchQueries({ queryKey: tripKeys.lists() });
    },
  });
}

export function useUpdateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Trip> }) =>
      tripService.updateTrip(id, payload),
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
      await queryClient.invalidateQueries({ queryKey: tripKeys.detail(id) });
      await queryClient.refetchQueries({ queryKey: tripKeys.lists() });
    },
  });
}

export function useCancelTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tripService.cancelTrip(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
      await queryClient.refetchQueries({ queryKey: tripKeys.lists() });
    },
  });
}

export function useDeleteTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tripService.deleteTrip(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
      await queryClient.refetchQueries({ queryKey: tripKeys.lists() });
    },
  });
}
