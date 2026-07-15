import { Prisma } from "../infrastructure/prisma/generated/client.js";

import { buildErrorResponse } from "./error-response.js";
import type { ErrorResponse } from "./error-response.js";

const PRISMA_ERROR_MESSAGES: Record<string, { statusCode: number; message: string }> =
  {
    P2000: {
      statusCode: 400,
      message: "One or more values are invalid for the database field",
    },
    P2002: {
      statusCode: 409,
      message: "A record with the same unique value already exists",
    },
    P2003: {
      statusCode: 400,
      message: "Referenced record does not exist",
    },
    P2025: {
      statusCode: 404,
      message: "Record not found",
    },
  };

export const mapPrismaError = (error: unknown): ErrorResponse | null => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const mapped = PRISMA_ERROR_MESSAGES[error.code];

    return buildErrorResponse(
      mapped?.statusCode ?? 400,
      mapped?.message ?? "Database request failed",
      {
        code: error.code,
        details: error.meta,
      },
    );
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return buildErrorResponse(400, "Invalid data provided to the database", {
      code: "PRISMA_VALIDATION_ERROR",
    });
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return buildErrorResponse(500, "Database connection failed", {
      code: "PRISMA_INITIALIZATION_ERROR",
    });
  }

  return null;
};
