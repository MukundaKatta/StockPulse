import { Request, Response, NextFunction } from 'express';

let counter = 0;

function generateId(): string {
  const timestamp = Date.now().toString(36);
  const seq = (counter++).toString(36).padStart(4, '0');
  const random = Math.random().toString(36).slice(2, 6);
  return `${timestamp}-${seq}-${random}`;
}

export function requestId() {
  return (req: Request, res: Response, next: NextFunction): void => {
    const id = (req.headers['x-request-id'] as string) || generateId();
    (req as Request & { id: string }).id = id;
    res.setHeader('X-Request-Id', id);
    next();
  };
}
