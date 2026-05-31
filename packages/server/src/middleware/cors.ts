import { Request, Response, NextFunction } from 'express';

export function handlePreflight(req: Request, res: Response, next: NextFunction): void {
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  next();
}

export function apiVersionHeader(req: Request, res: Response, next: NextFunction): void {
  res.setHeader('X-API-Version', '1.0.0');
  res.setHeader('X-Powered-By', 'StockPulse');
  next();
}
