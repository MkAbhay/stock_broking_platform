import { GridColDef } from "@mui/x-data-grid";

export const incentiveColumns: GridColDef[] = [
  {
    field: "employee_code",
    headerName: "Employee Code",
    width: 170,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    minWidth: 220,
  },
  {
    field: "total_brokerage",
    headerName: "Total Brokerage",
    width: 180,
    type: "number",
    valueFormatter: (value) =>
      `₹${Number(value).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
  },
];