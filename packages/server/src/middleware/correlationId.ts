import { Request, Response, NextFunction } from 'express';

let counter = 0;

function generateCorrelationId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  const seq = (counter++).toString(36);
  return `${timestamp}-${random}-${seq}`;
}

export function correlationId(req: Request, res: Response, next: NextFunction): void {
  const existingId = req.headers['x-correlation-id'] as string | undefined;
  const id = existingId || generateCorrelationId();

  req.headers['x-correlation-id'] = id;
  res.setHeader('X-Correlation-ID', id);

  next();
}

export default correlationId;
