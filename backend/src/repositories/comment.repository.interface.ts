import type {
  CommentWithAuthor,
  CreateCommentDto,
} from "../types/comment.types.js";

export interface ICommentRepository {
  findByTicketId(ticketId: string): Promise<CommentWithAuthor[]>;
  create(ticketId: string, data: CreateCommentDto): Promise<CommentWithAuthor>;
  userExists(id: string): Promise<boolean>;
}
