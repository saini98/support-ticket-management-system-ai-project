import { Router } from "express";

import { Permission } from "../auth/permissions.js";
import { TicketController } from "../controllers/ticket.controller.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { requireAssignedTicketAccess } from "../middlewares/require-assigned-ticket.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import commentRoutes from "./comment.routes.js";
import { TicketRepository } from "../repositories/ticket.repository.js";
import { TicketService } from "../services/ticket.service.js";
import {
  createTicketSchema,
  ticketIdParamsSchema,
  ticketSearchQuerySchema,
  updateTicketSchema,
} from "../validators/ticket.validator.js";

const ticketRepository = new TicketRepository();
const ticketService = new TicketService(ticketRepository);
const ticketController = new TicketController(ticketService);

const router = Router();

router.get(
  "/",
  authorize(Permission.TICKETS_READ),
  validate({ query: ticketSearchQuerySchema }),
  ticketController.getAll,
);

router.use(
  "/:ticketId/comments",
  authorize(Permission.COMMENTS_READ),
  commentRoutes,
);

router.get(
  "/:id/status-transitions",
  authorize(Permission.TICKETS_READ),
  validate({ params: ticketIdParamsSchema }),
  ticketController.getStatusTransitions,
);

router.get(
  "/:id",
  authorize(Permission.TICKETS_READ),
  validate({ params: ticketIdParamsSchema }),
  ticketController.getById,
);

router.post(
  "/",
  authorize(Permission.TICKETS_CREATE),
  validateBody(createTicketSchema),
  ticketController.create,
);

router.put(
  "/:id",
  validate({ params: ticketIdParamsSchema }),
  validateBody(updateTicketSchema),
  authorize(Permission.TICKETS_UPDATE, Permission.TICKETS_UPDATE_ASSIGNED),
  requireAssignedTicketAccess(
    Permission.TICKETS_UPDATE_ASSIGNED,
    Permission.TICKETS_UPDATE,
  ),
  ticketController.update,
);

router.delete(
  "/:id",
  authorize(Permission.TICKETS_DELETE),
  validate({ params: ticketIdParamsSchema }),
  ticketController.remove,
);

export default router;
