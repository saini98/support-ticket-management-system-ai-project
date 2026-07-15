import type { Application } from "express";
import request from "supertest";

import { authHeader, loginAsUser } from "../helpers/auth.js";
import {
  disconnectTestDatabase,
  getTestUserIdByEmail,
  getTestUserIds,
  initializeTestDatabase,
  TEST_ROLE_CREDENTIALS,
} from "../helpers/database.js";
import { createTestTicket, getTestApp } from "../helpers/app.js";

describe("Role based authorization", () => {
  let app: Application;
  let adminToken: string;
  let supportToken: string;
  let developerToken: string;
  let qaToken: string;
  let managerToken: string;
  let creatorId: string;
  let supportUserId: string;
  let developerUserId: string;

  beforeAll(async () => {
    await initializeTestDatabase();
    app = await getTestApp();

    [adminToken, supportToken, developerToken, qaToken, managerToken] =
      await Promise.all([
        loginAsUser(
          app,
          TEST_ROLE_CREDENTIALS.admin.email,
          TEST_ROLE_CREDENTIALS.admin.password,
        ),
        loginAsUser(
          app,
          TEST_ROLE_CREDENTIALS.support.email,
          TEST_ROLE_CREDENTIALS.support.password,
        ),
        loginAsUser(
          app,
          TEST_ROLE_CREDENTIALS.developer.email,
          TEST_ROLE_CREDENTIALS.developer.password,
        ),
        loginAsUser(
          app,
          TEST_ROLE_CREDENTIALS.qa.email,
          TEST_ROLE_CREDENTIALS.qa.password,
        ),
        loginAsUser(
          app,
          TEST_ROLE_CREDENTIALS.manager.email,
          TEST_ROLE_CREDENTIALS.manager.password,
        ),
      ]);

    const userIds = await getTestUserIds();
    creatorId = userIds.creatorId;
    supportUserId = await getTestUserIdByEmail(
      TEST_ROLE_CREDENTIALS.support.email,
    );
    developerUserId = await getTestUserIdByEmail(
      TEST_ROLE_CREDENTIALS.developer.email,
    );
  });

  afterAll(async () => {
    await disconnectTestDatabase();
  });

  it("allows QA to read tickets but not create them", async () => {
    const listResponse = await request(app)
      .get("/tickets")
      .set(authHeader(qaToken));

    expect(listResponse.status).toBe(200);

    const createResponse = await request(app)
      .post("/tickets")
      .set(authHeader(qaToken))
      .send({
        title: "QA ticket",
        description: "Should be forbidden",
        priority: "LOW",
        creatorId,
        assigneeId: supportUserId,
      });

    expect(createResponse.status).toBe(403);
    expect(createResponse.body.code).toBe("FORBIDDEN");
  });

  it("allows Support to create and update tickets", async () => {
    const createResponse = await createTestTicket(
      app,
      supportToken,
      creatorId,
      supportUserId,
      { title: "Support created ticket" },
    );

    expect(createResponse.status).toBe(201);

    const updateResponse = await request(app)
      .put(`/tickets/${createResponse.body.id}`)
      .set(authHeader(supportToken))
      .send({ status: "IN_PROGRESS" });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.status).toBe("IN_PROGRESS");
  });

  it("allows Developer to update only assigned tickets", async () => {
    const unassignedTicket = await createTestTicket(
      app,
      adminToken,
      creatorId,
      supportUserId,
      { title: "Unassigned developer ticket", assigneeId: supportUserId },
    );

    const forbiddenUpdate = await request(app)
      .put(`/tickets/${unassignedTicket.body.id}`)
      .set(authHeader(developerToken))
      .send({ status: "IN_PROGRESS" });

    expect(forbiddenUpdate.status).toBe(403);
    expect(forbiddenUpdate.body.code).toBe("FORBIDDEN_ASSIGNED_TICKET_ONLY");

    const assignedTicket = await createTestTicket(
      app,
      adminToken,
      creatorId,
      developerUserId,
      { title: "Assigned developer ticket", assigneeId: developerUserId },
    );

    const allowedUpdate = await request(app)
      .put(`/tickets/${assignedTicket.body.id}`)
      .set(authHeader(developerToken))
      .send({ status: "IN_PROGRESS" });

    expect(allowedUpdate.status).toBe(200);
    expect(allowedUpdate.body.status).toBe("IN_PROGRESS");
  });

  it("allows Manager to view reports but not create tickets", async () => {
    const dashboardResponse = await request(app)
      .get("/api/dashboard/stats")
      .set(authHeader(managerToken));

    expect(dashboardResponse.status).toBe(200);
    expect(dashboardResponse.body).toHaveProperty("totalTickets");

    const createResponse = await request(app)
      .post("/tickets")
      .set(authHeader(managerToken))
      .send({
        title: "Manager ticket",
        description: "Should be forbidden",
        priority: "LOW",
        creatorId,
        assigneeId: supportUserId,
      });

    expect(createResponse.status).toBe(403);
    expect(createResponse.body.code).toBe("FORBIDDEN");
  });

  it("allows only Admin to delete tickets", async () => {
    const ticket = await createTestTicket(
      app,
      supportToken,
      creatorId,
      supportUserId,
      { title: "Ticket to delete" },
    );

    const supportDelete = await request(app)
      .delete(`/tickets/${ticket.body.id}`)
      .set(authHeader(supportToken));

    expect(supportDelete.status).toBe(403);
    expect(supportDelete.body.code).toBe("FORBIDDEN");

    const adminDelete = await request(app)
      .delete(`/tickets/${ticket.body.id}`)
      .set(authHeader(adminToken));

    expect(adminDelete.status).toBe(204);
  });
});
