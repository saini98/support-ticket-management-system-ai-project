import type { Application } from "express";
import request from "supertest";

import { authHeader, loginAsUser } from "../helpers/auth.js";
import {
  disconnectTestDatabase,
  getTestUserIds,
  initializeTestDatabase,
  TEST_USER_CREDENTIALS,
} from "../helpers/database.js";
import {
  createTestTicket,
  getTestApp,
  updateTicketStatus,
} from "../helpers/app.js";

describe("GET /api/dashboard/stats", () => {
  let app: Application;
  let authToken: string;
  let creatorId: string;
  let assigneeId: string;

  beforeAll(async () => {
    await initializeTestDatabase();
    app = await getTestApp();
    authToken = await loginAsUser(
      app,
      TEST_USER_CREDENTIALS.email,
      TEST_USER_CREDENTIALS.password,
    );

    const userIds = await getTestUserIds();
    creatorId = userIds.creatorId;
    assigneeId = userIds.assigneeId;
  });

  afterAll(async () => {
    await disconnectTestDatabase();
  });

  it("returns zero counts when no tickets exist", async () => {
    const response = await request(app)
      .get("/api/dashboard/stats")
      .set(authHeader(authToken));

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      totalTickets: 0,
      openTickets: 0,
      inProgressTickets: 0,
      resolvedTickets: 0,
      closedTickets: 0,
      cancelledTickets: 0,
    });
  });

  it("returns ticket counts dynamically from the database", async () => {
    await createTestTicket(app, authToken, creatorId, assigneeId);

    const inProgressTicket = await createTestTicket(
      app,
      authToken,
      creatorId,
      assigneeId,
    );
    await updateTicketStatus(
      app,
      authToken,
      inProgressTicket.body.id,
      "IN_PROGRESS",
    );

    const resolvedTicket = await createTestTicket(
      app,
      authToken,
      creatorId,
      assigneeId,
    );
    await updateTicketStatus(app, authToken, resolvedTicket.body.id, "IN_PROGRESS");
    await updateTicketStatus(app, authToken, resolvedTicket.body.id, "RESOLVED");

    const closedTicket = await createTestTicket(
      app,
      authToken,
      creatorId,
      assigneeId,
    );
    await updateTicketStatus(app, authToken, closedTicket.body.id, "IN_PROGRESS");
    await updateTicketStatus(app, authToken, closedTicket.body.id, "RESOLVED");
    await updateTicketStatus(app, authToken, closedTicket.body.id, "CLOSED");

    const cancelledTicket = await createTestTicket(
      app,
      authToken,
      creatorId,
      assigneeId,
    );
    await updateTicketStatus(
      app,
      authToken,
      cancelledTicket.body.id,
      "CANCELLED",
    );

    const response = await request(app)
      .get("/api/dashboard/stats")
      .set(authHeader(authToken));

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      totalTickets: 5,
      openTickets: 1,
      inProgressTickets: 1,
      resolvedTickets: 1,
      closedTickets: 1,
      cancelledTickets: 1,
    });
  });
});
