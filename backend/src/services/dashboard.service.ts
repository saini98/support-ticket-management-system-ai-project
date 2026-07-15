import type { TicketStatus } from "../infrastructure/prisma/generated/enums.js";
import type { IDashboardRepository } from "../repositories/dashboard.repository.interface.js";
import type { DashboardStats } from "../types/dashboard.types.js";

export class DashboardService {
  constructor(private readonly dashboardRepository: IDashboardRepository) {}

  async getStats(): Promise<DashboardStats> {
    const [totalTickets, statusCounts] = await Promise.all([
      this.dashboardRepository.countTickets(),
      this.dashboardRepository.countTicketsByStatus(),
    ]);

    const countByStatus = statusCounts.reduce<Record<TicketStatus, number>>(
      (counts, entry) => {
        counts[entry.status] = entry.count;
        return counts;
      },
      {
        OPEN: 0,
        IN_PROGRESS: 0,
        RESOLVED: 0,
        CLOSED: 0,
        CANCELLED: 0,
      },
    );

    return {
      totalTickets,
      openTickets: countByStatus.OPEN,
      inProgressTickets: countByStatus.IN_PROGRESS,
      resolvedTickets: countByStatus.RESOLVED,
      closedTickets: countByStatus.CLOSED,
      cancelledTickets: countByStatus.CANCELLED,
    };
  }
}
