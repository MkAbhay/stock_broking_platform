import { useQuery } from "@tanstack/react-query";
import { getTrades } from "@/services/trade.service";

export function useTrades(params?: {
  page?: number;
  limit?: number;
  searchText?: string;
  startDate?: string;
  endDate?: string;
}) {
  return useQuery({
    queryKey: ["trades", params],
    queryFn: () => getTrades(params),
  });
}