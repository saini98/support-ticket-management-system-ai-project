import type { UserRole } from "../infrastructure/prisma/generated/enums.js";

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthTokenPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export interface AuthenticatedUser {
  userId: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
}
