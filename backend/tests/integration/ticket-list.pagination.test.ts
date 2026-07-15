import type { Application } from "express";
import request from "supertest";

import { authHeader, loginAsUser } from "../helpers/auth.js";
import {
  disconnectTestDatabase,
  getTestUserIds,
  initializeTestDatabase,
  TEST_USER_CREDENTIALS,
} from "../helpers/database.js";
import { createTestTicket, getTestApp } from "../helpers/app.js";

describe("GET /tickets pagination", () => {
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

    for (let index = 0; index < 5; index += 1) {
      await createTestTicket(app, authToken, creatorId, assigneeId);
    }
  }, 30_000);

  afterAll(async () => {
    await disconnectTestDatabase();
  });

  it("returns a plain array when pagination params are not provided", async () => {
    const response = await request(app)
      .get("/tickets")
      .set(authHeader(authToken));

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(5);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("title");
  });

  it("returns paginated metadata when page is provided", async () => {
    const response = await request(app)
      .get("/tickets")
      .set(authHeader(authToken))
      .query({
        page: 2,
        limit: 2,
        sortBy: "createdAt",
        sortOrder: "asc",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: expect.any(Array),
      page: 2,
      limit: 2,
      total: 5,
      totalPages: 3,
    });
    expect(response.body.data).toHaveLength(2);
  });

  it("uses default page and limit when only sort params are provided", async () => {
    const response = await request(app)
      .get("/tickets")
      .set(authHeader(authToken))
      .query({
        sortBy: "createdAt",
        sortOrder: "desc",
      });

    expect(response.status).toBe(200);
    expect(response.body.page).toBe(1);
    expect(response.body.limit).toBe(10);
    expect(response.body.total).toBe(5);
    expect(response.body.totalPages).toBe(1);
    expect(response.body.data).toHaveLength(5);
  });

  it("rejects invalid pagination query params", async () => {
    const response = await request(app)
      .get("/tickets")
      .set(authHeader(authToken))
      .query({
        page: 0,
        limit: 10,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validation failed");
  });

  it("requires authentication", async () => {
    const response = await request(app).get("/tickets");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Authentication required");
    expect(response.body.code).toBe("AUTHENTICATION_REQUIRED");
  });
});
