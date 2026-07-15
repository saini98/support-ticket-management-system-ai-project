import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../utils/errors.js";
import { verifyAccessToken } from "../utils/jwt.js";

const getBearerToken = (authorizationHeader?: string): string | null => {
  if (!authorizationHeader) {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return null;
  }

  return token;
};

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    const token = getBearerToken(req.headers.authorization);

    if (!token) {
      throw new UnauthorizedError(
        "Authentication required",
        "AUTHENTICATION_REQUIRED",
      );
    }

    const payload = verifyAccessToken(token);

    req.auth = {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new UnauthorizedError("Token has expired", "TOKEN_EXPIRED"));
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError("Invalid or expired token", "INVALID_TOKEN"));
      return;
    }

    next(error);
  }
};
