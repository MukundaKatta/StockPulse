import { Router, Request, Response } from 'express';

const router = Router();

router.get('/daily', (req: Request, res: Response) => {
  res.json({
    report: {
      type: 'daily',
      date: new Date().toISOString().slice(0, 10),
      summary: {
        totalTrades: 42,
        profitLoss: 1250.75,
        winRate: 0.64,
        topGainer: { symbol: 'AAPL', change: 3.2 },
        topLoser: { symbol: 'TSLA', change: -1.8 },
      },
      generatedAt: new Date().toISOString(),
    },
  });
});

router.get('/weekly', (req: Request, res: Response) => {
  res.json({
    report: {
      type: 'weekly',
      weekEnding: new Date().toISOString().slice(0, 10),
      summary: {
        totalTrades: 187,
        profitLoss: 4820.30,
        winRate: 0.58,
        bestDay: 'Monday',
        worstDay: 'Wednesday',
        averageDailyVolume: 37,
      },
      generatedAt: new Date().toISOString(),
    },
  });
});

router.get('/portfolio', (req: Request, res: Response) => {
  res.json({
    report: {
      type: 'portfolio',
      totalValue: 125400.50,
      totalCost: 110200.00,
      unrealizedPL: 15200.50,
      realizedPL: 8450.25,
      holdings: [
        { symbol: 'AAPL', shares: 50, avgCost: 172.30, currentPrice: 185.40 },
        { symbol: 'GOOGL', shares: 20, avgCost: 140.50, currentPrice: 152.10 },
        { symbol: 'MSFT', shares: 35, avgCost: 380.00, currentPrice: 410.25 },
      ],
      generatedAt: new Date().toISOString(),
    },
  });
});

export default router;
