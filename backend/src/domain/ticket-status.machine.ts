import type { TicketStatus } from "../infrastructure/prisma/generated/enums.js";
import { BadRequestError } from "../utils/errors.js";
import { StateMachine } from "../utils/state-machine.js";

const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
  CANCELLED: "Cancelled",
};

const TICKET_STATUS_TRANSITIONS = {
  OPEN: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["RESOLVED", "CANCELLED"],
  RESOLVED: ["CLOSED"],
  CLOSED: [],
  CANCELLED: [],
} as const satisfies Record<TicketStatus, readonly TicketStatus[]>;

export const ticketStatusMachine = new StateMachine<TicketStatus>(
  TICKET_STATUS_TRANSITIONS,
);

export const formatTicketStatus = (status: TicketStatus): string =>
  TICKET_STATUS_LABELS[status];

export const assertValidTicketStatusTransition = (
  currentStatus: TicketStatus,
  nextStatus: TicketStatus,
): void => {
  if (currentStatus === nextStatus) {
    return;
  }

  if (ticketStatusMachine.canTransition(currentStatus, nextStatus)) {
    return;
  }

  const allowedTransitions = ticketStatusMachine.getAllowedTransitions(currentStatus);
  const allowedMessage =
    allowedTransitions.length > 0
      ? allowedTransitions.map(formatTicketStatus).join(", ")
      : "none (terminal state)";

  throw new BadRequestError(
    `Invalid status transition from ${formatTicketStatus(currentStatus)} to ${formatTicketStatus(nextStatus)}. Allowed transitions: ${allowedMessage}`,
  );
};

export const assertInitialTicketStatus = (status: TicketStatus): void => {
  if (status === "OPEN") {
    return;
  }

  throw new BadRequestError(
    `New tickets must be created with ${formatTicketStatus("OPEN")} status`,
  );
};
