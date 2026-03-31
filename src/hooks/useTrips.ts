

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tripService, Trip } from "@/services/trip.service";

export const tripKeys = {
  all: ["trips"] as const,
  lists: () => [...tripKeys.all, "list"] as const,
  detail: (id: string) => [...tripKeys.all, "detail", id] as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────────────────────────────────────

export function useTrips() {
  return useQuery<Trip[]>({
    queryKey: tripKeys.lists(),
    queryFn: tripService.getTrips,
    staleTime: 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Core CRUD
// ─────────────────────────────────────────────────────────────────────────────

export function useCreateTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Trip>) => tripService.createTrip(payload),
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

// ─────────────────────────────────────────────────────────────────────────────
// M2 – Load Assignment
// ─────────────────────────────────────────────────────────────────────────────

export function useAssignTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      tripService.assignTrip(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(id) });
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// M3 – Expense Pre-Assignment
// ─────────────────────────────────────────────────────────────────────────────

export function usePreExpenses() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      tripService.addPreExpenses(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(id) });
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// M4 – Admin fallback: upload start documents on driver's behalf
// ─────────────────────────────────────────────────────────────────────────────

export function useUploadStartDocuments() {
  return useMutation({
    mutationFn: (formData: FormData) =>
      tripService.uploadStartDocuments(formData),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// M7 – Delivery / POD  (trip must be IN_TRANSIT or REACHED)
// ─────────────────────────────────────────────────────────────────────────────

export function useDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      tripService.recordDelivery(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(id) });
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// M8 – Customer Extra Costs
// ─────────────────────────────────────────────────────────────────────────────

export function useExtraCosts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      tripService.addExtraCosts(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(id) });
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// M9 – Empty Container Return
// ─────────────────────────────────────────────────────────────────────────────

export function useContainerReturn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      tripService.recordContainerReturn(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(id) });
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// M10 – Operational Additional Costs
// ─────────────────────────────────────────────────────────────────────────────

export function useAdditionalCosts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      tripService.addAdditionalCosts(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(id) });
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// M11 – Actual Trip Expenses  (only after trip is delivered or completed)
// ─────────────────────────────────────────────────────────────────────────────

export function useActualExpenses() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      tripService.recordActualExpenses(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(id) });
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// M12 – Driver Wage
// ─────────────────────────────────────────────────────────────────────────────

export function useDriverWage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      tripService.recordDriverWage(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(id) });
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// M13 – Settlement & Invoicing
// ─────────────────────────────────────────────────────────────────────────────

export function useSettlement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      tripService.recordSettlement(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(id) });
    },
  });
}