import type { Application } from "express";
import request from "supertest";

export const loginAsUser = async (
  app: Application,
  email: string,
  password: string,
): Promise<string> => {
  const response = await request(app).post("/auth/login").send({
    email,
    password,
  });

  if (response.status !== 200) {
    throw new Error(`Failed to authenticate test user: ${response.body.message}`);
  }

  return response.body.accessToken as string;
};

export const authHeader = (token: string): { Authorization: string } => ({
  Authorization: `Bearer ${token}`,
});
