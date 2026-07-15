import type { UserSummary } from "./ticket.types";

export interface Comment {
  id: string;
  message: string;
  ticketId: string;
  authorId: string;
  author: UserSummary;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentPayload {
  message: string;
  authorId: string;
}
