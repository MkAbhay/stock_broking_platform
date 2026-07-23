"use client";

import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f5f7fb",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        <Box
          component="main"
          sx={{
            flex: 1,
            p: 3,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
