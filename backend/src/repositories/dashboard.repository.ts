import { prisma } from "../infrastructure/database/prisma.js";
import type {
  IDashboardRepository,
  TicketStatusCount,
} from "./dashboard.repository.interface.js";

export class DashboardRepository implements IDashboardRepository {
  async countTickets(): Promise<number> {
    return prisma.ticket.count();
  }

  async countTicketsByStatus(): Promise<TicketStatusCount[]> {
    const groupedCounts = await prisma.ticket.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });

    return groupedCounts.map((entry) => ({
      status: entry.status,
      count: entry._count.status,
    }));
  }
}
