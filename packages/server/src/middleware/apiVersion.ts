import { Request, Response, NextFunction } from 'express';

export function apiVersion(req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-API-Version', '1.0.0');
  res.setHeader('X-Request-Id', generateRequestId());
  res.setHeader('X-Response-Time-Start', Date.now().toString());

  res.on('finish', () => {
    const start = parseInt(res.getHeader('X-Response-Time-Start') as string || '0');
    if (start) {
      const duration = Date.now() - start;
      res.setHeader('X-Response-Time', `${duration}ms`);
    }
  });

  next();
}

function generateRequestId(): string {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
