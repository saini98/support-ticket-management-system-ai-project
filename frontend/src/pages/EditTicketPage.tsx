import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import EditTicketForm from "../components/tickets/EditTicketForm";
import StatusChip from "../components/common/StatusChip";
import { ticketApi } from "../services/ticket.service";
import { ApiError } from "../types/api.types";
import type { Ticket } from "../types/ticket.types";
import { ROUTES } from "../routes/paths";

function EditTicketPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTicket = useCallback(async () => {
    if (!id) {
      setError("Ticket ID is missing");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const ticketData = await ticketApi.getById(id);
      setTicket(ticketData);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to load ticket. Please try again.";

      setError(message);
      setTicket(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void loadTicket();
  }, [loadTicket]);

  const handleSuccess = (ticketId: string) => {
    navigate(ROUTES.TICKET_DETAIL(ticketId), {
      replace: true,
      state: { ticketUpdated: true },
    });
  };

  const handleCancel = () => {
    if (id) {
      navigate(ROUTES.TICKET_DETAIL(id));
      return;
    }

    navigate(ROUTES.TICKETS);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !ticket) {
    return (
      <Stack spacing={2}>
        <Alert severity="error">{error ?? "Ticket not found"}</Alert>
        <Button component={RouterLink} to={ROUTES.TICKETS} variant="outlined">
          Back to Ticket List
        </Button>
      </Stack>
    );
  }

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
            Edit Ticket
          </Typography>
          <Typography color="text.secondary">
            Update title, description, priority, and assigned user for this
            ticket.
          </Typography>
        </Box>
        <StatusChip status={ticket.status} />
      </Stack>

      <EditTicketForm
        key={ticket.id}
        ticket={ticket}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />

      <Box sx={{ mt: 2 }}>
        <Button component={RouterLink} to={ROUTES.TICKET_DETAIL(ticket.id)}>
          Back to Ticket Details
        </Button>
      </Box>
    </Box>
  );
}

export default EditTicketPage;
