import type { TicketPriority } from "../infrastructure/prisma/generated/enums.js";

const TICKET_PRIORITY_VALUES = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
] as const satisfies readonly TicketPriority[];

const TICKET_PRIORITY_LABELS: Record<TicketPriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Critical",
};

const TICKET_PRIORITY_QUERY_ALIASES: Record<string, TicketPriority> = {
  low: "LOW",
  medium: "MEDIUM",
  high: "HIGH",
  critical: "URGENT",
  urgent: "URGENT",
};

export const TICKET_PRIORITY_FILTER_OPTIONS = TICKET_PRIORITY_VALUES.map(
  (priority) => TICKET_PRIORITY_LABELS[priority],
).join(", ");

export const parseTicketPriorityQuery = (
  value: string,
): TicketPriority | null => {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const enumCandidate = trimmed.toUpperCase();

  if (TICKET_PRIORITY_VALUES.includes(enumCandidate as TicketPriority)) {
    return enumCandidate as TicketPriority;
  }

  const normalizedLabel = trimmed.toLowerCase();

  for (const priority of TICKET_PRIORITY_VALUES) {
    if (TICKET_PRIORITY_LABELS[priority].toLowerCase() === normalizedLabel) {
      return priority;
    }
  }

  return TICKET_PRIORITY_QUERY_ALIASES[normalizedLabel] ?? null;
};
