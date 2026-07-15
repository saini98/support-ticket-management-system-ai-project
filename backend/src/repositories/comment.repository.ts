import { Prisma } from "../infrastructure/prisma/generated/client.js";
import { prisma } from "../infrastructure/database/prisma.js";
import type {
  CommentWithAuthor,
  CreateCommentDto,
} from "../types/comment.types.js";
import type { ICommentRepository } from "./comment.repository.interface.js";

const commentInclude = {
  author: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  },
} satisfies Prisma.CommentInclude;

export class CommentRepository implements ICommentRepository {
  async findByTicketId(ticketId: string): Promise<CommentWithAuthor[]> {
    return prisma.comment.findMany({
      where: { ticketId },
      include: commentInclude,
      orderBy: { createdAt: "asc" },
    });
  }

  async create(
    ticketId: string,
    data: CreateCommentDto,
  ): Promise<CommentWithAuthor> {
    return prisma.comment.create({
      data: {
        content: data.message,
        ticketId,
        authorId: data.authorId,
      },
      include: commentInclude,
    });
  }

  async userExists(id: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    return user !== null;
  }
}
