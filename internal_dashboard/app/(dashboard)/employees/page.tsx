"use client";

import { Alert, Box } from "@mui/material";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import PageHeader from "@/components/common/PageHeader";
import SearchBar from "@/components/common/SearchBar";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";

import { employeeColumns } from "@/components/columns/employees";

import { useEmployees } from "@/hooks/useEmployee";
import useSocketRefresh from "@/hooks/useSocketRefresh";

export default function EmployeesPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  
  const { data, isLoading, isFetching, error } = useEmployees({
    page,
    limit,
    searchText: debouncedSearch,
  });

  useSocketRefresh({
    queryKey: ["employees"],
  });

  const rows = useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  if (error) {
    return (
      <Alert severity="error">
        Failed to load employees.
      </Alert>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Employees"
        subtitle="View all relationship managers"
      />

      <SearchBar
        value={search}
        placeholder="Search employee by name or code..."
        onChange={setSearch}
      />

      {(isLoading && !data) ? (
        <Loading />
      ) : (
        <DataTable
          rows={rows.data}
          columns={employeeColumns}
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