"use client";

import { useState } from "react";
import {
  Alert,
  Avatar,
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import { useRouter } from "next/navigation";

import { login_api, login_user, logout } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const [employeeCode, setEmployeeCode] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      logout();

      const response = await login_api(employeeCode);

      if (!response) {
        throw new Error("Invalid Employee");
      }

      login_user(response);
      router.push("/clients");
    } catch {
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: "primary.main",
              mb: 2,
            }}
          >
            <BusinessIcon fontSize="medium" />
          </Avatar>

          <Typography
            variant="h5"
            color="text.primary"
            sx={{ fontWeight: 600 }}
          >
            Welcome Back
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Login to internal dashboard
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Employee Code"
          value={employeeCode}
          onChange={(e) => setEmployeeCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          autoFocus
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />

        <Button
          fullWidth
          size="large"
          variant="contained"
          disabled={!employeeCode || loading}
          onClick={handleLogin}
          sx={{
            mt: 3,
            py: 1.3,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            boxShadow: "none",

            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : "Sign In"}
        </Button>

        <Typography
          component="span"
          variant="caption"
          color="text.secondary"
          sx={{ mt: 3, textAlign: "center", display: "block" }}
        >
          Internal employee access only
        </Typography>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert severity="error" variant="filled" onClose={() => setOpen(false)}>
          Invalid Employee Code
        </Alert>
      </Snackbar>
    </Box>
  );
}
