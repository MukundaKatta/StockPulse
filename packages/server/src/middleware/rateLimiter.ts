import { Request, Response, NextFunction } from 'express';
import { redis } from '../config/redis';
import { AppError } from './errorHandler';

export function rateLimiter(maxRequests: number = 100, windowSeconds: number = 60) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const forwarded = req.headers['x-forwarded-for'];
    const clientIp = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.ip;
    const identifier = req.user?.userId || clientIp || 'anonymous';
    const key = `sp:ratelimit:${identifier}`;

    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, windowSeconds);
    }

    const ttl = await redis.ttl(key);
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - current));
    res.setHeader('X-RateLimit-Reset', Math.ceil(Date.now() / 1000) + Math.max(ttl, 0));

    if (current > maxRequests) {
      throw new AppError(429, 'Too many requests. Please try again later.');
    }

    next();
  };
}

export function authRateLimiter(maxAttempts: number = 10, windowSeconds: number = 900) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body?.email;
    if (!email) return next();

    const key = `sp:auth-ratelimit:${email.toLowerCase()}`;
    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, windowSeconds);
    }

    if (current > maxAttempts) {
      throw new AppError(429, 'Too many login attempts. Please try again in 15 minutes.');
    }

    next();
  };
}
