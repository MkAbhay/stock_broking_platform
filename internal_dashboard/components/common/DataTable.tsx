"use client";

import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface Pagination {
  page: number;
  limit: number;
  total: number;
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[];
  columns: GridColDef[];
  loading?: boolean;

  pagination: Pagination;

  onPaginationChange: (page: number, limit: number) => void;
}

export default function DataTable({
  rows,
  columns,
  loading = false,
  pagination,
  onPaginationChange,
}: Props) {
  const paginationModel: GridPaginationModel = {
    page: pagination.page - 1,
    pageSize: pagination.limit,
  };

  return (
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
        columns={columns}
        loading={loading}
        paginationMode="server"
        rowCount={pagination.total}
        paginationModel={paginationModel}
        pageSizeOptions={[10, 20, 50, 100]}
        disableRowSelectionOnClick
        onPaginationModelChange={(model) => {
          onPaginationChange(model.page + 1, model.pageSize);
        }}
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
  );
}