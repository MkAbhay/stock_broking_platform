import api from "./axios";

export async function getClients(params?: {
  page?: number;
  limit?: number;
  searchText?: string;
}) {
  const { data } = await api.get("/clients", {
    params,
  });

  return data;
}

export async function getClientsByEmployee(employee_code: string) {
  const { data } = await api.get(`/clients/${employee_code}`);

  return data;
}