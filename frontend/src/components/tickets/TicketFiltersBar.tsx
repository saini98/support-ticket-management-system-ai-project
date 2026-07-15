import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import type { TicketStatus } from "../../types/ticket.types";
import { TICKET_STATUS_FILTER_OPTIONS } from "../../utils/ticket.utils";

interface TicketFiltersBarProps {
  search: string;
  statusFilter: TicketStatus | "";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: TicketStatus | "") => void;
  onSearchSubmit: () => void;
}

function TicketFiltersBar({
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onSearchSubmit,
}: TicketFiltersBarProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onSearchSubmit();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 3,
      }}
    >
      <TextField
        label="Search tickets"
        placeholder="Search title or description"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ minWidth: 280, flexGrow: 1 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="ticket-status-filter-label">Status</InputLabel>
        <Select
          labelId="ticket-status-filter-label"
          label="Status"
          value={statusFilter}
          onChange={(event) =>
            onStatusChange(event.target.value as TicketStatus | "")
          }
        >
          <MenuItem value="">
            <em>All statuses</em>
          </MenuItem>
          {TICKET_STATUS_FILTER_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" onClick={onSearchSubmit}>
        Search
      </Button>
    </Box>
  );
}

export default TicketFiltersBar;
