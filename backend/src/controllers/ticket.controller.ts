import type { NextFunction, Request, Response } from "express";

import type { TicketService } from "../services/ticket.service.js";
import type {
  CreateTicketDto,
  TicketStatusTransitionsResponse,
  UpdateTicketDto,
} from "../types/ticket.types.js";
import type { TicketSearchQuery } from "../validators/ticket.validator.js";
import { buildTicketSearchFilters } from "../utils/ticket-search-filters.js";
import { getValidatedQuery } from "../utils/request.js";

const isPaginatedTicketQuery = (query: TicketSearchQuery): boolean =>
  query.page !== undefined ||
  query.limit !== undefined ||
  query.sortBy !== undefined ||
  query.sortOrder !== undefined;

export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const query = getValidatedQuery<TicketSearchQuery>(req);

      if (isPaginatedTicketQuery(query)) {
        const result = await this.ticketService.getPaginatedTickets(query);
        res.status(200).json(result);
        return;
      }

      const filters = buildTicketSearchFilters(query);

      const tickets = await this.ticketService.getAllTickets(filters);
      res.status(200).json(tickets);
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params as { id: string };
      const ticket = await this.ticketService.getTicketById(id);
      res.status(200).json(ticket);
    } catch (error) {
      next(error);
    }
  };

  getStatusTransitions = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params as { id: string };
      const transitions =
        await this.ticketService.getTicketStatusTransitions(id);
      res.status(200).json(transitions);
    } catch (error) {
      next(error);
    }
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const ticket = await this.ticketService.createTicket(
        req.body as CreateTicketDto,
      );
      res.status(201).json(ticket);
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params as { id: string };
      const ticket = await this.ticketService.updateTicket(
        id,
        req.body as UpdateTicketDto,
      );
      res.status(200).json(ticket);
    } catch (error) {
      next(error);
    }
  };

  remove = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params as { id: string };
      await this.ticketService.deleteTicket(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
