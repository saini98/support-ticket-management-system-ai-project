import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";

import Comments from "../components/tickets/Comments";
import StatusUpdate from "../components/tickets/StatusUpdate";
import TicketInfoCard from "../components/tickets/TicketInfoCard";
import { useTicketDetails } from "../hooks/useTicketDetails";
import { ROUTES } from "../routes/paths";

function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { ticket, loading, error, refetch } = useTicketDetails(id);
  const [showUpdatedAlert, setShowUpdatedAlert] = useState(
    Boolean((location.state as { ticketUpdated?: boolean } | null)?.ticketUpdated),
  );

  useEffect(() => {
    if ((location.state as { ticketUpdated?: boolean } | null)?.ticketUpdated) {
      setShowUpdatedAlert(true);
    }
  }, [location.state]);

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
    <Stack spacing={3}>
      {showUpdatedAlert && (
        <Alert
          severity="success"
          onClose={() => setShowUpdatedAlert(false)}
        >
          Ticket updated successfully
        </Alert>
      )}

      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Ticket Details
        </Typography>
        <Typography color="text.secondary">
          View ticket information, status, assignment, and comments.
        </Typography>
      </Box>

      <TicketInfoCard ticket={ticket} />

      <StatusUpdate ticketId={ticket.id} onStatusUpdated={() => void refetch()} />

      <Comments ticketId={ticket.id} />

      <Box>
        <Button component={RouterLink} to={ROUTES.TICKETS}>
          Back to Ticket List
        </Button>
      </Box>
    </Stack>
  );
}

export default TicketDetailPage;
