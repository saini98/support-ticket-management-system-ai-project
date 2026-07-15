import { z } from "zod";

import {
  parseTicketPriorityQuery,
  TICKET_PRIORITY_FILTER_OPTIONS,
} from "../utils/parse-ticket-priority.js";
import {
  parseTicketStatusQuery,
  TICKET_STATUS_FILTER_OPTIONS,
} from "../utils/parse-ticket-status.js";

export const ticketPrioritySchema = z.enum(
  ["LOW", "MEDIUM", "HIGH", "URGENT"],
  { error: "Priority is required" },
);

export const ticketStatusSchema = z.enum([
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
  "CANCELLED",
]);

export const ticketBodySchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  priority: ticketPrioritySchema,
  assigneeId: z.string().trim().min(1, "Assigned user is required"),
});

export const createTicketSchema = ticketBodySchema.extend({
  creatorId: z.string().trim().min(1, "Creator ID is required"),
});

export const updateTicketSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required").optional(),
    description: z.string().trim().min(1, "Description is required").optional(),
    priority: ticketPrioritySchema.optional(),
    assigneeId: z.string().trim().min(1, "Assigned user is required").optional(),
    status: ticketStatusSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
  });

export const ticketIdParamsSchema = z.object({
  id: z.string().trim().min(1, "Ticket ID is required"),
});

export const ticketSearchQuerySchema = z.object({
  search: z.string().trim().min(1, "Search keyword cannot be empty").optional(),
  status: z
    .string()
    .trim()
    .min(1, "Status cannot be empty")
    .transform((value, ctx) => {
      const parsedStatus = parseTicketStatusQuery(value);

      if (!parsedStatus) {
        ctx.addIssue({
          code: "custom",
          message: `Invalid status. Supported values: ${TICKET_STATUS_FILTER_OPTIONS}`,
        });
        return z.NEVER;
      }

      return parsedStatus;
    })
    .optional(),
  priority: z
    .string()
    .trim()
    .min(1, "Priority cannot be empty")
    .transform((value, ctx) => {
      const parsedPriority = parseTicketPriorityQuery(value);

      if (!parsedPriority) {
        ctx.addIssue({
          code: "custom",
          message: `Invalid priority. Supported values: ${TICKET_PRIORITY_FILTER_OPTIONS}`,
        });
        return z.NEVER;
      }

      return parsedPriority;
    })
    .optional(),
  assignedTo: z
    .string()
    .trim()
    .min(1, "assignedTo cannot be empty")
    .optional(),
  page: z.coerce
    .number()
    .int("Page must be an integer")
    .min(1, "Page must be at least 1")
    .optional(),
  limit: z.coerce
    .number()
    .int("Limit must be an integer")
    .min(1, "Limit must be at least 1")
    .max(100, "Limit cannot exceed 100")
    .optional(),
  sortBy: z
    .enum(["createdAt", "updatedAt", "title", "priority", "status"], {
      error: "Invalid sort field",
    })
    .optional(),
  sortOrder: z.enum(["asc", "desc"], { error: "Invalid sort order" }).optional(),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type UpdateTicketInput = z.infer<typeof updateTicketSchema>;
export type TicketSearchQuery = z.infer<typeof ticketSearchQuerySchema>;
