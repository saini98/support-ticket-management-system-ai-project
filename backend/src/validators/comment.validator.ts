import { z } from "zod";

export const createCommentSchema = z.object({
  message: z.string().trim().min(1, "Message is required"),
  authorId: z.string().trim().min(1, "Author ID is required"),
});

export const ticketCommentParamsSchema = z.object({
  ticketId: z.string().trim().min(1, "Ticket ID is required"),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
