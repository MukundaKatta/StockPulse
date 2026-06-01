import { Request, Response, NextFunction } from 'express';

function stripHtmlTags(str: string): string {
  return str.replace(/<[^>]*>/g, '');
}

function sanitizeValue(value: unknown): unknown {
  if (typeof value === 'string') {
    return stripHtmlTags(value).trim();
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (value !== null && typeof value === 'object') {
    const sanitized: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      sanitized[key] = sanitizeValue(val);
    }
    return sanitized;
  }
  return value;
}

export function requestSanitizer(req: Request, res: Response, next: NextFunction): void {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeValue(req.body);
  }
  next();
}
