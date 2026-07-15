import jwt, { type SignOptions } from "jsonwebtoken";

import type { UserRole } from "../infrastructure/prisma/generated/enums.js";
import { env } from "../config/env.js";
import type { AuthTokenPayload } from "../types/auth.types.js";

const signOptions: SignOptions = {
  expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
};

export const signAccessToken = (payload: AuthTokenPayload): string =>
  jwt.sign(payload, env.jwtSecret, signOptions);

export const verifyAccessToken = (token: string): AuthTokenPayload => {
  const decoded = jwt.verify(token, env.jwtSecret);

  if (typeof decoded === "string" || !decoded.sub) {
    throw new jwt.JsonWebTokenError("Invalid token payload");
  }

  return {
    sub: decoded.sub,
    email: String(decoded.email),
    role: decoded.role as UserRole,
  };
};
