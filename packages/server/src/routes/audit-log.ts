import { Router, Request, Response } from 'express';

const router = Router();

interface AuditEntry {
  id: string;
  action: string;
  resource: string;
  userId: string;
  details: string;
  timestamp: string;
}

const auditEntries: AuditEntry[] = [
  { id: 'aud_1', action: 'CREATE', resource: 'order', userId: 'user_1', details: 'Created buy order for AAPL', timestamp: '2026-05-30T09:00:00Z' },
  { id: 'aud_2', action: 'UPDATE', resource: 'watchlist', userId: 'user_1', details: 'Added TSLA to watchlist', timestamp: '2026-05-30T09:15:00Z' },
  { id: 'aud_3', action: 'DELETE', resource: 'alert', userId: 'user_2', details: 'Deleted price alert for GOOGL', timestamp: '2026-05-30T10:00:00Z' },
  { id: 'aud_4', action: 'LOGIN', resource: 'session', userId: 'user_1', details: 'User logged in from 192.168.1.1', timestamp: '2026-05-30T08:00:00Z' },
  { id: 'aud_5', action: 'UPDATE', resource: 'settings', userId: 'user_2', details: 'Changed theme to dark mode', timestamp: '2026-05-30T11:00:00Z' },
  { id: 'aud_6', action: 'CREATE', resource: 'webhook', userId: 'user_1', details: 'Created webhook for trade events', timestamp: '2026-05-31T09:00:00Z' },
  { id: 'aud_7', action: 'CANCEL', resource: 'order', userId: 'user_2', details: 'Cancelled limit order ord_5', timestamp: '2026-05-31T10:30:00Z' },
  { id: 'aud_8', action: 'EXPORT', resource: 'portfolio', userId: 'user_1', details: 'Exported portfolio as CSV', timestamp: '2026-05-31T14:00:00Z' },
];

router.get('/', (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = auditEntries.slice(start, end);

  res.json({
    entries: paginated,
    pagination: {
      page,
      limit,
      total: auditEntries.length,
      totalPages: Math.ceil(auditEntries.length / limit),
    },
  });
});

export default router;
