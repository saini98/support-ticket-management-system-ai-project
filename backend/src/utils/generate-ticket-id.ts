import { prisma } from "../infrastructure/database/prisma.js";

const TICKET_ID_PREFIX = "ticket-";
const STARTING_TICKET_NUMBER = 1001;

const parseTicketNumber = (id: string): number | null => {
  if (!id.startsWith(TICKET_ID_PREFIX)) {
    return null;
  }

  const value = Number.parseInt(id.slice(TICKET_ID_PREFIX.length), 10);

  return Number.isFinite(value) ? value : null;
};

export const generateTicketId = async (): Promise<string> => {
  const tickets = await prisma.ticket.findMany({
    select: { id: true },
    where: { id: { startsWith: TICKET_ID_PREFIX } },
  });

  const highestNumber = tickets.reduce((max, ticket) => {
    const ticketNumber = parseTicketNumber(ticket.id);

    if (ticketNumber === null) {
      return max;
    }

    return Math.max(max, ticketNumber);
  }, STARTING_TICKET_NUMBER - 1);

  return `${TICKET_ID_PREFIX}${highestNumber + 1}`;
};
