export interface ErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  code?: string;
  details?: unknown;
}

export const buildErrorResponse = (
  statusCode: number,
  message: string,
  options?: {
    code?: string;
    details?: unknown;
  },
): ErrorResponse => ({
  success: false,
  statusCode,
  message,
  ...(options?.code && { code: options.code }),
  ...(options?.details !== undefined && { details: options.details }),
});
