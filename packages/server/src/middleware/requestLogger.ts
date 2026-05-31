import { Request, Response, NextFunction } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const method = req.method;
    const path = req.originalUrl;

    if (path === '/api/health' || path === '/api/ready') return;

    const logLevel = status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info';

    const message = `${method} ${path} ${status} ${duration}ms`;

    if (logLevel === 'error') {
      console.error(message);
    } else if (logLevel === 'warn') {
      console.warn(message);
    } else if (duration > 1000) {
      console.warn(`SLOW ${message}`);
    }
  });

  next();
}
