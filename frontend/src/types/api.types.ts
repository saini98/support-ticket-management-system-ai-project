export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  code?: string;
  details?: unknown;
}

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly code?: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
