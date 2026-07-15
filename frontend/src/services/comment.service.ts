import type {
  Comment,
  CreateCommentPayload,
} from "../types/comment.types";
import { apiClient } from "./api/client";

const commentsPath = (ticketId: string): string =>
  `/tickets/${ticketId}/comments`;

export const commentApi = {
  getByTicketId: async (ticketId: string): Promise<Comment[]> => {
    const response = await apiClient.get<Comment[]>(commentsPath(ticketId));
    return response.data;
  },

  create: async (
    ticketId: string,
    payload: CreateCommentPayload,
  ): Promise<Comment> => {
    const response = await apiClient.post<Comment>(
      commentsPath(ticketId),
      payload,
    );

    return response.data;
  },
};

export default commentApi;
