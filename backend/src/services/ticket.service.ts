import {
  assertInitialTicketStatus,
  assertValidTicketStatusTransition,
  ticketStatusMachine,
} from "../domain/ticket-status.machine.js";
import { BadRequestError, NotFoundError } from "../utils/errors.js";
import type {
  CreateTicketDto,
  PaginatedTicketsResponse,
  TicketPaginationOptions,
  TicketSearchFilters,
  TicketStatusTransitionsResponse,
  TicketWithRelations,
  UpdateTicketDto,
} from "../types/ticket.types.js";
import type { ITicketRepository } from "../repositories/ticket.repository.interface.js";
import type { TicketSearchQuery } from "../validators/ticket.validator.js";
import { buildTicketSearchFilters } from "../utils/ticket-search-filters.js";

export class TicketService {
  constructor(private readonly ticketRepository: ITicketRepository) {}

  async getAllTickets(filters?: TicketSearchFilters): Promise<TicketWithRelations[]> {
    return this.ticketRepository.findAll(filters);
  }

  async getPaginatedTickets(
    query: TicketSearchQuery,
  ): Promise<PaginatedTicketsResponse> {
    const pagination = this.resolvePaginationOptions(query);
    const filters = buildTicketSearchFilters(query);

    const { tickets, total } = await this.ticketRepository.findPaginated(
      filters,
      pagination,
    );

    return {
      data: tickets,
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages: total === 0 ? 0 : Math.ceil(total / pagination.limit),
    };
  }

  private resolvePaginationOptions(
    query: TicketSearchQuery,
  ): TicketPaginationOptions {
    return {
      page: query.page ?? 1,
      limit: query.limit ?? 10,
      sortBy: query.sortBy ?? "createdAt",
      sortOrder: query.sortOrder ?? "desc",
    };
  }

  async getTicketById(id: string): Promise<TicketWithRelations> {
    const ticket = await this.ticketRepository.findById(id);

    if (!ticket) {
      throw new NotFoundError("Ticket not found");
    }

    return ticket;
  }

  async getTicketStatusTransitions(
    id: string,
  ): Promise<TicketStatusTransitionsResponse> {
    const ticket = await this.getTicketById(id);
    const allowedTransitions = ticketStatusMachine.getAllowedTransitions(
      ticket.status,
    );

    return {
      currentStatus: ticket.status,
      allowedTransitions: [...allowedTransitions],
      isTerminal: ticketStatusMachine.isTerminal(ticket.status),
    };
  }

  async createTicket(data: CreateTicketDto): Promise<TicketWithRelations> {
    await this.ensureUserExists(data.creatorId, "Creator not found");
    await this.ensureUserExists(data.assigneeId, "Assigned user not found");

    if (data.status) {
      assertInitialTicketStatus(data.status);
    }

    return this.ticketRepository.create(data);
  }

  async updateTicket(
    id: string,
    data: UpdateTicketDto,
  ): Promise<TicketWithRelations> {
    const ticket = await this.getTicketById(id);

    if (data.assigneeId) {
      await this.ensureUserExists(data.assigneeId, "Assignee not found");
    }

    if (data.status !== undefined) {
      assertValidTicketStatusTransition(ticket.status, data.status);
    }

    return this.ticketRepository.update(id, data);
  }

  async deleteTicket(id: string): Promise<void> {
    await this.getTicketById(id);
    await this.ticketRepository.delete(id);
  }

  private async ensureUserExists(userId: string, message: string): Promise<void> {
    const exists = await this.ticketRepository.userExists(userId);

    if (!exists) {
      throw new BadRequestError(message);
    }
  }
}
