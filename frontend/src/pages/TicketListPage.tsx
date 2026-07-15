import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import TicketFiltersBar from "../components/tickets/TicketFiltersBar";
import TicketTable, { TicketEmptyState } from "../components/tickets/TicketTable";
import { useTickets } from "../hooks/useTickets";
import { ROUTES } from "../routes/paths";

function TicketListPage() {
  const {
    tickets,
    loading,
    error,
    search,
    statusFilter,
    hasActiveFilters,
    setSearch,
    setStatusFilter,
    applySearch,
    refetch,
  } = useTickets();

  const hasFilters = hasActiveFilters;

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Ticket List
          </Typography>
          <Typography color="text.secondary">
            Browse, search, and filter support tickets.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button
            startIcon={<RefreshIcon />}
            onClick={() => void refetch()}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            component={RouterLink}
            to={ROUTES.CREATE_TICKET}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Create Ticket
          </Button>
        </Stack>
      </Stack>

      <TicketFiltersBar
        search={search}
        statusFilter={statusFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onSearchSubmit={applySearch}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : !error && tickets.length === 0 ? (
        <TicketEmptyState hasFilters={hasFilters} />
      ) : !error ? (
        <TicketTable tickets={tickets} />
      ) : null}
    </Box>
  );
}

export default TicketListPage;
