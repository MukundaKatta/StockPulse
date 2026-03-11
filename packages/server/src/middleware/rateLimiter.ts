import { Request, Response, NextFunction } from 'express';
import { redis } from '../config/redis';
import { AppError } from './errorHandler';

export function rateLimiter(maxRequests: number = 100, windowSeconds: number = 60) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const identifier = req.user?.userId || req.ip || 'anonymous';
    const key = `sp:ratelimit:${identifier}`;

    // Atomic INCR + EXPIRE to prevent race condition
    const results = await redis.multi()
      .incr(key)
      .expire(key, windowSeconds)
      .exec();

    const current = results?.[0]?.[1] as number ?? 0;

    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - current));

    if (current > maxRequests) {
      throw new AppError(429, 'Too many requests. Please try again later.');
    }

    next();
  };
}
