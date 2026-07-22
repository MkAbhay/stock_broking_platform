import { useQuery } from "@tanstack/react-query";
import { getClients, getClientsByEmployee } from "@/services/client.service";

export function useClients(params?: {
  page?: number;
  limit?: number;
  searchText?: string;
}) {
  return useQuery({
    queryKey: ["clients", params],
    queryFn: () => getClients(params),
  });
}

export function useClientsByEmployee(employeeId: string) {
  return useQuery({
    queryKey: ["clients", employeeId],
    queryFn: () => getClientsByEmployee(employeeId),
  });
}