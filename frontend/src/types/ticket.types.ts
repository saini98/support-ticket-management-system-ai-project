export type TicketStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED"
  | "CANCELLED";

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type UserRole = "ADMIN" | "DEVELOPER" | "SUPPORT" | "MANAGER" | "QA";

export interface UserSummary {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  creatorId: string;
  assigneeId: string | null;
  creator: UserSummary;
  assignee: UserSummary | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketPayload {
  title: string;
  description: string;
  priority: TicketPriority;
  assigneeId: string;
  creatorId: string;
  status?: TicketStatus;
}

export interface UpdateTicketPayload {
  title?: string;
  description?: string;
  priority?: TicketPriority;
  assigneeId?: string | null;
  status?: TicketStatus;
}

export interface TicketFilters {
  search?: string;
  status?: TicketStatus | string;
}

export interface TicketStatusTransitions {
  currentStatus: TicketStatus;
  allowedTransitions: TicketStatus[];
  isTerminal: boolean;
}
