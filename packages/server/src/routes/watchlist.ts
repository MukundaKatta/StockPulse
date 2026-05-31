import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/database';
import { authenticate } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router = Router();
router.use(authenticate);

const createWatchlistSchema = z.object({
  name: z.string().min(1).max(100).default('My Watchlist'),
});

const addItemSchema = z.object({
  symbol: z.string().min(1).max(10).toUpperCase(),
  notes: z.string().optional(),
});

// List watchlists
router.get('/', async (req: Request, res: Response) => {
  const watchlists = await prisma.watchlist.findMany({
    where: { userId: req.user!.userId },
    include: { items: { orderBy: { addedAt: 'desc' } } },
  });
  res.json({ watchlists });
});

// Create watchlist
router.post('/', async (req: Request, res: Response) => {
  const { name } = createWatchlistSchema.parse(req.body);
  const watchlist = await prisma.watchlist.create({
    data: { name, userId: req.user!.userId },
  });
  res.status(201).json({ watchlist });
});

// Get watchlist
router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const watchlist = await prisma.watchlist.findFirst({
    where: { id, userId: req.user!.userId },
    include: { items: true },
  });
  if (!watchlist) throw new AppError(404, 'Watchlist not found');
  res.json({ watchlist });
});

// Rename watchlist
router.patch('/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { name } = z.object({ name: z.string().min(1).max(100) }).parse(req.body);
  const watchlist = await prisma.watchlist.findFirst({
    where: { id, userId: req.user!.userId },
  });
  if (!watchlist) throw new AppError(404, 'Watchlist not found');

  const updated = await prisma.watchlist.update({
    where: { id },
    data: { name },
  });
  res.json({ watchlist: updated });
});

// Delete watchlist
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const watchlist = await prisma.watchlist.findFirst({
    where: { id, userId: req.user!.userId },
  });
  if (!watchlist) throw new AppError(404, 'Watchlist not found');

  await prisma.watchlist.delete({ where: { id } });
  res.json({ message: 'Watchlist deleted' });
});

// Add item to watchlist
router.post('/:id/items', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const watchlist = await prisma.watchlist.findFirst({
    where: { id, userId: req.user!.userId },
  });
  if (!watchlist) throw new AppError(404, 'Watchlist not found');

  const { symbol, notes } = addItemSchema.parse(req.body);

  // Check for duplicate
  const existing = await prisma.watchlistItem.findFirst({
    where: { watchlistId: watchlist.id, symbol },
  });
  if (existing) throw new AppError(409, `${symbol} is already in this watchlist`);

  const item = await prisma.watchlistItem.create({
    data: { symbol, notes, watchlistId: watchlist.id },
  });
  res.status(201).json({ item });
});

// Remove item from watchlist
router.delete('/:id/items/:itemId', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const itemId = req.params.itemId as string;

  const watchlist = await prisma.watchlist.findFirst({
    where: { id, userId: req.user!.userId },
  });
  if (!watchlist) throw new AppError(404, 'Watchlist not found');

  const item = await prisma.watchlistItem.findFirst({
    where: { id: itemId, watchlistId: watchlist.id },
  });
  if (!item) throw new AppError(404, 'Item not found');

  await prisma.watchlistItem.delete({ where: { id: itemId } });
  res.json({ message: 'Item removed' });
});

export default router;
