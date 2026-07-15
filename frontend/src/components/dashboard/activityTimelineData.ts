export type ActivityType =
  | "TICKET_CREATED"
  | "TICKET_ASSIGNED"
  | "COMMENT_ADDED"
  | "STATUS_UPDATED";

export interface ActivityTimelineItem {
  id: string;
  type: ActivityType;
  description: string;
  time: string;
}

export const DUMMY_ACTIVITY_TIMELINE: ActivityTimelineItem[] = [
  {
    id: "activity-1",
    type: "STATUS_UPDATED",
    description:
      'Ticket ticket-1002 status changed from Open to In Progress',
    time: "2026-07-15T09:45:00.000Z",
  },
  {
    id: "activity-2",
    type: "COMMENT_ADDED",
    description:
      "Carol Support added a comment on ticket ticket-1001",
    time: "2026-07-15T09:20:00.000Z",
  },
  {
    id: "activity-3",
    type: "TICKET_ASSIGNED",
    description:
      "Ticket ticket-1002 assigned to Bob Developer",
    time: "2026-07-15T08:55:00.000Z",
  },
  {
    id: "activity-4",
    type: "TICKET_CREATED",
    description:
      'Ticket ticket-1002 "Export report fails with timeout" was created by Alice Admin',
    time: "2026-07-15T08:40:00.000Z",
  },
  {
    id: "activity-5",
    type: "STATUS_UPDATED",
    description:
      "Ticket ticket-1003 status changed from In Progress to Resolved",
    time: "2026-07-14T17:10:00.000Z",
  },
  {
    id: "activity-6",
    type: "COMMENT_ADDED",
    description:
      "Eve QA added a comment on ticket ticket-1003",
    time: "2026-07-14T16:35:00.000Z",
  },
  {
    id: "activity-7",
    type: "TICKET_ASSIGNED",
    description:
      "Ticket ticket-1003 assigned to Eve QA",
    time: "2026-07-14T15:00:00.000Z",
  },
  {
    id: "activity-8",
    type: "TICKET_CREATED",
    description:
      'Ticket ticket-1001 "Login page not loading" was created by Carol Support',
    time: "2026-07-14T09:15:00.000Z",
  },
];
