import type { TicketStatus } from "../infrastructure/prisma/generated/enums.js";

const TICKET_STATUS_VALUES = [
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
  "CANCELLED",
] as const satisfies readonly TicketStatus[];

const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
  CANCELLED: "Cancelled",
};

const TICKET_STATUS_QUERY_ALIASES: Record<string, TicketStatus> = {
  open: "OPEN",
  in_progress: "IN_PROGRESS",
  inprogress: "IN_PROGRESS",
  "in progress": "IN_PROGRESS",
  resolved: "RESOLVED",
  closed: "CLOSED",
  cancelled: "CANCELLED",
  canceled: "CANCELLED",
};

export const TICKET_STATUS_FILTER_OPTIONS = TICKET_STATUS_VALUES.map(
  (status) => TICKET_STATUS_LABELS[status],
).join(", ");

export const parseTicketStatusQuery = (value: string): TicketStatus | null => {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const enumCandidate = trimmed.toUpperCase().replace(/\s+/g, "_");

  if (TICKET_STATUS_VALUES.includes(enumCandidate as TicketStatus)) {
    return enumCandidate as TicketStatus;
  }

  const normalizedLabel = trimmed.toLowerCase();

  for (const status of TICKET_STATUS_VALUES) {
    if (TICKET_STATUS_LABELS[status].toLowerCase() === normalizedLabel) {
      return status;
    }
  }

  const normalizedAlias = normalizedLabel.replace(/\s+/g, " ");

  return TICKET_STATUS_QUERY_ALIASES[normalizedAlias] ?? null;
};
