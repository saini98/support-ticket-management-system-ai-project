import type { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    validatedQuery?: Record<string, unknown>;
  }
}

export const getValidatedQuery = <T extends Record<string, unknown>>(
  req: Request,
): T => (req.validatedQuery ?? req.query) as T;
