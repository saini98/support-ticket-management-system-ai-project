import type { ActivityTimelineItem } from "../components/dashboard/activityTimelineData";
import type { EngineerCardData } from "../components/dashboard/engineerCardData";
import {
  PRIORITY_CHART_LABELS,
  type PriorityChartDatum,
} from "../components/dashboard/priorityChartData";
import type { RecentTicketRow } from "../components/dashboard/recentTicketsData";
import type { TicketStatusChartDatum } from "../components/dashboard/ticketStatusChartData";
import type { WeeklyTrendChartDatum } from "../components/dashboard/weeklyTrendChartData";
import type { Comment } from "../types/comment.types";
import type { Ticket, TicketPriority, TicketStatus } from "../types/ticket.types";
import { TICKET_STATUS_LABELS, formatTicketNumber } from "./ticket.utils";
import { computeTicketStats, type TicketStats } from "./ticketStats.utils";
import { formatUserRole } from "./user.utils";

const TICKET_STATUSES: TicketStatus[] = [
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
  "CANCELLED",
];

const TICKET_PRIORITIES: TicketPriority[] = [
  "URGENT",
  "HIGH",
  "MEDIUM",
  "LOW",
];

const isSameCalendarDay = (left: Date, right: Date): boolean =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

const buildLastSevenDays = (): Array<{ date: Date; label: string }> => {
  const days: Array<{ date: Date; label: string }> = [];

  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - offset);

    days.push({
      date,
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
    });
  }

  return days;
};

export interface DashboardData {
  stats: TicketStats;
  statusChartData: TicketStatusChartDatum[];
  priorityChartData: PriorityChartDatum[];
  weeklyTrendData: WeeklyTrendChartDatum[];
  recentTickets: RecentTicketRow[];
  engineers: EngineerCardData[];
  activities: ActivityTimelineItem[];
}

export const computeStatusChartData = (
  tickets: Ticket[],
): TicketStatusChartDatum[] =>
  TICKET_STATUSES.map((status) => ({
    status,
    label: TICKET_STATUS_LABELS[status],
    value: tickets.filter((ticket) => ticket.status === status).length,
  }));

export const computePriorityChartData = (
  tickets: Ticket[],
): PriorityChartDatum[] =>
  TICKET_PRIORITIES.map((priority) => ({
    priority,
    label: PRIORITY_CHART_LABELS[priority],
    value: tickets.filter((ticket) => ticket.priority === priority).length,
  }));

export const computeWeeklyTrendData = (
  tickets: Ticket[],
): WeeklyTrendChartDatum[] => {
  const dayBuckets = buildLastSevenDays().map((day) => ({
    ...day,
    tickets: 0,
  }));

  tickets.forEach((ticket) => {
    const createdAt = new Date(ticket.createdAt);
    const bucket = dayBuckets.find((day) =>
      isSameCalendarDay(day.date, createdAt),
    );

    if (bucket) {
      bucket.tickets += 1;
    }
  });

  return dayBuckets.map((bucket) => ({
    day: bucket.label,
    tickets: bucket.tickets,
  }));
};

export const mapRecentTickets = (
  tickets: Ticket[],
  maxRows = 5,
): RecentTicketRow[] =>
  [...tickets]
    .sort(
      (left, right) =>
        new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
    )
    .slice(0, maxRows)
    .map((ticket) => ({
      id: ticket.id,
      title: ticket.title,
      priority: ticket.priority,
      status: ticket.status,
      assignedTo: ticket.assignee?.name ?? "Unassigned",
      createdAt: ticket.createdAt,
    }));

export const computeEngineerStats = (
  tickets: Ticket[],
  maxEngineers = 4,
): EngineerCardData[] => {
  const engineerMap = new Map<
    string,
    EngineerCardData & { resolvedTickets: number }
  >();

  tickets.forEach((ticket) => {
    if (!ticket.assignee) {
      return;
    }

    const existing = engineerMap.get(ticket.assignee.id);

    if (existing) {
      existing.assignedTickets += 1;

      if (ticket.status === "RESOLVED" || ticket.status === "CLOSED") {
        existing.resolvedTickets += 1;
      }

      return;
    }

    engineerMap.set(ticket.assignee.id, {
      id: ticket.assignee.id,
      name: ticket.assignee.name,
      role: formatUserRole(ticket.assignee.role),
      assignedTickets: 1,
      resolvedTickets:
        ticket.status === "RESOLVED" || ticket.status === "CLOSED" ? 1 : 0,
    });
  });

  return Array.from(engineerMap.values())
    .sort((left, right) => right.assignedTickets - left.assignedTickets)
    .slice(0, maxEngineers);
};

const hasMeaningfulUpdate = (ticket: Ticket): boolean => {
  const createdAt = new Date(ticket.createdAt).getTime();
  const updatedAt = new Date(ticket.updatedAt).getTime();

  return updatedAt - createdAt > 60_000;
};

export const buildActivityTimeline = (
  tickets: Ticket[],
  comments: Comment[],
  maxItems = 8,
): ActivityTimelineItem[] => {
  const activities: ActivityTimelineItem[] = [];

  tickets.forEach((ticket) => {
    activities.push({
      id: `created-${ticket.id}`,
      type: "TICKET_CREATED",
      description: `Ticket #${formatTicketNumber(ticket.id)} "${ticket.title}" was created by ${ticket.creator.name}`,
      time: ticket.createdAt,
    });

    if (ticket.assignee) {
      activities.push({
        id: `assigned-${ticket.id}`,
        type: "TICKET_ASSIGNED",
        description: `Ticket #${formatTicketNumber(ticket.id)} "${ticket.title}" assigned to ${ticket.assignee.name}`,
        time: ticket.createdAt,
      });
    }

    if (hasMeaningfulUpdate(ticket)) {
      activities.push({
        id: `status-${ticket.id}`,
        type: "STATUS_UPDATED",
        description: `Ticket #${formatTicketNumber(ticket.id)} "${ticket.title}" status is ${TICKET_STATUS_LABELS[ticket.status]}`,
        time: ticket.updatedAt,
      });
    }
  });

  const ticketTitleById = new Map(
    tickets.map((ticket) => [ticket.id, ticket.title]),
  );

  comments.forEach((comment) => {
    const ticketTitle =
      ticketTitleById.get(comment.ticketId) ?? "Unknown ticket";

    activities.push({
      id: `comment-${comment.id}`,
      type: "COMMENT_ADDED",
      description: `${comment.author.name} added a comment on ticket #${formatTicketNumber(comment.ticketId)} "${ticketTitle}"`,
      time: comment.createdAt,
    });
  });

  return activities
    .sort(
      (left, right) =>
        new Date(right.time).getTime() - new Date(left.time).getTime(),
    )
    .slice(0, maxItems);
};

export const buildDashboardData = (
  tickets: Ticket[],
  comments: Comment[],
): DashboardData => ({
  stats: computeTicketStats(tickets),
  statusChartData: computeStatusChartData(tickets),
  priorityChartData: computePriorityChartData(tickets),
  weeklyTrendData: computeWeeklyTrendData(tickets),
  recentTickets: mapRecentTickets(tickets),
  engineers: computeEngineerStats(tickets),
  activities: buildActivityTimeline(tickets, comments),
});
