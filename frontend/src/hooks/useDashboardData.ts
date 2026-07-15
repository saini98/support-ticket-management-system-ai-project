import { useCallback, useEffect, useState } from "react";

import { commentApi } from "../services/comment.service";
import { ticketApi } from "../services/ticket.service";
import { ApiError } from "../types/api.types";
import type { Comment } from "../types/comment.types";
import type { Ticket } from "../types/ticket.types";
import { buildDashboardData, type DashboardData } from "../utils/dashboardData.utils";

const EMPTY_DASHBOARD_DATA: DashboardData = buildDashboardData([], []);

const fetchCommentsForTickets = async (
  tickets: Ticket[],
): Promise<Comment[]> => {
  const ticketsForComments = tickets.slice(0, 20);
  const results = await Promise.allSettled(
    ticketsForComments.map((ticket) => commentApi.getByTicketId(ticket.id)),
  );

  return results.flatMap((result) =>
    result.status === "fulfilled" ? result.value : [],
  );
};

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData>(EMPTY_DASHBOARD_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const tickets = await ticketApi.getAll();
      const comments = await fetchCommentsForTickets(tickets);
      setData(buildDashboardData(tickets, comments));
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to load dashboard data. Please try again.";

      setError(message);
      setData(EMPTY_DASHBOARD_DATA);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    data,
    loading,
    error,
    refetch: fetchDashboardData,
  };
};
