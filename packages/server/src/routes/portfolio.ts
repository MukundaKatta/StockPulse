import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/database';
import { authenticate } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router = Router();
router.use(authenticate);

const createPortfolioSchema = z.object({
  name: z.string().min(1).max(100).default('My Portfolio'),
});

const createTradeSchema = z.object({
  symbol: z.string().min(1).max(10).toUpperCase(),
  type: z.enum(['BUY', 'SELL']),
  quantity: z.number().positive(),
  price: z.number().positive(),
  fee: z.number().min(0).default(0),
  date: z.string().transform((s) => new Date(s)),
  notes: z.string().optional(),
});

// List portfolios
router.get('/', async (req: Request, res: Response) => {
  const portfolios = await prisma.portfolio.findMany({
    where: { userId: req.user!.userId },
    include: { trades: { orderBy: { date: 'desc' } } },
  });
  res.json({ portfolios });
});

// Create portfolio
router.post('/', async (req: Request, res: Response) => {
  const { name } = createPortfolioSchema.parse(req.body);
  const portfolio = await prisma.portfolio.create({
    data: { name, userId: req.user!.userId },
  });
  res.status(201).json({ portfolio });
});

// Get portfolio with holdings
router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const portfolio = await prisma.portfolio.findFirst({
    where: { id, userId: req.user!.userId },
    include: { trades: { orderBy: { date: 'desc' } } },
  });
  if (!portfolio) throw new AppError(404, 'Portfolio not found');

  // Calculate holdings
  const holdings: Record<string, { symbol: string; quantity: number; totalCost: number; totalFees: number }> = {};
  for (const trade of portfolio.trades) {
    if (!holdings[trade.symbol]) {
      holdings[trade.symbol] = { symbol: trade.symbol, quantity: 0, totalCost: 0, totalFees: 0 };
    }
    const h = holdings[trade.symbol];
    if (trade.type === 'BUY') {
      h.quantity += trade.quantity;
      h.totalCost += trade.quantity * trade.price;
    } else {
      h.quantity -= trade.quantity;
      h.totalCost -= trade.quantity * trade.price;
    }
    h.totalFees += trade.fee;
  }

  const holdingsList = Object.values(holdings)
    .filter((h) => h.quantity > 0)
    .map((h) => ({
      ...h,
      avgCost: h.totalCost / h.quantity,
    }));

  res.json({ portfolio, holdings: holdingsList });
});

// Delete portfolio
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const portfolio = await prisma.portfolio.findFirst({
    where: { id, userId: req.user!.userId },
  });
  if (!portfolio) throw new AppError(404, 'Portfolio not found');

  await prisma.portfolio.delete({ where: { id } });
  res.json({ message: 'Portfolio deleted' });
});

// Add trade
router.post('/:id/trades', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const portfolio = await prisma.portfolio.findFirst({
    where: { id, userId: req.user!.userId },
  });
  if (!portfolio) throw new AppError(404, 'Portfolio not found');

  const data = createTradeSchema.parse(req.body);
  const trade = await prisma.trade.create({
    data: { ...data, portfolioId: portfolio.id },
  });
  res.status(201).json({ trade });
});

// Delete trade
router.delete('/:id/trades/:tradeId', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const tradeId = req.params.tradeId as string;
  const portfolio = await prisma.portfolio.findFirst({
    where: { id, userId: req.user!.userId },
  });
  if (!portfolio) throw new AppError(404, 'Portfolio not found');

  await prisma.trade.delete({ where: { id: tradeId } });
  res.json({ message: 'Trade deleted' });
});

export default router;
