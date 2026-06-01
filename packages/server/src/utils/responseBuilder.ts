import { PaginationMeta, PageLinks } from './paginationHelpers';

export interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
}

export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: PaginationMeta;
  links: PageLinks;
  timestamp: string;
}

export function success<T>(data: T, message?: string): SuccessResponse<T> {
  return {
    success: true,
    data,
    ...(message ? { message } : {}),
    timestamp: new Date().toISOString(),
  };
}

export function error(
  code: string,
  message: string,
  details?: unknown
): ErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      ...(details !== undefined ? { details } : {}),
    },
    timestamp: new Date().toISOString(),
  };
}

export function paginated<T>(
  data: T[],
  pagination: PaginationMeta,
  links: PageLinks
): PaginatedResponse<T> {
  return {
    success: true,
    data,
    pagination,
    links,
    timestamp: new Date().toISOString(),
  };
}

export function notFound(resource: string, id?: string): ErrorResponse {
  const message = id
    ? `${resource} with id '${id}' not found`
    : `${resource} not found`;
  return error('NOT_FOUND', message);
}

export function badRequest(message: string, details?: unknown): ErrorResponse {
  return error('BAD_REQUEST', message, details);
}

export function unauthorized(message = 'Authentication required'): ErrorResponse {
  return error('UNAUTHORIZED', message);
}

export function forbidden(message = 'Insufficient permissions'): ErrorResponse {
  return error('FORBIDDEN', message);
}

export function serverError(message = 'Internal server error'): ErrorResponse {
  return error('INTERNAL_ERROR', message);
}

export function validationError(
  fields: Record<string, string>
): ErrorResponse {
  return error('VALIDATION_ERROR', 'One or more fields failed validation', fields);
}
