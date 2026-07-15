import type {
  CreateTicketDto,
  TicketPaginationOptions,
  TicketSearchFilters,
  TicketWithRelations,
  UpdateTicketDto,
} from "../types/ticket.types.js";

export interface PaginatedTicketsResult {
  tickets: TicketWithRelations[];
  total: number;
}

export interface ITicketRepository {
  findAll(filters?: TicketSearchFilters): Promise<TicketWithRelations[]>;
  findPaginated(
    filters: TicketSearchFilters | undefined,
    pagination: TicketPaginationOptions,
  ): Promise<PaginatedTicketsResult>;
  findById(id: string): Promise<TicketWithRelations | null>;
  create(data: CreateTicketDto): Promise<TicketWithRelations>;
  update(id: string, data: UpdateTicketDto): Promise<TicketWithRelations>;
  delete(id: string): Promise<void>;
  userExists(id: string): Promise<boolean>;
}
