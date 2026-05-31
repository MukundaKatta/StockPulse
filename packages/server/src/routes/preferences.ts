import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = Router();

const DEFAULT_PREFERENCES = {
  theme: 'dark',
  defaultTab: 'overview',
  chartType: 'candle',
  refreshInterval: 30,
  notifications: {
    priceAlerts: true,
    earnings: true,
    news: false,
    portfolio: true,
  },
  display: {
    compactMode: false,
    showSparklines: true,
    currencySymbol: '$',
    dateFormat: 'MM/DD/YYYY',
  },
};

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { preferences: true },
  });

  const preferences = user?.preferences
    ? { ...DEFAULT_PREFERENCES, ...(user.preferences as object) }
    : DEFAULT_PREFERENCES;

  res.json(preferences);
});

router.patch('/', authMiddleware, async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const updates = req.body;

  if (!updates || typeof updates !== 'object') {
    return res.status(400).json({ error: 'Invalid preferences data' });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { preferences: true },
  });

  const current = (user?.preferences as object) || DEFAULT_PREFERENCES;
  const merged = { ...current, ...updates };

  await prisma.user.update({
    where: { id: userId },
    data: { preferences: merged },
  });

  res.json(merged);
});

router.delete('/', authMiddleware, async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  await prisma.user.update({
    where: { id: userId },
    data: { preferences: DEFAULT_PREFERENCES },
  });

  res.json(DEFAULT_PREFERENCES);
});

export default router;
