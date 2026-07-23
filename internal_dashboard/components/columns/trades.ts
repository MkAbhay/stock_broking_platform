import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const tradeColumns: GridColDef[] = [
  {
    field: "trade_id",
    headerName: "Trade ID",
    width: 150,
  },
  {
    field: "date",
    headerName: "Trade Date",
    width: 180,
    valueFormatter: (value) =>
      value ? dayjs(value).format("DD MMM YYYY") : "",
  },
  {
    field: "symbol",
    headerName: "Symbol",
    width: 140,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 120,
    type: "number",
  },
  {
    field: "price",
    headerName: "Price",
    width: 140,
    type: "number",
    valueFormatter: (value) => `₹${Number(value).toFixed(2)}`,
  },
  {
    field: "clientCode",
    headerName: "Client Code",
    width: 140,
    valueGetter: (_, row) => row.client?.client_code,
  },
  {
    field: "clientName",
    headerName: "Client Name",
    flex: 1,
    minWidth: 220,
    valueGetter: (_, row) => row.client?.name,
  },
];