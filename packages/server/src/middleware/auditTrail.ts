import { Request, Response, NextFunction } from 'express';

interface AuditEntry {
  id: string;
  timestamp: string;
  method: string;
  path: string;
  ip: string;
  userId: string | null;
  userAgent: string;
  statusCode: number;
  requestBody: unknown;
  responseTimeMs: number;
  correlationId: string | null;
}

const auditLog: AuditEntry[] = [];
const MAX_AUDIT_LOG_SIZE = 10000;
let auditIdCounter = 0;

export function getAuditLog(limit = 100): AuditEntry[] {
  return auditLog.slice(-limit);
}

export function clearAuditLog(): void {
  auditLog.length = 0;
}

export function auditTrail(req: Request, res: Response, next: NextFunction): void {
  const mutatingMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

  if (!mutatingMethods.has(req.method)) {
    next();
    return;
  }

  const startTime = Date.now();

  const originalEnd = res.end;
  // @ts-expect-error: overriding end for audit capture
  res.end = function (...args: unknown[]) {
    const responseTimeMs = Date.now() - startTime;

    const entry: AuditEntry = {
      id: `audit-${++auditIdCounter}`,
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl || req.path,
      ip: req.socket.remoteAddress || '0.0.0.0',
      userId: (req.headers['x-user-id'] as string) || null,
      userAgent: req.headers['user-agent'] || 'unknown',
      statusCode: res.statusCode,
      requestBody: sanitizeBody(req.body),
      responseTimeMs,
      correlationId: (req.headers['x-correlation-id'] as string) || null,
    };

    auditLog.push(entry);

    // Trim log if too large
    if (auditLog.length > MAX_AUDIT_LOG_SIZE) {
      auditLog.splice(0, auditLog.length - MAX_AUDIT_LOG_SIZE);
    }

    // @ts-expect-error: restoring original end
    originalEnd.apply(res, args);
  };

  next();
}

function sanitizeBody(body: unknown): unknown {
  if (!body || typeof body !== 'object') return body;

  const sensitiveFields = new Set([
    'password',
    'token',
    'secret',
    'apiKey',
    'api_key',
    'authorization',
    'ssn',
    'creditCard',
    'credit_card',
  ]);

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body as Record<string, unknown>)) {
    if (sensitiveFields.has(key.toLowerCase())) {
      sanitized[key] = '[REDACTED]';
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export default auditTrail;
