import { useCallback, useEffect, useState } from "react";

import { ticketApi } from "../services/ticket.service";
import { ApiError } from "../types/api.types";
import type { Ticket } from "../types/ticket.types";

export const useTicketDetails = (ticketId?: string) => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = useCallback(async () => {
    if (!ticketId) {
      setError("Ticket ID is missing");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const ticketData = await ticketApi.getById(ticketId);
      setTicket(ticketData);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to load ticket details. Please try again.";

      setError(message);
      setTicket(null);
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    void fetchDetails();
  }, [fetchDetails]);

  return {
    ticket,
    loading,
    error,
    refetch: fetchDetails,
  };
};
