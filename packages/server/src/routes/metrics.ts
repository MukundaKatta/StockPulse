import { Router, Request, Response } from 'express';
import { prisma } from '../config/database';
import { redis } from '../config/redis';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

// Get app metrics/stats
router.get('/', async (req: Request, res: Response) => {
  const userId = req.user!.userId;

  const [portfolioCount, tradeCount, watchlistCount, alertCount, cacheStats] = await Promise.all([
    prisma.portfolio.count({ where: { userId } }),
    prisma.trade.count({ where: { portfolio: { userId } } }),
    prisma.watchlist.count({ where: { userId } }),
    prisma.alert.count({ where: { userId } }),
    redis.dbsize(),
  ]);

  const activeAlerts = await prisma.alert.count({ where: { userId, active: true } });
  const triggeredAlerts = await prisma.alert.count({ where: { userId, triggered: true } });

  res.json({
    user: {
      portfolios: portfolioCount,
      trades: tradeCount,
      watchlists: watchlistCount,
      alerts: alertCount,
      activeAlerts,
      triggeredAlerts,
    },
    system: {
      cacheKeys: cacheStats,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage().heapUsed,
    },
  });
});

// Get trade activity summary (last 30 days)
router.get('/activity', async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentTrades = await prisma.trade.findMany({
    where: {
      portfolio: { userId },
      createdAt: { gte: thirtyDaysAgo },
    },
    orderBy: { date: 'desc' },
    select: { symbol: true, type: true, quantity: true, price: true, date: true },
  });

  const symbolCounts: Record<string, number> = {};
  let totalBuyValue = 0;
  let totalSellValue = 0;

  for (const trade of recentTrades) {
    symbolCounts[trade.symbol] = (symbolCounts[trade.symbol] || 0) + 1;
    const value = trade.quantity * trade.price;
    if (trade.type === 'BUY') totalBuyValue += value;
    else totalSellValue += value;
  }

  const topSymbols = Object.entries(symbolCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([symbol, count]) => ({ symbol, count }));

  res.json({
    totalTrades: recentTrades.length,
    totalBuyValue,
    totalSellValue,
    netFlow: totalBuyValue - totalSellValue,
    topSymbols,
    period: '30d',
  });
});

export default router;
