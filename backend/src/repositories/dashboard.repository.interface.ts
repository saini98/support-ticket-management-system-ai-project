import type { TicketStatus } from "../infrastructure/prisma/generated/enums.js";

export interface TicketStatusCount {
  status: TicketStatus;
  count: number;
}

export interface IDashboardRepository {
  countTickets(): Promise<number>;
  countTicketsByStatus(): Promise<TicketStatusCount[]>;
}
