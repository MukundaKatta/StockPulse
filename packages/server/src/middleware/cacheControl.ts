import { Request, Response, NextFunction } from 'express';

interface CacheRule {
  pattern: RegExp;
  maxAge: number;
  directive: string;
}

const defaultRules: CacheRule[] = [
  { pattern: /\/health$/, maxAge: 0, directive: 'no-cache, no-store, must-revalidate' },
  { pattern: /\/system-status/, maxAge: 30, directive: 'public, max-age=30' },
  { pattern: /\/reports\//, maxAge: 300, directive: 'private, max-age=300' },
  { pattern: /\/feature-flags/, maxAge: 60, directive: 'public, max-age=60' },
];

export function cacheControl(rules: CacheRule[] = defaultRules) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const path = req.originalUrl || req.path;
    const matchedRule = rules.find((rule) => rule.pattern.test(path));

    if (matchedRule) {
      res.setHeader('Cache-Control', matchedRule.directive);
    } else {
      res.setHeader('Cache-Control', 'no-cache');
    }

    next();
  };
}
