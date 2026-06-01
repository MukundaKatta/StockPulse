import { Router, Request, Response } from 'express';
import crypto from 'crypto';

const router = Router();

interface WatchlistGroup {
  id: string;
  userId: string;
  name: string;
  symbols: string[];
  createdAt: string;
}

const groupsStore = new Map<string, WatchlistGroup[]>();

// List watchlist groups
router.get('/', (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string || 'default';
  const groups = groupsStore.get(userId) || [];
  res.json({ groups });
});

// Create watchlist group
router.post('/', (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string || 'default';
  const name: string = req.body.name || 'Untitled Group';
  const symbols: string[] = req.body.symbols || [];

  const group: WatchlistGroup = {
    id: crypto.randomUUID(),
    userId,
    name,
    symbols,
    createdAt: new Date().toISOString(),
  };

  const groups = groupsStore.get(userId) || [];
  groups.push(group);
  groupsStore.set(userId, groups);

  res.status(201).json({ group });
});

// Delete watchlist group
router.delete('/:id', (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string || 'default';
  const groups = groupsStore.get(userId) || [];
  const index = groups.findIndex((g) => g.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ error: 'Watchlist group not found' });
    return;
  }

  groups.splice(index, 1);
  groupsStore.set(userId, groups);
  res.json({ success: true });
});

export default router;
