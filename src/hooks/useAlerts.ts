import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { alertService } from '@/services/alert.service';

export const alertKeys = {
  all: ['alerts'] as const,
  lists: () => [...alertKeys.all, 'list'] as const,
  stats: () => [...alertKeys.all, 'stats'] as const,
};

export function useAlerts() {
  return useQuery({
    queryKey: alertKeys.lists(),
    queryFn: alertService.getAlerts,
    staleTime: 30000, // 30 seconds
    refetchInterval: 30000,
  });
}

export function useAlertStats() {
  return useQuery({
    queryKey: alertKeys.stats(),
    queryFn: alertService.getAlertStats,
    staleTime: 30000,
  });
}

export function useAcknowledgeAlert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => alertService.acknowledgeAlert(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: alertKeys.all });
    },
  });
}

export function useResolveAlert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, outcome, notes }: { id: string; outcome?: string; notes?: string }) => 
      alertService.resolveAlert(id, outcome, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: alertKeys.all });
    },
  });
}

export function useIgnoreAlert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) => 
      alertService.ignoreAlert(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: alertKeys.all });
    },
  });
}