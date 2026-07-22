import { useQuery } from "@tanstack/react-query";
import {
  getEmployees,
} from "@/services/employee.service";

export function useEmployees(params?: {
  page?: number;
  limit?: number;
  searchText?: string;
}) {
  return useQuery({
    queryKey: ["employees", params],
    queryFn: () => getEmployees(params),
  });
}