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

describe("GET /tickets priority filter", () => {
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

    await createTestTicket(app, authToken, creatorId, assigneeId, {
      title: "Low priority login issue",
      priority: "LOW",
    });
    await createTestTicket(app, authToken, creatorId, assigneeId, {
      title: "High priority outage",
      priority: "HIGH",
    });
    await createTestTicket(app, authToken, creatorId, assigneeId, {
      title: "Critical security alert",
      priority: "URGENT",
    });
  }, 30_000);

  afterAll(async () => {
    await disconnectTestDatabase();
  });

  it("filters tickets by priority label", async () => {
    const response = await request(app)
      .get("/tickets")
      .set(authHeader(authToken))
      .query({
        priority: "High",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].priority).toBe("HIGH");
    expect(response.body[0].title).toBe("High priority outage");
  });

  it("maps Critical to URGENT priority", async () => {
    const response = await request(app)
      .get("/tickets")
      .set(authHeader(authToken))
      .query({
        priority: "Critical",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].priority).toBe("URGENT");
  });

  it("combines priority with search, status, and pagination", async () => {
    const highTicket = await createTestTicket(
      app,
      authToken,
      creatorId,
      assigneeId,
      {
        title: "High priority billing bug",
        priority: "HIGH",
      },
    );

    await updateTicketStatus(
      app,
      authToken,
      highTicket.body.id,
      "IN_PROGRESS",
    );

    const response = await request(app)
      .get("/tickets")
      .set(authHeader(authToken))
      .query({
        priority: "High",
        search: "billing",
        status: "In Progress",
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
      });

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(1);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].priority).toBe("HIGH");
    expect(response.body.data[0].status).toBe("IN_PROGRESS");
    expect(response.body.data[0].title).toBe("High priority billing bug");
  });

  it("rejects invalid priority values", async () => {
    const response = await request(app)
      .get("/tickets")
      .set(authHeader(authToken))
      .query({
        priority: "Immediate",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation failed");
  });
});
