"use client";

import { Box, TextField } from "@mui/material";

interface Props {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

export default function TradeFilters({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: Props) {
  return (
    <Box
      component="div"
      sx={{ display: "flex", gap: 2, mb: 2 }}
    >
      <TextField
        label="Start Date"
        type="date"
        size="small"
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <TextField
        label="End Date"
        type="date"
        size="small"
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        slotProps={{ inputLabel: { shrink: true } }}
      />
    </Box>
  );
}