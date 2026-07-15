import type { NextFunction, Request, Response } from "express";

import type { CommentService } from "../services/comment.service.js";
import type { CreateCommentDto } from "../types/comment.types.js";

export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  getByTicketId = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { ticketId } = req.params as { ticketId: string };
      const comments = await this.commentService.getCommentsByTicketId(ticketId);
      res.status(200).json(comments);
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
      const { ticketId } = req.params as { ticketId: string };
      const comment = await this.commentService.createComment(
        ticketId,
        req.body as CreateCommentDto,
      );
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  };
}
