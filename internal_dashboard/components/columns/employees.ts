import { GridColDef } from "@mui/x-data-grid";

export const employeeColumns: GridColDef[] = [
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
    field: "email",
    headerName: "Email",
    flex: 1,
    minWidth: 260,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 170,
  },
];