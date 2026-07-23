"use client";

import { useMemo } from "react";

import { Alert, Box } from "@mui/material";

import PageHeader from "@/components/common/PageHeader";
import Loading from "@/components/common/Loading";

import { clientColumns } from "@/components/columns/clients";

import { useClientsByEmployee } from "@/hooks/useClients";
import useSocketRefresh from "@/hooks/useSocketRefresh";
import { DataGrid } from "@mui/x-data-grid";

export default function MyClientsPage() {
  const { data, isLoading, isFetching, error } = useClientsByEmployee("RM0001");

  useSocketRefresh({
    queryKey: ["employee-clients"],
  });

  const rows = useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  if (error) {
    return <Alert severity="error">Failed to load employee clients.</Alert>;
  }

  return (
    <Box>
      <PageHeader
        title="My Clients"
        subtitle="View clients assigned to a relationship manager"
      />

      {isLoading && !data ? (
        <Loading />
      ) : (
        <Box
          sx={{
            height: 575,
            width: "100%",
            bgcolor: "white",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 1,
          }}
        >
          <DataGrid
            rows={rows}
            columns={clientColumns}
            loading={isFetching}
            disableRowSelectionOnClick
            sx={{
              border: 0,

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
              },

              "& .MuiDataGrid-cell": {
                outline: "none",
              },

              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: 700,
              },

              "& .MuiDataGrid-virtualScroller": {
                overflowY: "auto",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
