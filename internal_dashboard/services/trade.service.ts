import api from "./axios";

export async function getTrades(params?: {
  page?: number;
  limit?: number;
  searchText?: string;
  startDate?: string;
  endDate?: string;
}) {
  const { data } = await api.get("/trades", {
    params,
  });

  return data;
}