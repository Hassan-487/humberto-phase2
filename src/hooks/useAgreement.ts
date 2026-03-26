import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { agreementService, Agreement } from "@/services/agreement.service";

/* ================= QUERY KEYS ================= */

export const agreementKeys = {
  all: ["agreements"] as const,
  list: () => [...agreementKeys.all, "list"] as const,
  detail: (id: string) => [...agreementKeys.all, "detail", id] as const,
};

/* ================= HOOK ================= */

export function useAgreements() {
  const qc = useQueryClient();

  /* 🔹 GET ALL */
  const query = useQuery<Agreement[]>({
    queryKey: agreementKeys.list(),
    queryFn: agreementService.getAgreements,
    staleTime: 2 * 60 * 1000,

    retry: false,
    refetchOnWindowFocus: false,
  });

  /* 🔹 CREATE */
  const createMutation = useMutation({
    mutationFn: agreementService.createAgreement,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: agreementKeys.list() });
    },
  });

  /* 🔹 UPDATE */
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<Agreement>;
    }) => agreementService.updateAgreement(id, payload),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: agreementKeys.list() });
      qc.invalidateQueries({ queryKey: agreementKeys.detail(vars.id) });
    },
  });

  /* 🔹 DELETE */
  const deleteMutation = useMutation({
    mutationFn: agreementService.deleteAgreement,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: agreementKeys.list() });
    },
  });

  return {
    agreements: query.data ?? [],
    loading: query.isLoading,

    createAgreement: createMutation.mutateAsync,
    updateAgreement: updateMutation.mutateAsync,
    deleteAgreement: deleteMutation.mutateAsync,
  };
}