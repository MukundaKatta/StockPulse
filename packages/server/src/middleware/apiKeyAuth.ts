import { Request, Response, NextFunction } from 'express';

interface ApiKeyAuthOptions {
  header?: string;
  queryParam?: string;
  keys?: Set<string>;
  validate?: (key: string) => boolean | Promise<boolean>;
}

export function apiKeyAuth(options: ApiKeyAuthOptions = {}) {
  const {
    header = 'x-api-key',
    queryParam = 'api_key',
    keys,
    validate,
  } = options;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const key = (req.headers[header] as string) || (req.query[queryParam] as string);

    if (!key) {
      res.status(401).json({ error: 'API key required' });
      return;
    }

    if (keys && keys.has(key)) {
      next();
      return;
    }

    if (validate) {
      const valid = await validate(key);
      if (valid) {
        next();
        return;
      }
    }

    if (!keys && !validate) {
      next();
      return;
    }

    res.status(403).json({ error: 'Invalid API key' });
  };
}
