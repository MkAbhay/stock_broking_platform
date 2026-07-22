import api from "./axios";

export async function getEmployees(params?: { 
    page?: number; 
    limit?: number; 
    searchText?: string; 
}) {
  const { data } = await api.get("/employees", {
    params,
  });

  return data;
}