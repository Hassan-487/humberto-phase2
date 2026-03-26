import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { companyService, Company } from "@/services/company.serivce";

/* ================= QUERY KEYS ================= */

export const companyKeys = {
  all: ["companies"] as const,
  list: () => [...companyKeys.all, "list"] as const,
  detail: (id: string) => [...companyKeys.all, "detail", id] as const,
};

/* ================= GET ================= */

export function useCompanies() {
  const qc = useQueryClient();

  const query = useQuery<Company[]>({
    queryKey: companyKeys.list(),
    queryFn: companyService.getCompanies,
    staleTime: 2 * 60 * 1000,

    retry: false,
    refetchOnWindowFocus: false,
  });

  /* ================= CREATE ================= */

  const createMutation = useMutation({
    mutationFn: companyService.createCompany,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: companyKeys.list() });
    },
  });

  /* ================= UPDATE ================= */

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<Company>;
    }) => companyService.updateCompany(id, payload),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: companyKeys.list() });
      qc.invalidateQueries({ queryKey: companyKeys.detail(vars.id) });
    },
  });

  /* ================= DELETE ================= */

  const deleteMutation = useMutation({
    mutationFn: companyService.deleteCompany,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: companyKeys.list() });
    },
  });

  const uploadMutation = useMutation({
  mutationFn: companyService.uploadCompanyDocuments,
});
  return {
    companies: query.data ?? [],
    loading: query.isLoading,

    createCompany: createMutation.mutateAsync,
    updateCompany: updateMutation.mutateAsync,
    deleteCompany: deleteMutation.mutateAsync,
    uploadCompanyDocuments: uploadMutation.mutateAsync,
  };
  
}