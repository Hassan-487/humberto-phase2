import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customerService, Customer } from "@/services/customer.services";

export const customerKeys = {
  all: ["customers"] as const,
  list: () => [...customerKeys.all, "list"] as const,
  detail: (id: string) => [...customerKeys.all, "detail", id] as const,
};

/* ================= GET ================= */

export function useCustomers() {
  const qc = useQueryClient();

  const query = useQuery<Customer[]>({
    queryKey: customerKeys.list(),
    queryFn: customerService.getCustomers,
    staleTime: 2 * 60 * 1000,
  });

  /* ================= CREATE ================= */

  const createMutation = useMutation({
    mutationFn: customerService.createCustomer,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: customerKeys.list() });
    },
  });

  /* ================= UPLOAD ================= */

  const uploadMutation = useMutation({
    mutationFn: customerService.uploadCustomerDocuments,
  });

  return {
    customers: query.data ?? [],
    loading: query.isLoading,

    createCustomer: createMutation.mutateAsync,
    uploadCustomerDocuments: uploadMutation.mutateAsync,
  };
}