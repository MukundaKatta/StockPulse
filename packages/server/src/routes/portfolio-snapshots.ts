import { Router, Request, Response } from 'express';
import crypto from 'crypto';

const router = Router();

interface PortfolioSnapshot {
  id: string;
  userId: string;
  totalValue: number;
  dayChange: number;
  dayChangePct: number;
  holdings: number;
  capturedAt: string;
}

const snapshotsStore = new Map<string, PortfolioSnapshot[]>();

// Get snapshot history
router.get('/', (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string || 'default';
  const snapshots = snapshotsStore.get(userId) || [];
  const limit = parseInt(req.query.limit as string) || 30;
  const sorted = [...snapshots].sort(
    (a, b) => new Date(b.capturedAt).getTime() - new Date(a.capturedAt).getTime()
  );
  res.json({ snapshots: sorted.slice(0, limit) });
});

// Capture a new snapshot
router.post('/capture', (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string || 'default';
  const { totalValue, dayChange, dayChangePct, holdings } = req.body;

  const snapshot: PortfolioSnapshot = {
    id: crypto.randomUUID(),
    userId,
    totalValue: totalValue ?? 0,
    dayChange: dayChange ?? 0,
    dayChangePct: dayChangePct ?? 0,
    holdings: holdings ?? 0,
    capturedAt: new Date().toISOString(),
  };

  const snapshots = snapshotsStore.get(userId) || [];
  snapshots.push(snapshot);
  snapshotsStore.set(userId, snapshots);

  res.status(201).json({ snapshot });
});

export default router;
