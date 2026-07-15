import type { TicketPriority, TicketStatus } from "../../types/ticket.types";

export interface RecentTicketRow {
  id: string;
  title: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo: string;
  createdAt: string;
}

export const DUMMY_RECENT_TICKETS: RecentTicketRow[] = [
  {
    id: "ticket-1001",
    title: "Login page not loading",
    priority: "URGENT",
    status: "OPEN",
    assignedTo: "Carol Support",
    createdAt: "2026-07-14T09:15:00.000Z",
  },
  {
    id: "ticket-1002",
    title: "Export report fails with timeout",
    priority: "HIGH",
    status: "IN_PROGRESS",
    assignedTo: "Bob Developer",
    createdAt: "2026-07-14T08:40:00.000Z",
  },
  {
    id: "ticket-1003",
    title: "Update billing address form validation",
    priority: "MEDIUM",
    status: "RESOLVED",
    assignedTo: "Eve QA",
    createdAt: "2026-07-13T16:20:00.000Z",
  },
  {
    id: "ticket-1004",
    title: "Dark mode contrast on dashboard widgets",
    priority: "LOW",
    status: "CLOSED",
    assignedTo: "Alice Admin",
    createdAt: "2026-07-13T11:05:00.000Z",
  },
  {
    id: "ticket-1005",
    title: "Duplicate notifications on mobile app",
    priority: "HIGH",
    status: "CANCELLED",
    assignedTo: "David Manager",
    createdAt: "2026-07-12T14:30:00.000Z",
  },
  {
    id: "ticket-1006",
    title: "Should not appear in recent list",
    priority: "LOW",
    status: "OPEN",
    assignedTo: "Carol Support",
    createdAt: "2026-07-12T10:00:00.000Z",
  },
];
