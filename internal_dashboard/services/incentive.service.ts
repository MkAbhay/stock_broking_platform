import api from "./axios";

export async function getIncentives(params?: { 
    page?: number; 
    limit?: number; 
    searchText?: string; 
}) {
  const { data } = await api.get("/incentive", {
    params,
  });

  return data;
}