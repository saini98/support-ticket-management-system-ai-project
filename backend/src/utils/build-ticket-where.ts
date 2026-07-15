import type { Prisma } from "../infrastructure/prisma/generated/client.js";
import type { TicketSearchFilters } from "../types/ticket.types.js";

export const buildTicketWhere = (
  filters?: TicketSearchFilters,
): Prisma.TicketWhereInput | undefined => {
  if (!filters) {
    return undefined;
  }

  const conditions: Prisma.TicketWhereInput[] = [];

  if (filters.search) {
    conditions.push({
      OR: [
        { id: { contains: filters.search } },
        { title: { contains: filters.search } },
        { description: { contains: filters.search } },
      ],
    });
  }

  if (filters.status) {
    conditions.push({ status: filters.status });
  }

  if (filters.priority) {
    conditions.push({ priority: filters.priority });
  }

  if (filters.assignedTo) {
    conditions.push({ assigneeId: filters.assignedTo });
  }

  if (conditions.length === 0) {
    return undefined;
  }

  if (conditions.length === 1) {
    return conditions[0];
  }

  return { AND: conditions };
};
