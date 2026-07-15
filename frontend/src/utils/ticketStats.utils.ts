import type { Ticket, TicketStatus } from "../types/ticket.types";

export interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
}

const countByStatus = (
  tickets: Ticket[],
  status: TicketStatus,
): number => tickets.filter((ticket) => ticket.status === status).length;

export const computeTicketStats = (tickets: Ticket[]): TicketStats => ({
  total: tickets.length,
  open: countByStatus(tickets, "OPEN"),
  inProgress: countByStatus(tickets, "IN_PROGRESS"),
  resolved: countByStatus(tickets, "RESOLVED"),
  closed: countByStatus(tickets, "CLOSED"),
});
