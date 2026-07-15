import { useCallback, useEffect, useState } from "react";

import { commentApi } from "../services/comment.service";
import { ApiError } from "../types/api.types";
import type { Comment } from "../types/comment.types";

export const useComments = (ticketId?: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(
    async (isRefresh = false) => {
      if (!ticketId) {
        setError("Ticket ID is missing");
        setComments([]);
        setLoading(false);
        return;
      }

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);

      try {
        const data = await commentApi.getByTicketId(ticketId);
        setComments(data);
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : "Failed to load comments. Please try again.";

        setError(message);
        setComments([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [ticketId],
  );

  useEffect(() => {
    void fetchComments();
  }, [fetchComments]);

  const refetch = useCallback(async () => {
    await fetchComments(true);
  }, [fetchComments]);

  return {
    comments,
    loading,
    refreshing,
    error,
    refetch,
  };
};
