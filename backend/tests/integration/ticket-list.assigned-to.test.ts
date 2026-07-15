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

describe("GET /tickets assignedTo filter", () => {
  let app: Application;
  let authToken: string;
  let creatorId: string;
  let assigneeId: string;
  let otherAssigneeId: string;

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
    otherAssigneeId = creatorId;

    await createTestTicket(app, authToken, creatorId, assigneeId, {
      title: "Assignee support ticket",
      priority: "HIGH",
    });
    await createTestTicket(app, authToken, creatorId, otherAssigneeId, {
      title: "Admin assigned ticket",
      priority: "LOW",
      assigneeId: otherAssigneeId,
    });
  }, 30_000);

  afterAll(async () => {
    await disconnectTestDatabase();
  });

  it("filters tickets by assignee user ID", async () => {
    const response = await request(app)
      .get("/tickets")
      .set(authHeader(authToken))
      .query({
        assignedTo: assigneeId,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].assigneeId).toBe(assigneeId);
    expect(response.body[0].title).toBe("Assignee support ticket");
  });

  it("combines assignedTo with search, status, priority, and pagination", async () => {
    const ticket = await createTestTicket(app, authToken, creatorId, assigneeId, {
      title: "Billing issue for assignee",
      priority: "HIGH",
    });

    const updateResponse = await updateTicketStatus(
      app,
      authToken,
      ticket.body.id,
      "IN_PROGRESS",
    );
    expect(updateResponse.status).toBe(200);

    const response = await request(app)
      .get("/tickets")
      .set(authHeader(authToken))
      .query({
        assignedTo: assigneeId,
        search: "Billing",
        status: "In Progress",
        priority: "High",
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
      });

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(1);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].assigneeId).toBe(assigneeId);
    expect(response.body.data[0].priority).toBe("HIGH");
    expect(response.body.data[0].status).toBe("IN_PROGRESS");
    expect(response.body.data[0].title).toBe("Billing issue for assignee");
  });

  it("rejects empty assignedTo values", async () => {
    const response = await request(app)
      .get("/tickets")
      .set(authHeader(authToken))
      .query({
        assignedTo: "   ",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation failed");
  });
});
