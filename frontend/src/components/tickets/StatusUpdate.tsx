import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import StatusChip from "../common/StatusChip";
import { useTicketStatusTransitions } from "../../hooks/useTicketStatusTransitions";
import { ticketApi } from "../../services/ticket.service";
import { ApiError } from "../../types/api.types";
import type { Ticket, TicketStatus } from "../../types/ticket.types";
import { TICKET_STATUS_LABELS } from "../../utils/ticket.utils";

interface StatusUpdateProps {
  ticketId: string;
  onStatusUpdated?: (ticket: Ticket) => void;
}

function StatusUpdate({ ticketId, onStatusUpdated }: StatusUpdateProps) {
  const { transitions, loading, error, refetch } =
    useTicketStatusTransitions(ticketId);
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus | "">("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSelectedStatus("");
    setSubmitError(null);
  }, [transitions?.currentStatus]);

  const handleSubmit = async () => {
    if (!selectedStatus) {
      setSubmitError("Please select a new status");
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const updatedTicket = await ticketApi.update(ticketId, {
        status: selectedStatus,
      });

      setSelectedStatus("");
      await refetch();
      onStatusUpdated?.(updatedTicket);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to update ticket status. Please try again.";

      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <CircularProgress size={28} />
        </Box>
      </Paper>
    );
  }

  if (error || !transitions) {
    return (
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Alert severity="error">{error ?? "Unable to load status transitions"}</Alert>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Update Status
      </Typography>

      <Stack spacing={2}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Current Status
          </Typography>
          <StatusChip status={transitions.currentStatus} />
        </Box>

        {transitions.isTerminal ? (
          <Alert severity="info">
            This ticket is in a terminal state. No further status transitions are
            allowed.
          </Alert>
        ) : (
          <>
            <FormControl fullWidth disabled={isSubmitting}>
              <InputLabel id="status-update-label">New Status</InputLabel>
              <Select
                labelId="status-update-label"
                label="New Status"
                value={selectedStatus}
                onChange={(event) => {
                  setSelectedStatus(event.target.value as TicketStatus);
                  setSubmitError(null);
                }}
              >
                <MenuItem value="">
                  <em>Select a status</em>
                </MenuItem>
                {transitions.allowedTransitions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {TICKET_STATUS_LABELS[status]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {submitError && <Alert severity="error">{submitError}</Alert>}

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                disabled={isSubmitting || !selectedStatus}
                onClick={() => void handleSubmit()}
                startIcon={
                  isSubmitting ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : undefined
                }
              >
                {isSubmitting ? "Updating..." : "Update Status"}
              </Button>
            </Box>
          </>
        )}
      </Stack>
    </Paper>
  );
}

export default StatusUpdate;
