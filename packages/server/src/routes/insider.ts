import { Router, Request, Response } from 'express';

const router = Router();

interface InsiderTrade {
  symbol: string;
  insider: string;
  title: string;
  type: 'Buy' | 'Sell' | 'Exercise';
  shares: number;
  price: number;
  value: number;
  date: string;
}

const TRADES: InsiderTrade[] = [
  { symbol: 'AAPL', insider: 'Tim Cook', title: 'CEO', type: 'Sell', shares: 511000, price: 185.50, value: 94.8e6, date: '2024-02-01' },
  { symbol: 'NVDA', insider: 'Jensen Huang', title: 'CEO', type: 'Sell', shares: 120000, price: 850.20, value: 102.0e6, date: '2024-02-05' },
  { symbol: 'JPM', insider: 'Jamie Dimon', title: 'CEO', type: 'Sell', shares: 821000, price: 182.40, value: 149.8e6, date: '2024-01-22' },
  { symbol: 'META', insider: 'Mark Zuckerberg', title: 'CEO', type: 'Sell', shares: 185000, price: 470.80, value: 87.1e6, date: '2024-02-06' },
  { symbol: 'TSLA', insider: 'Elon Musk', title: 'CEO', type: 'Sell', shares: 750000, price: 192.50, value: 144.4e6, date: '2024-01-15' },
  { symbol: 'BAC', insider: 'Brian Moynihan', title: 'CEO', type: 'Buy', shares: 50000, price: 33.80, value: 1.69e6, date: '2024-02-08' },
  { symbol: 'GS', insider: 'David Solomon', title: 'CEO', type: 'Buy', shares: 25000, price: 385.20, value: 9.63e6, date: '2024-02-07' },
  { symbol: 'DIS', insider: 'Bob Iger', title: 'CEO', type: 'Buy', shares: 30000, price: 98.50, value: 2.96e6, date: '2024-02-03' },
];

router.get('/', (_req: Request, res: Response) => {
  const limit = 20;
  const sorted = [...TRADES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
  res.json({ success: true, data: sorted });
});

router.get('/buys', (_req: Request, res: Response) => {
  const buys = TRADES.filter((t) => t.type === 'Buy').sort((a, b) => b.date.localeCompare(a.date));
  res.json({ success: true, data: buys });
});

router.get('/sells', (_req: Request, res: Response) => {
  const sells = TRADES.filter((t) => t.type === 'Sell').sort((a, b) => b.date.localeCompare(a.date));
  res.json({ success: true, data: sells });
});

router.get('/:symbol', (req: Request, res: Response) => {
  const symbol = req.params.symbol.toUpperCase();
  const trades = TRADES.filter((t) => t.symbol === symbol);
  if (trades.length === 0) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: `No insider data for ${symbol}` } });
    return;
  }
  res.json({ success: true, data: trades });
});

export default router;
