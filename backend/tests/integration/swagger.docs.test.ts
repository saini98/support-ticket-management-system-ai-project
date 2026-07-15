import type { Application } from "express";
import request from "supertest";

import {
  disconnectTestDatabase,
  initializeTestDatabase,
} from "../helpers/database.js";
import { getTestApp } from "../helpers/app.js";

describe("Swagger API documentation", () => {
  let app: Application;

  beforeAll(async () => {
    await initializeTestDatabase();
    app = await getTestApp();
  });

  afterAll(async () => {
    await disconnectTestDatabase();
  });

  it("serves Swagger UI at GET /api-docs", async () => {
    const response = await request(app).get("/api-docs/");

    expect(response.status).toBe(200);
    expect(response.text).toContain("swagger");
  });

  it("serves OpenAPI JSON at GET /api-docs.json", async () => {
    const response = await request(app).get("/api-docs.json");

    expect(response.status).toBe(200);
    expect(response.body.openapi).toBe("3.0.3");
    expect(response.body.paths["/tickets"]).toBeDefined();
    expect(response.body.paths["/auth/login"]).toBeDefined();
    expect(response.body.paths["/api/dashboard/stats"]).toBeDefined();
    expect(response.body.paths["/tickets/{ticketId}/comments"]).toBeDefined();
    expect(response.body.components.schemas.UserSummary).toBeDefined();
    expect(response.body.components.securitySchemes.bearerAuth).toBeDefined();
  });
});
