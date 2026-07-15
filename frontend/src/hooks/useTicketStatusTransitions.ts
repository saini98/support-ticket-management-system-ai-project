import { useCallback, useEffect, useState } from "react";

import { ticketApi } from "../services/ticket.service";
import { ApiError } from "../types/api.types";
import type { TicketStatusTransitions } from "../types/ticket.types";

export const useTicketStatusTransitions = (ticketId?: string) => {
  const [transitions, setTransitions] = useState<TicketStatusTransitions | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransitions = useCallback(async () => {
    if (!ticketId) {
      setError("Ticket ID is missing");
      setTransitions(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await ticketApi.getStatusTransitions(ticketId);
      setTransitions(data);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to load allowed status transitions.";

      setError(message);
      setTransitions(null);
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    void fetchTransitions();
  }, [fetchTransitions]);

  return {
    transitions,
    loading,
    error,
    refetch: fetchTransitions,
  };
};
