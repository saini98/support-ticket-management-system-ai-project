import type { Application } from "express";
import request from "supertest";

import type { TicketPriority } from "../../src/infrastructure/prisma/generated/enums.js";
import { authHeader } from "./auth.js";

let cachedApp: Application | undefined;

export const getTestApp = async (): Promise<Application> => {
  if (!cachedApp) {
    const module = await import("../../src/app.js");
    cachedApp = module.default;
  }

  return cachedApp;
};

interface CreateTestTicketOptions {
  title?: string;
  description?: string;
  priority?: TicketPriority;
  assigneeId?: string;
}

export const createTestTicket = async (
  app: Application,
  token: string,
  creatorId: string,
  assigneeId: string,
  options: CreateTestTicketOptions = {},
) => {
  const response = await request(app)
    .post("/tickets")
    .set(authHeader(token))
    .send({
      title: options.title ?? "Status transition test ticket",
      description: options.description ?? "Ticket used for integration testing",
      priority: options.priority ?? "MEDIUM",
      creatorId,
      assigneeId: options.assigneeId ?? assigneeId,
    });

  return response;
};

export const updateTicketStatus = async (
  app: Application,
  token: string,
  ticketId: string,
  status: string,
) =>
  request(app)
    .put(`/tickets/${ticketId}`)
    .set(authHeader(token))
    .send({
      status,
    });
