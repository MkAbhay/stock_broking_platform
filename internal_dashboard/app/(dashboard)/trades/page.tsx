"use client";

import { useMemo, useState } from "react";
import { Alert, Box } from "@mui/material";
import { useDebounce } from "use-debounce";

import PageHeader from "@/components/common/PageHeader";
import SearchBar from "@/components/common/SearchBar";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";

import TradeFilters from "@/components/trades/TradeFilters";
import { tradeColumns } from "@/components/columns/trades";

import { useTrades } from "@/hooks/useTrades";
import useSocketRefresh from "@/hooks/useSocketRefresh";

export default function TradesPage() {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [search, setSearch] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isFetching, error } = useTrades({
    page,
    limit,
    searchText: debouncedSearch,
    startDate,
    endDate,
  });

  useSocketRefresh({
    queryKey: ["trades"],
  });

  const rows = useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  if (error) {
    return (
      <Alert severity="error">
        Failed to load trades.
      </Alert>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Trades"
        subtitle="View all executed trades"
      />

      <SearchBar
        value={search}
        placeholder="Search by client Code or client Name..."
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <TradeFilters
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={(value) => {
          setStartDate(value);
          setPage(1);
        }}
        onEndDateChange={(value) => {
          setEndDate(value);
          setPage(1);
        }}
      />

      {(isLoading && !data) ? (
        <Loading />
      ) : (
        <DataTable
          rows={rows.data}
          columns={tradeColumns}
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