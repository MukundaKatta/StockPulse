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
  date: z.string().transform((s) => {
    const d = new Date(s);
    if (isNaN(d.getTime())) throw new Error('Invalid date');
    return d;
  }),
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
      // Subtract cost at average cost basis, not at sale price
      const avgCost = h.quantity > 0 ? h.totalCost / h.quantity : 0;
      h.quantity -= trade.quantity;
      h.totalCost = Math.max(0, h.totalCost - trade.quantity * avgCost);
    }
    h.totalFees += trade.fee;
  }

  const holdingsList = Object.values(holdings)
    .filter((h) => h.quantity > 0.0001)
    .map((h) => ({
      ...h,
      avgCost: h.quantity > 0 ? h.totalCost / h.quantity : 0,
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

  // Validate date is not in the future
  if (data.date > new Date()) {
    throw new AppError(400, 'Trade date cannot be in the future');
  }

  // Use transaction to prevent race condition on sell validation
  const trade = await prisma.$transaction(async (tx) => {
    if (data.type === 'SELL') {
      const existingTrades = await tx.trade.findMany({
        where: { portfolioId: portfolio.id, symbol: data.symbol },
      });
      let currentQty = 0;
      for (const t of existingTrades) {
        currentQty += t.type === 'BUY' ? t.quantity : -t.quantity;
      }
      if (data.quantity > currentQty) {
        throw new AppError(400, `Cannot sell ${data.quantity} shares — only ${currentQty.toFixed(4)} held`);
      }
    }

    return tx.trade.create({
      data: { ...data, portfolioId: portfolio.id },
    });
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

  // Verify trade belongs to this portfolio
  const trade = await prisma.trade.findFirst({
    where: { id: tradeId, portfolioId: portfolio.id },
  });
  if (!trade) throw new AppError(404, 'Trade not found');

  await prisma.trade.delete({ where: { id: tradeId } });
  res.json({ message: 'Trade deleted' });
});

export default router;
