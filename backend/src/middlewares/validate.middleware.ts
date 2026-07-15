import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

type RequestSchemas = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

export const validate =
  (schemas: RequestSchemas) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        req.params = schemas.params.parse(req.params) as Request["params"];
      }

      if (schemas.query) {
        req.validatedQuery = schemas.query.parse(req.query) as Record<
          string,
          unknown
        >;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
