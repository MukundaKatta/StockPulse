import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/database';
import { authenticate } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router = Router();
router.use(authenticate);

const createAlertSchema = z.object({
  symbol: z.string().min(1).max(10).toUpperCase(),
  condition: z.enum(['ABOVE', 'BELOW']),
  targetPrice: z.number().positive(),
});

// List alerts
router.get('/', async (req: Request, res: Response) => {
  const { active } = z.object({
    active: z.enum(['true', 'false']).optional(),
  }).parse(req.query);

  const where: Record<string, unknown> = { userId: req.user!.userId };
  if (active === 'true') where.active = true;
  if (active === 'false') where.active = false;

  const alerts = await prisma.alert.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
  res.json({ alerts });
});

// Create alert
router.post('/', async (req: Request, res: Response) => {
  const { symbol, condition, targetPrice } = createAlertSchema.parse(req.body);

  const count = await prisma.alert.count({
    where: { userId: req.user!.userId, active: true },
  });
  if (count >= 50) {
    throw new AppError(400, 'Maximum 50 active alerts allowed');
  }

  const alert = await prisma.alert.create({
    data: {
      symbol,
      condition,
      targetPrice,
      userId: req.user!.userId,
    },
  });
  res.status(201).json({ alert });
});

// Toggle alert active/inactive
router.patch('/:id/toggle', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const alert = await prisma.alert.findFirst({
    where: { id, userId: req.user!.userId },
  });
  if (!alert) throw new AppError(404, 'Alert not found');

  const updated = await prisma.alert.update({
    where: { id },
    data: { active: !alert.active },
  });
  res.json({ alert: updated });
});

// Delete alert
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const alert = await prisma.alert.findFirst({
    where: { id, userId: req.user!.userId },
  });
  if (!alert) throw new AppError(404, 'Alert not found');

  await prisma.alert.delete({ where: { id } });
  res.json({ message: 'Alert deleted' });
});

// Delete all triggered alerts
router.delete('/triggered/clear', async (req: Request, res: Response) => {
  const result = await prisma.alert.deleteMany({
    where: { userId: req.user!.userId, triggered: true },
  });
  res.json({ deleted: result.count });
});

export default router;
