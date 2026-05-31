import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/database';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

const updateSettingsSchema = z.object({
  alphaVantageKey: z.string().optional(),
  finnhubKey: z.string().optional(),
  fmpKey: z.string().optional(),
  theme: z.enum(['dark', 'light']).optional(),
  defaultChart: z.enum(['candlestick', 'line', 'area']).optional(),
});

router.get('/', async (req: Request, res: Response) => {
  const settings = await prisma.userSettings.findUnique({
    where: { userId: req.user!.userId },
  });
  res.json({ settings: settings || {} });
});

router.patch('/', async (req: Request, res: Response) => {
  const data = updateSettingsSchema.parse(req.body);

  const settings = await prisma.userSettings.upsert({
    where: { userId: req.user!.userId },
    update: data,
    create: { userId: req.user!.userId, ...data },
  });

  res.json({ settings });
});

export default router;
