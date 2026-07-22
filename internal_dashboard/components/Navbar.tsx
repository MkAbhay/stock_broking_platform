"use client";

import { AppBar, Box, Toolbar, Typography, Chip } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      elevation={1}
      color="inherit"
      sx={{
        backgroundColor: "#fff",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600 }}
        >
          Stock Broker Dashboard
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Chip
            label="Live"
            color="success"
            size="small"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}