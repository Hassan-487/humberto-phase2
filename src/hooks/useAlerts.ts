
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAlerts, resolveAlert } from '@/services/alert.service';

export const useAlerts = () =>
  useQuery({
    queryKey: ['alerts'],
    queryFn: getAlerts,
    refetchInterval: 20000,
  });

export const useResolveAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resolveAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
};
