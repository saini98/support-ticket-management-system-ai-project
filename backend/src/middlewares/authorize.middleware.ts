import type { NextFunction, Request, Response } from "express";

import { UserRole } from "../infrastructure/prisma/generated/enums.js";
import {
  type Permission,
  roleHasAnyPermission,
} from "../auth/permissions.js";
import { ForbiddenError, UnauthorizedError } from "../utils/errors.js";

export const authorize = (...permissions: Permission[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.auth) {
      next(
        new UnauthorizedError(
          "Authentication required",
          "AUTHENTICATION_REQUIRED",
        ),
      );
      return;
    }

    if (req.auth.role === UserRole.ADMIN) {
      next();
      return;
    }

    if (roleHasAnyPermission(req.auth.role, permissions)) {
      next();
      return;
    }

    next(
      new ForbiddenError(
        "You do not have permission to perform this action",
        "FORBIDDEN",
      ),
    );
  };
};
