import { useQuery } from "@tanstack/react-query";
import { getIncentives } from "@/services/incentive.service";

export function useIncentives(params?: {
    page?: number;
    limit?: number;
    searchText?: string;
}) {
  return useQuery({
    queryKey: ["incentive", params],
    queryFn: () => getIncentives(params),
  });
}