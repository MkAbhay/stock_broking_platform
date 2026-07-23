"use client";

import { useMemo, useState } from "react";
import { Alert, Box } from "@mui/material";
import { useDebounce } from "use-debounce";

import PageHeader from "@/components/common/PageHeader";
import SearchBar from "@/components/common/SearchBar";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";

import { clientColumns } from "@/components/columns/clients";

import { useClients } from "@/hooks/useClients";
import useSocketRefresh from "@/hooks/useSocketRefresh";

export default function ClientsPage() {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isFetching, error } = useClients({
    page,
    limit,
    searchText: debouncedSearch,
  });

  useSocketRefresh({
    queryKey: ["clients"],
  });

  const rows = useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  if (error) {
    return (
      <Alert severity="error">
        Failed to load clients.
      </Alert>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Clients"
        subtitle="View all registered clients"
      />

      <SearchBar
        value={search}
        onChange={(value) => {
            setSearch(value);
            setPage(1);
        }}
        placeholder="Search by client code or name..."
      />

      {(isLoading && !data) ? (
        <Loading />
      ) : (
        <DataTable
          rows={rows.data}
          columns={clientColumns}
          loading={isFetching}
          pagination={{
            page: rows?.pagination?.page ?? 1,
            limit: rows?.pagination?.limit ?? 10,
            total: rows?.pagination?.total ?? 0,
          }}
          onPaginationChange={(page, limit) => {
            setPage(page);
            setLimit(limit);
          }}
        />
      )}
    </Box>
  );
}