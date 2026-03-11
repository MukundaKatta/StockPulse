import { Request, Response, NextFunction } from 'express';
import { redis } from '../config/redis';
import { AppError } from './errorHandler';

export function rateLimiter(maxRequests: number = 100, windowSeconds: number = 60) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const identifier = req.user?.userId || req.ip || 'anonymous';
    const key = `sp:ratelimit:${identifier}`;

    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, windowSeconds);
    }

    if (current > maxRequests) {
      throw new AppError(429, 'Too many requests. Please try again later.');
    }

    next();
  };
}
