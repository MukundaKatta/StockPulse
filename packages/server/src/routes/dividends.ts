import { Router, Request, Response } from 'express';

const router = Router();

interface DividendRecord {
  symbol: string;
  exDate: string;
  payDate: string;
  amount: number;
  frequency: 'quarterly' | 'monthly' | 'annual' | 'semi-annual';
  yield: number;
}

const DIVIDENDS: Record<string, DividendRecord[]> = {
  AAPL: [
    { symbol: 'AAPL', exDate: '2024-02-09', payDate: '2024-02-15', amount: 0.24, frequency: 'quarterly', yield: 0.52 },
    { symbol: 'AAPL', exDate: '2023-11-10', payDate: '2023-11-16', amount: 0.24, frequency: 'quarterly', yield: 0.52 },
    { symbol: 'AAPL', exDate: '2023-08-11', payDate: '2023-08-17', amount: 0.24, frequency: 'quarterly', yield: 0.52 },
    { symbol: 'AAPL', exDate: '2023-05-12', payDate: '2023-05-18', amount: 0.24, frequency: 'quarterly', yield: 0.52 },
  ],
  MSFT: [
    { symbol: 'MSFT', exDate: '2024-02-14', payDate: '2024-03-14', amount: 0.75, frequency: 'quarterly', yield: 0.72 },
    { symbol: 'MSFT', exDate: '2023-11-15', payDate: '2023-12-14', amount: 0.75, frequency: 'quarterly', yield: 0.72 },
  ],
  JPM: [
    { symbol: 'JPM', exDate: '2024-01-05', payDate: '2024-01-31', amount: 1.05, frequency: 'quarterly', yield: 2.35 },
    { symbol: 'JPM', exDate: '2023-10-06', payDate: '2023-10-31', amount: 1.05, frequency: 'quarterly', yield: 2.35 },
  ],
  O: [
    { symbol: 'O', exDate: '2024-01-31', payDate: '2024-02-15', amount: 0.2565, frequency: 'monthly', yield: 5.42 },
    { symbol: 'O', exDate: '2024-01-02', payDate: '2024-01-12', amount: 0.2565, frequency: 'monthly', yield: 5.42 },
  ],
};

router.get('/upcoming', (_req: Request, res: Response) => {
  const all = Object.values(DIVIDENDS).flat();
  const upcoming = all
    .filter((d) => new Date(d.exDate) >= new Date('2024-01-01'))
    .sort((a, b) => a.exDate.localeCompare(b.exDate));
  res.json({ success: true, data: upcoming });
});

router.get('/:symbol', (req: Request, res: Response) => {
  const symbol = req.params.symbol.toUpperCase();
  const records = DIVIDENDS[symbol];
  if (!records) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: `No dividend data for ${symbol}` } });
    return;
  }

  const annualDividend = records.slice(0, 4).reduce((s, d) => s + d.amount, 0);
  const latestYield = records[0]?.yield || 0;

  res.json({
    success: true,
    data: {
      symbol,
      annualDividend,
      yield: latestYield,
      frequency: records[0]?.frequency,
      history: records,
    },
  });
});

router.get('/:symbol/growth', (req: Request, res: Response) => {
  const symbol = req.params.symbol.toUpperCase();
  const growth = [
    { year: 2020, dividend: 3.28, growth: 6.5 },
    { year: 2021, dividend: 3.44, growth: 4.9 },
    { year: 2022, dividend: 3.64, growth: 5.8 },
    { year: 2023, dividend: 3.84, growth: 5.5 },
    { year: 2024, dividend: 4.00, growth: 4.2 },
  ];
  res.json({ success: true, data: { symbol, growth } });
});

export default router;
