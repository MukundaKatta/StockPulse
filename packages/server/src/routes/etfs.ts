import { Router, Request, Response } from 'express';

const router = Router();

interface ETF {
  symbol: string;
  name: string;
  price: number;
  change: number;
  aum: number;
  expenseRatio: number;
  category: string;
  holdings: number;
}

const ETFS: ETF[] = [
  { symbol: 'SPY', name: 'SPDR S&P 500', price: 502.45, change: 0.82, aum: 498e9, expenseRatio: 0.0945, category: 'Large Blend', holdings: 503 },
  { symbol: 'QQQ', name: 'Invesco Nasdaq 100', price: 432.10, change: 1.15, aum: 248e9, expenseRatio: 0.20, category: 'Large Growth', holdings: 101 },
  { symbol: 'IWM', name: 'iShares Russell 2000', price: 198.35, change: -0.42, aum: 62e9, expenseRatio: 0.19, category: 'Small Blend', holdings: 1978 },
  { symbol: 'VTI', name: 'Vanguard Total Market', price: 252.80, change: 0.65, aum: 380e9, expenseRatio: 0.03, category: 'Large Blend', holdings: 3945 },
  { symbol: 'VXUS', name: 'Vanguard Intl', price: 56.20, change: -0.28, aum: 68e9, expenseRatio: 0.07, category: 'Foreign Blend', holdings: 8145 },
  { symbol: 'BND', name: 'Vanguard Total Bond', price: 72.45, change: 0.12, aum: 104e9, expenseRatio: 0.03, category: 'Bonds', holdings: 10702 },
  { symbol: 'GLD', name: 'SPDR Gold Trust', price: 188.90, change: 0.45, aum: 58e9, expenseRatio: 0.40, category: 'Commodities', holdings: 1 },
  { symbol: 'XLK', name: 'Tech Select SPDR', price: 204.55, change: 1.28, aum: 62e9, expenseRatio: 0.10, category: 'Technology', holdings: 65 },
];

router.get('/', (_req: Request, res: Response) => {
  res.json({ success: true, data: ETFS });
});

router.get('/category/:category', (req: Request, res: Response) => {
  const category = req.params.category.toLowerCase();
  const filtered = ETFS.filter((e) => e.category.toLowerCase().includes(category));
  res.json({ success: true, data: filtered });
});

router.get('/:symbol', (req: Request, res: Response) => {
  const symbol = req.params.symbol.toUpperCase();
  const etf = ETFS.find((e) => e.symbol === symbol);
  if (!etf) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: `ETF ${symbol} not found` } });
    return;
  }
  res.json({ success: true, data: etf });
});

export default router;
