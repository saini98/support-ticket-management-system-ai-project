import type {
  CommentResponse,
  CommentWithAuthor,
  CreateCommentDto,
} from "../types/comment.types.js";
import { BadRequestError, NotFoundError } from "../utils/errors.js";
import type { ICommentRepository } from "../repositories/comment.repository.interface.js";
import type { ITicketRepository } from "../repositories/ticket.repository.interface.js";

export class CommentService {
  constructor(
    private readonly commentRepository: ICommentRepository,
    private readonly ticketRepository: ITicketRepository,
  ) {}

  async getCommentsByTicketId(ticketId: string): Promise<CommentResponse[]> {
    await this.ensureTicketExists(ticketId);

    const comments = await this.commentRepository.findByTicketId(ticketId);
    return comments.map(toCommentResponse);
  }

  async createComment(
    ticketId: string,
    data: CreateCommentDto,
  ): Promise<CommentResponse> {
    await this.ensureTicketExists(ticketId);
    await this.ensureUserExists(data.authorId, "Author not found");

    const comment = await this.commentRepository.create(ticketId, data);
    return toCommentResponse(comment);
  }

  private async ensureTicketExists(ticketId: string): Promise<void> {
    const ticket = await this.ticketRepository.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError("Ticket not found");
    }
  }

  private async ensureUserExists(userId: string, message: string): Promise<void> {
    const exists = await this.commentRepository.userExists(userId);

    if (!exists) {
      throw new BadRequestError(message);
    }
  }
}

const toCommentResponse = (comment: CommentWithAuthor): CommentResponse => ({
  id: comment.id,
  message: comment.content,
  ticketId: comment.ticketId,
  authorId: comment.authorId,
  author: comment.author,
  createdAt: comment.createdAt,
  updatedAt: comment.updatedAt,
});
