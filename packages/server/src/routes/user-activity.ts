import { Router, Request, Response } from 'express';

interface UserActivity {
  id: string;
  userId: string;
  type: 'login' | 'trade' | 'alert' | 'logout' | 'settings_change';
  description: string;
  metadata: Record<string, unknown>;
  ipAddress: string;
  timestamp: string;
}

const activityLog: UserActivity[] = [
  {
    id: 'act-001',
    userId: 'user-1',
    type: 'login',
    description: 'User logged in from Chrome on macOS',
    metadata: { browser: 'Chrome', os: 'macOS', version: '125.0' },
    ipAddress: '192.168.1.10',
    timestamp: '2026-05-31T09:00:00Z',
  },
  {
    id: 'act-002',
    userId: 'user-1',
    type: 'trade',
    description: 'Bought 50 shares of AAPL at $198.50',
    metadata: { symbol: 'AAPL', action: 'BUY', quantity: 50, price: 198.5 },
    ipAddress: '192.168.1.10',
    timestamp: '2026-05-31T09:15:30Z',
  },
  {
    id: 'act-003',
    userId: 'user-1',
    type: 'alert',
    description: 'Price alert triggered for TSLA above $250',
    metadata: { symbol: 'TSLA', condition: 'above', threshold: 250, currentPrice: 251.3 },
    ipAddress: '192.168.1.10',
    timestamp: '2026-05-31T10:22:00Z',
  },
  {
    id: 'act-004',
    userId: 'user-2',
    type: 'trade',
    description: 'Sold 100 shares of MSFT at $430.25',
    metadata: { symbol: 'MSFT', action: 'SELL', quantity: 100, price: 430.25 },
    ipAddress: '10.0.0.5',
    timestamp: '2026-05-31T11:00:00Z',
  },
  {
    id: 'act-005',
    userId: 'user-2',
    type: 'login',
    description: 'User logged in from Firefox on Windows',
    metadata: { browser: 'Firefox', os: 'Windows', version: '128.0' },
    ipAddress: '10.0.0.5',
    timestamp: '2026-05-31T08:45:00Z',
  },
  {
    id: 'act-006',
    userId: 'user-1',
    type: 'settings_change',
    description: 'Updated notification preferences',
    metadata: { setting: 'notifications', oldValue: false, newValue: true },
    ipAddress: '192.168.1.10',
    timestamp: '2026-05-31T12:00:00Z',
  },
];

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { userId, type, limit = '50', offset = '0' } = req.query;

  let filtered = [...activityLog];

  if (typeof userId === 'string') {
    filtered = filtered.filter((a) => a.userId === userId);
  }

  if (typeof type === 'string') {
    filtered = filtered.filter((a) => a.type === type);
  }

  filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const total = filtered.length;
  const parsedLimit = Math.min(parseInt(limit as string, 10) || 50, 200);
  const parsedOffset = parseInt(offset as string, 10) || 0;
  const paginated = filtered.slice(parsedOffset, parsedOffset + parsedLimit);

  res.json({
    success: true,
    data: paginated,
    pagination: {
      total,
      limit: parsedLimit,
      offset: parsedOffset,
      hasMore: parsedOffset + parsedLimit < total,
    },
  });
});

export default router;
