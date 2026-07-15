import { Router } from "express";

import { Permission } from "../auth/permissions.js";
import { CommentController } from "../controllers/comment.controller.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { requireAssignedTicketAccess } from "../middlewares/require-assigned-ticket.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { CommentRepository } from "../repositories/comment.repository.js";
import { TicketRepository } from "../repositories/ticket.repository.js";
import { CommentService } from "../services/comment.service.js";
import {
  createCommentSchema,
  ticketCommentParamsSchema,
} from "../validators/comment.validator.js";

const commentRepository = new CommentRepository();
const ticketRepository = new TicketRepository();
const commentService = new CommentService(commentRepository, ticketRepository);
const commentController = new CommentController(commentService);

const router = Router({ mergeParams: true });

router.get(
  "/",
  validate({ params: ticketCommentParamsSchema }),
  commentController.getByTicketId,
);

router.post(
  "/",
  validate({ params: ticketCommentParamsSchema }),
  validateBody(createCommentSchema),
  authorize(Permission.COMMENTS_CREATE, Permission.COMMENTS_CREATE_ASSIGNED),
  requireAssignedTicketAccess(
    Permission.COMMENTS_CREATE_ASSIGNED,
    Permission.COMMENTS_CREATE,
  ),
  commentController.create,
);

export default router;
