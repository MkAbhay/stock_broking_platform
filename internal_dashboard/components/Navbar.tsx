"use client";

import { logout } from "@/services/auth.service";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

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

          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<LogoutRoundedIcon />}
            onClick={handleLogout}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 2,
            }}
          >
            Logout
          </Button>

        </Box>
      </Toolbar>
    </AppBar>
  );
}