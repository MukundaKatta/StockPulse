import { Request, Response, NextFunction } from 'express';

interface CompressionOptions {
  threshold?: number;
  level?: number;
}

export function shouldCompress(req: Request, res: Response): boolean {
  const type = res.getHeader('Content-Type');
  if (!type) return false;
  const contentType = Array.isArray(type) ? type[0] : String(type);
  return /json|text|javascript|css|xml|svg/.test(contentType);
}

export function compressionHeaders(options: CompressionOptions = {}) {
  const { threshold = 1024 } = options;

  return (_req: Request, res: Response, next: NextFunction): void => {
    const originalJson = res.json.bind(res);
    res.json = function (body: unknown) {
      const str = JSON.stringify(body);
      if (str && str.length > threshold) {
        res.setHeader('X-Content-Length', str.length.toString());
        res.setHeader('X-Compression-Eligible', 'true');
      }
      return originalJson(body);
    };
    next();
  };
}
