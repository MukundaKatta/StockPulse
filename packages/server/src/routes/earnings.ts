import { Router, Request, Response } from 'express';

const router = Router();

interface EarningsResult {
  symbol: string;
  date: string;
  quarter: string;
  epsEstimate: number;
  epsActual: number | null;
  surprise: number | null;
  revenueEstimate: number;
  revenueActual: number | null;
}

const EARNINGS_DATA: Record<string, EarningsResult[]> = {
  AAPL: [
    { symbol: 'AAPL', date: '2024-01-25', quarter: 'Q1 2024', epsEstimate: 2.10, epsActual: 2.18, surprise: 3.8, revenueEstimate: 117.9e9, revenueActual: 119.6e9 },
    { symbol: 'AAPL', date: '2023-10-26', quarter: 'Q4 2023', epsEstimate: 1.39, epsActual: 1.46, surprise: 5.0, revenueEstimate: 89.3e9, revenueActual: 89.5e9 },
    { symbol: 'AAPL', date: '2023-08-03', quarter: 'Q3 2023', epsEstimate: 1.19, epsActual: 1.26, surprise: 5.9, revenueEstimate: 81.7e9, revenueActual: 81.8e9 },
  ],
  MSFT: [
    { symbol: 'MSFT', date: '2024-01-30', quarter: 'Q2 2024', epsEstimate: 2.78, epsActual: null, surprise: null, revenueEstimate: 61.1e9, revenueActual: null },
    { symbol: 'MSFT', date: '2023-10-24', quarter: 'Q1 2024', epsEstimate: 2.65, epsActual: 2.99, surprise: 12.8, revenueEstimate: 54.5e9, revenueActual: 56.5e9 },
  ],
  NVDA: [
    { symbol: 'NVDA', date: '2024-02-21', quarter: 'Q4 2024', epsEstimate: 4.59, epsActual: null, surprise: null, revenueEstimate: 20.4e9, revenueActual: null },
    { symbol: 'NVDA', date: '2023-11-21', quarter: 'Q3 2024', epsEstimate: 3.36, epsActual: 4.02, surprise: 19.6, revenueEstimate: 16.2e9, revenueActual: 18.1e9 },
  ],
};

router.get('/upcoming', (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 20;
  const upcoming = Object.values(EARNINGS_DATA)
    .flat()
    .filter((e) => e.epsActual === null)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);

  res.json({ success: true, data: upcoming });
});

router.get('/recent', (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 20;
  const recent = Object.values(EARNINGS_DATA)
    .flat()
    .filter((e) => e.epsActual !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);

  res.json({ success: true, data: recent });
});

router.get('/:symbol', (req: Request, res: Response) => {
  const symbol = req.params.symbol.toUpperCase();
  const data = EARNINGS_DATA[symbol];
  if (!data) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: `No earnings data for ${symbol}` } });
    return;
  }
  res.json({ success: true, data });
});

export default router;
