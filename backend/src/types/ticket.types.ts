import type {
  TicketPriority,
  TicketStatus,
} from "../infrastructure/prisma/generated/enums.js";
import type { Ticket } from "../infrastructure/prisma/generated/client.js";

export interface CreateTicketDto {
  title: string;
  description: string;
  creatorId: string;
  priority: TicketPriority;
  assigneeId: string;
  status?: TicketStatus;
}

export interface UpdateTicketDto {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  assigneeId?: string | null;
}

export type TicketWithRelations = Ticket;

export interface TicketSearchFilters {
  search?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  assignedTo?: string;
}

export type TicketSortField =
  | "createdAt"
  | "updatedAt"
  | "title"
  | "priority"
  | "status";

export type TicketSortOrder = "asc" | "desc";

export interface TicketPaginationOptions {
  page: number;
  limit: number;
  sortBy: TicketSortField;
  sortOrder: TicketSortOrder;
}

export interface TicketListQuery extends TicketSearchFilters {
  page?: number;
  limit?: number;
  sortBy?: TicketSortField;
  sortOrder?: TicketSortOrder;
}

export interface PaginatedTicketsResponse {
  data: TicketWithRelations[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TicketStatusTransitionsResponse {
  currentStatus: TicketStatus;
  allowedTransitions: TicketStatus[];
  isTerminal: boolean;
}
