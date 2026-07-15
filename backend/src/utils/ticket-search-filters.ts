import type { TicketSearchFilters } from "../types/ticket.types.js";
import type { TicketSearchQuery } from "../validators/ticket.validator.js";

export const buildTicketSearchFilters = (
  query: Pick<
    TicketSearchQuery,
    "search" | "status" | "priority" | "assignedTo"
  >,
): TicketSearchFilters | undefined => {
  const filters: TicketSearchFilters = {
    ...(query.search && { search: query.search }),
    ...(query.status && { status: query.status }),
    ...(query.priority && { priority: query.priority }),
    ...(query.assignedTo && { assignedTo: query.assignedTo }),
  };

  return Object.keys(filters).length > 0 ? filters : undefined;
};
