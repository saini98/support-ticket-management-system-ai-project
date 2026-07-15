import type { Comment } from "../infrastructure/prisma/generated/client.js";

export interface CreateCommentDto {
  message: string;
  authorId: string;
}

export type CommentWithAuthor = Comment & {
  author: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

export interface CommentResponse {
  id: string;
  message: string;
  ticketId: string;
  authorId: string;
  author: CommentWithAuthor["author"];
  createdAt: Date;
  updatedAt: Date;
}
