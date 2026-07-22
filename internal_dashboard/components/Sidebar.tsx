"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const menus = [
  {
    title: "Clients",
    href: "/clients",
  },
  {
    title: "Trades",
    href: "/trades",
  },
  {
    title: "Employees",
    href: "/employees",
  },
  {
    title: "My Clients",
    href: "/my-clients",
  },
  {
    title: "Incentives",
    href: "/incentives",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        width: 260,
        bgcolor: "#1e293b",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          py: 3,
          textAlign: "center",
          fontWeight: 700,
        }}
      >
        Internal Portal
      </Typography>

      <List>
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            style={{ textDecoration: "none" }}
          >
            <ListItemButton
              selected={pathname === menu.href}
              sx={{
                color: "#fff",

                "&.Mui-selected": {
                  bgcolor: "#2563eb",
                },

                "&.Mui-selected:hover": {
                  bgcolor: "#2563eb",
                },

                "&:hover": {
                  bgcolor: "#334155",
                },
              }}
            >
              <ListItemText primary={menu.title} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );
}