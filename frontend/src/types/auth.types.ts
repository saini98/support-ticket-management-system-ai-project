import type { UserRole } from "./ticket.types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

export interface StoredAuthSession {
  accessToken: string;
  user: AuthUser;
}
