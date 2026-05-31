import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import crypto from 'crypto';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  const requestId = crypto.randomUUID().slice(0, 8);
  res.setHeader('X-Request-Id', requestId);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: { message: err.message },
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        message: 'Validation error',
        details: err.errors.map((e) => ({ path: e.path.join('.'), message: e.message })),
      },
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        error: { message: 'A record with that value already exists' },
      });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({
        error: { message: 'Record not found' },
      });
    }
    if (err.code === 'P2003') {
      return res.status(400).json({
        error: { message: 'Related record not found' },
      });
    }
    if (err.code === 'P2014') {
      return res.status(400).json({
        error: { message: 'Required relation violation' },
      });
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      error: { message: 'Invalid data provided' },
    });
  }

  // Network / fetch errors
  if ('code' in err && (err as NodeJS.ErrnoException).code === 'ECONNREFUSED') {
    console.error(`[${requestId}] Service unavailable: ${err.message}`);
    return res.status(503).json({
      error: { message: 'External service unavailable' },
    });
  }

  if (err.name === 'AbortError' || ('code' in err && (err as NodeJS.ErrnoException).code === 'ETIMEDOUT')) {
    console.error(`[${requestId}] Request timeout: ${err.message}`);
    return res.status(504).json({
      error: { message: 'Request timed out' },
    });
  }

  console.error(`[${requestId}] Unhandled error on ${req.method} ${req.path}:`, err.message);
  return res.status(500).json({
    error: { message: 'Internal server error' },
  });
}
