import { Request, Response, NextFunction } from 'express';
import { redis } from '../config/redis';
import { AppError } from './errorHandler';

export function rateLimiter(maxRequests: number = 100, windowSeconds: number = 60) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const identifier = req.user?.userId || req.ip || 'anonymous';
    const key = `sp:ratelimit:${identifier}`;

    // INCR + set TTL only on first request (when key is new)
    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, windowSeconds);
    }

    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - current));

    if (current > maxRequests) {
      throw new AppError(429, 'Too many requests. Please try again later.');
    }

    next();
  };
}
