import { Response } from 'express';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    timestamp: string;
  };
}

export function sendSuccess<T>(res: Response, data: T, statusCode = 200, meta?: Partial<ApiResponse['meta']>): void {
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  };
  res.status(statusCode).json(response);
}

export function sendError(res: Response, statusCode: number, code: string, message: string, details?: unknown): void {
  const response: ApiResponse = {
    success: false,
    error: { code, message, details },
    meta: { timestamp: new Date().toISOString() },
  };
  res.status(statusCode).json(response);
}

export function sendNotFound(res: Response, resource = 'Resource'): void {
  sendError(res, 404, 'NOT_FOUND', `${resource} not found`);
}

export function sendBadRequest(res: Response, message: string, details?: unknown): void {
  sendError(res, 400, 'BAD_REQUEST', message, details);
}

export function sendUnauthorized(res: Response, message = 'Unauthorized'): void {
  sendError(res, 401, 'UNAUTHORIZED', message);
}

export function sendForbidden(res: Response, message = 'Forbidden'): void {
  sendError(res, 403, 'FORBIDDEN', message);
}

export function sendConflict(res: Response, message: string): void {
  sendError(res, 409, 'CONFLICT', message);
}

export function sendServerError(res: Response, message = 'Internal server error'): void {
  sendError(res, 500, 'INTERNAL_ERROR', message);
}
