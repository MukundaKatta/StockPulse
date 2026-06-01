import { Request, Response, NextFunction } from 'express';

export function responseFormatter(req: Request, res: Response, next: NextFunction): void {
  const originalJson = res.json.bind(res);

  res.json = function (body: unknown) {
    const formatted = {
      success: res.statusCode >= 200 && res.statusCode < 400,
      data: body,
      timestamp: new Date().toISOString(),
    };
    return originalJson(formatted);
  };

  next();
}
