import type { Application } from "express";
import request from "supertest";

import { authHeader, loginAsUser } from "../helpers/auth.js";
import {
  disconnectTestDatabase,
  initializeTestDatabase,
} from "../helpers/database.js";
import { getTestApp } from "../helpers/app.js";

describe("POST /auth/login", () => {
  let app: Application;

  beforeAll(async () => {
    await initializeTestDatabase();
    app = await getTestApp();
  });

  afterAll(async () => {
    await disconnectTestDatabase();
  });

  it("logs in seeded test users and returns a JWT", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "test-admin@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toEqual(expect.any(String));
    expect(response.body.user).toEqual({
      id: expect.any(String),
      name: "Test Admin",
      email: "test-admin@example.com",
      role: "ADMIN",
    });
  });

  it("returns 401 for invalid credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "test-admin@example.com",
      password: "wrong-password",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      success: false,
      statusCode: 401,
      message: "Invalid email or password",
      code: "INVALID_CREDENTIALS",
    });
  });

  it("returns 400 for invalid request body", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "not-an-email",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation failed");
  });

  it("protects ticket routes without a token", async () => {
    const response = await request(app).get("/tickets");

    expect(response.status).toBe(401);
    expect(response.body.code).toBe("AUTHENTICATION_REQUIRED");
  });

  it("protects dashboard routes without a token", async () => {
    const response = await request(app).get("/api/dashboard/stats");

    expect(response.status).toBe(401);
    expect(response.body.code).toBe("AUTHENTICATION_REQUIRED");
  });

  it("rejects invalid bearer tokens", async () => {
    const response = await request(app)
      .get("/tickets")
      .set(authHeader("invalid.token.value"));

    expect(response.status).toBe(401);
    expect(response.body.code).toBe("INVALID_TOKEN");
  });
});

describe("Seeded user login", () => {
  let app: Application;

  beforeAll(async () => {
    await initializeTestDatabase();
    app = await getTestApp();
  }, 30_000);

  afterAll(async () => {
    await disconnectTestDatabase();
  });

  it("allows logging in with hashed seed-style credentials", async () => {
    const token = await loginAsUser(
      app,
      "test-support@example.com",
      "password123",
    );

    const response = await request(app)
      .get("/tickets")
      .set(authHeader(token));

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
