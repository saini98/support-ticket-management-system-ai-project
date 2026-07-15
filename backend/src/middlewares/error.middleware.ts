import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { AppError } from "../utils/errors.js";
import { buildErrorResponse } from "../utils/error-response.js";
import { mapPrismaError } from "../utils/prisma-error.js";

const formatValidationDetails = (error: ZodError) =>
  error.issues.map((issue) => ({
    field: issue.path.length > 0 ? issue.path.join(".") : "body",
    message: issue.message,
  }));

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  next(
    new AppError(
      404,
      `Route ${req.method} ${req.originalUrl} not found`,
    ),
  );
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json(
      buildErrorResponse(error.statusCode, error.message, {
        ...(error.code && { code: error.code }),
      }),
    );
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json(
      buildErrorResponse(400, "Validation failed", {
        code: "VALIDATION_ERROR",
        details: formatValidationDetails(error),
      }),
    );
    return;
  }

  const prismaError = mapPrismaError(error);

  if (prismaError) {
    res.status(prismaError.statusCode).json(prismaError);
    return;
  }

  console.error(error);

  res.status(500).json(
    buildErrorResponse(500, "Internal server error", {
      code: "INTERNAL_SERVER_ERROR",
    }),
  );
};
