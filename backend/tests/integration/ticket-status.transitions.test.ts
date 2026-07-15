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

describe("Ticket status transitions", () => {
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

  it("allows Open → In Progress", async () => {
    const createResponse = await createTestTicket(
      app,
      authToken,
      creatorId,
      assigneeId,
    );

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.status).toBe("OPEN");

    const response = await updateTicketStatus(
      app,
      authToken,
      createResponse.body.id,
      "IN_PROGRESS",
    );

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("IN_PROGRESS");
  });

  it("allows In Progress → Resolved", async () => {
    const createResponse = await createTestTicket(
      app,
      authToken,
      creatorId,
      assigneeId,
    );
    const ticketId = createResponse.body.id;

    await updateTicketStatus(app, authToken, ticketId, "IN_PROGRESS");

    const response = await updateTicketStatus(app, authToken, ticketId, "RESOLVED");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("RESOLVED");
  });

  it("allows Resolved → Closed", async () => {
    const createResponse = await createTestTicket(
      app,
      authToken,
      creatorId,
      assigneeId,
    );
    const ticketId = createResponse.body.id;

    await updateTicketStatus(app, authToken, ticketId, "IN_PROGRESS");
    await updateTicketStatus(app, authToken, ticketId, "RESOLVED");

    const response = await updateTicketStatus(app, authToken, ticketId, "CLOSED");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("CLOSED");
  });

  it("rejects Open → Closed", async () => {
    const createResponse = await createTestTicket(
      app,
      authToken,
      creatorId,
      assigneeId,
    );

    expect(createResponse.body.status).toBe("OPEN");

    const response = await updateTicketStatus(
      app,
      authToken,
      createResponse.body.id,
      "CLOSED",
    );

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      statusCode: 400,
      message:
        "Invalid status transition from Open to Closed. Allowed transitions: In Progress, Cancelled",
    });
  });

  it("rejects Resolved → Open", async () => {
    const createResponse = await createTestTicket(
      app,
      authToken,
      creatorId,
      assigneeId,
    );
    const ticketId = createResponse.body.id;

    await updateTicketStatus(app, authToken, ticketId, "IN_PROGRESS");
    await updateTicketStatus(app, authToken, ticketId, "RESOLVED");

    const response = await updateTicketStatus(app, authToken, ticketId, "OPEN");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      statusCode: 400,
      message:
        "Invalid status transition from Resolved to Open. Allowed transitions: Closed",
    });
  });

  it("returns allowed transitions from backend for an OPEN ticket", async () => {
    const createResponse = await createTestTicket(
      app,
      authToken,
      creatorId,
      assigneeId,
    );

    const response = await request(app)
      .get(`/tickets/${createResponse.body.id}/status-transitions`)
      .set(authHeader(authToken));

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      currentStatus: "OPEN",
      allowedTransitions: ["IN_PROGRESS", "CANCELLED"],
      isTerminal: false,
    });
  });

  it("returns terminal state transitions for a CLOSED ticket", async () => {
    const createResponse = await createTestTicket(
      app,
      authToken,
      creatorId,
      assigneeId,
    );
    const ticketId = createResponse.body.id;

    await updateTicketStatus(app, authToken, ticketId, "IN_PROGRESS");
    await updateTicketStatus(app, authToken, ticketId, "RESOLVED");
    await updateTicketStatus(app, authToken, ticketId, "CLOSED");

    const response = await request(app)
      .get(`/tickets/${ticketId}/status-transitions`)
      .set(authHeader(authToken));

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      currentStatus: "CLOSED",
      allowedTransitions: [],
      isTerminal: true,
    });
  });
});
