import type { TicketPriority, TicketStatus } from "../types/ticket.types";

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
  CANCELLED: "Cancelled",
};

export const TICKET_PRIORITY_LABELS: Record<TicketPriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

export const TICKET_PRIORITY_OPTIONS = Object.entries(
  TICKET_PRIORITY_LABELS,
).map(([value, label]) => ({
  value: value as TicketPriority,
  label,
}));

export const TICKET_STATUS_FILTER_OPTIONS = Object.entries(
  TICKET_STATUS_LABELS,
).map(([value, label]) => ({
  value: value as TicketStatus,
  label,
}));

export const formatTicketDate = (value: string): string =>
  new Date(value).toLocaleString();

export const formatTicketNumber = (ticketId: string): string => {
  if (ticketId.startsWith("ticket-")) {
    return ticketId.slice("ticket-".length);
  }

  return ticketId;
};
