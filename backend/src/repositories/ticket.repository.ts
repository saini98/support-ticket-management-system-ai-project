import { Prisma } from "../infrastructure/prisma/generated/client.js";
import { prisma } from "../infrastructure/database/prisma.js";
import { generateTicketId } from "../utils/generate-ticket-id.js";
import { buildTicketWhere } from "../utils/build-ticket-where.js";
import type {
  CreateTicketDto,
  TicketPaginationOptions,
  TicketSearchFilters,
  TicketWithRelations,
  UpdateTicketDto,
} from "../types/ticket.types.js";
import type { ITicketRepository } from "./ticket.repository.interface.js";

const ticketInclude = {
  creator: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  },
  assignee: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  },
} satisfies Prisma.TicketInclude;

const buildTicketOrderBy = (
  pagination: TicketPaginationOptions,
): Prisma.TicketOrderByWithRelationInput => ({
  [pagination.sortBy]: pagination.sortOrder,
});

export class TicketRepository implements ITicketRepository {
  async findAll(filters?: TicketSearchFilters): Promise<TicketWithRelations[]> {
    return prisma.ticket.findMany({
      where: buildTicketWhere(filters),
      include: ticketInclude,
      orderBy: { createdAt: "desc" },
    });
  }

  async findPaginated(
    filters: TicketSearchFilters | undefined,
    pagination: TicketPaginationOptions,
  ): Promise<{ tickets: TicketWithRelations[]; total: number }> {
    const where = buildTicketWhere(filters);
    const skip = (pagination.page - 1) * pagination.limit;

    const [tickets, total] = await Promise.all([
      prisma.ticket.findMany({
        where,
        include: ticketInclude,
        orderBy: buildTicketOrderBy(pagination),
        skip,
        take: pagination.limit,
      }),
      prisma.ticket.count({ where }),
    ]);

    return { tickets, total };
  }

  async findById(id: string): Promise<TicketWithRelations | null> {
    return prisma.ticket.findUnique({
      where: { id },
      include: ticketInclude,
    });
  }

  async create(data: CreateTicketDto): Promise<TicketWithRelations> {
    const id = await generateTicketId();

    return prisma.ticket.create({
      data: {
        id,
        title: data.title,
        description: data.description,
        creatorId: data.creatorId,
        status: data.status,
        priority: data.priority,
        assigneeId: data.assigneeId,
      },
      include: ticketInclude,
    });
  }

  async update(id: string, data: UpdateTicketDto): Promise<TicketWithRelations> {
    return prisma.ticket.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.priority !== undefined && { priority: data.priority }),
        ...(data.assigneeId !== undefined && { assigneeId: data.assigneeId }),
      },
      include: ticketInclude,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.ticket.delete({
      where: { id },
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
