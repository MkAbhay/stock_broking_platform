"use client";

import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";

interface Props {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  placeholder = "Search...",
  onChange,
}: Props) {
  return (
    <TextField
      fullWidth
      size="small"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        bgcolor: "white",
        mb: 2,
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}