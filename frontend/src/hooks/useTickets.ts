import { useCallback, useEffect, useState } from "react";

import { ticketApi } from "../services/ticket.service";
import { ApiError } from "../types/api.types";
import type { Ticket, TicketFilters, TicketStatus } from "../types/ticket.types";

interface UseTicketsResult {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  search: string;
  statusFilter: TicketStatus | "";
  hasActiveFilters: boolean;
  setSearch: (value: string) => void;
  setStatusFilter: (value: TicketStatus | "") => void;
  applySearch: () => void;
  refetch: () => Promise<void>;
}

export const useTickets = (): UseTicketsResult => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "">("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const filters: TicketFilters = {};

      if (appliedSearch.trim()) {
        filters.search = appliedSearch.trim();
      }

      if (statusFilter) {
        filters.status = statusFilter;
      }

      const data = await ticketApi.getAll(
        Object.keys(filters).length > 0 ? filters : undefined,
      );

      setTickets(data);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to load tickets. Please try again.";

      setError(message);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }, [appliedSearch, statusFilter]);

  useEffect(() => {
    void fetchTickets();
  }, [fetchTickets]);

  const applySearch = () => {
    setAppliedSearch(search);
  };

  return {
    tickets,
    loading,
    error,
    search,
    statusFilter,
    hasActiveFilters: Boolean(appliedSearch.trim() || statusFilter),
    setSearch,
    setStatusFilter,
    applySearch,
    refetch: fetchTickets,
  };
};
