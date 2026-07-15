export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly code?: string,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(404, message);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(400, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(
    message = "Unauthorized",
    code = "UNAUTHORIZED",
  ) {
    super(401, message, code);
  }
}

export class ForbiddenError extends AppError {
  constructor(
    message = "Forbidden",
    code = "FORBIDDEN",
  ) {
    super(403, message, code);
  }
}
