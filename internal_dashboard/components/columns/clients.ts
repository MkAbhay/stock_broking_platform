import { GridColDef } from "@mui/x-data-grid";

export const clientColumns: GridColDef[] = [
  {
    field: "client_code",
    headerName: "Client Code",
    width: 150,
  },

  {
    field: "name",
    headerName: "Client Name",
    flex: 1,
    minWidth: 220,
  },

  {
    field: "email",
    headerName: "Email",
    flex: 1,
    minWidth: 250,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },

  {
    field: "pan",
    headerName: "PAN",
    width: 150,
  },
];