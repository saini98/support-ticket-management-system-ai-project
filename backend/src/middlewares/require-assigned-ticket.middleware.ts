import type { NextFunction, Request, Response } from "express";

import { UserRole } from "../infrastructure/prisma/generated/enums.js";
import {
  type Permission,
  roleHasPermission,
} from "../auth/permissions.js";
import { TicketRepository } from "../repositories/ticket.repository.js";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/errors.js";

const ticketRepository = new TicketRepository();

const getTicketIdFromRequest = (req: Request): string | undefined => {
  const params = req.params as { id?: string; ticketId?: string };
  return params.id ?? params.ticketId;
};

export const requireAssignedTicketAccess = (
  assignedPermission: Permission,
  unrestrictedPermission: Permission,
) => {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.auth) {
        throw new UnauthorizedError(
          "Authentication required",
          "AUTHENTICATION_REQUIRED",
        );
      }

      if (req.auth.role === UserRole.ADMIN) {
        next();
        return;
      }

      if (roleHasPermission(req.auth.role, unrestrictedPermission)) {
        next();
        return;
      }

      if (!roleHasPermission(req.auth.role, assignedPermission)) {
        throw new ForbiddenError(
          "You do not have permission to perform this action",
          "FORBIDDEN",
        );
      }

      const ticketId = getTicketIdFromRequest(req);

      if (!ticketId) {
        throw new NotFoundError("Ticket not found");
      }

      const ticket = await ticketRepository.findById(ticketId);

      if (!ticket) {
        throw new NotFoundError("Ticket not found");
      }

      if (ticket.assigneeId !== req.auth.userId) {
        throw new ForbiddenError(
          "You can only perform this action on tickets assigned to you",
          "FORBIDDEN_ASSIGNED_TICKET_ONLY",
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
