import { Request, Response, NextFunction } from 'express';
import { createHash } from 'crypto';

export function etag(req: Request, res: Response, next: NextFunction): void {
  const originalJson = res.json.bind(res);

  res.json = function (body: unknown) {
    const content = JSON.stringify(body);
    const hash = createHash('md5').update(content).digest('hex');
    const etagValue = `"${hash}"`;

    res.setHeader('ETag', etagValue);

    const ifNoneMatch = req.headers['if-none-match'];
    if (ifNoneMatch === etagValue) {
      res.status(304).end();
      return res;
    }

    return originalJson(body);
  };

  next();
}
