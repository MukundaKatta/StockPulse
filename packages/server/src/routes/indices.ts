import { Router, Request, Response } from 'express';

const router = Router();

interface Index {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePct: number;
  ytdReturn: number;
  region: string;
}

const INDICES: Index[] = [
  { symbol: 'SPX', name: 'S&P 500', value: 5026.61, change: 40.83, changePct: 0.82, ytdReturn: 5.4, region: 'US' },
  { symbol: 'DJI', name: 'Dow Jones', value: 38726.33, change: 134.58, changePct: 0.35, ytdReturn: 2.8, region: 'US' },
  { symbol: 'IXIC', name: 'Nasdaq Composite', value: 15793.72, change: 179.62, changePct: 1.15, ytdReturn: 8.2, region: 'US' },
  { symbol: 'RUT', name: 'Russell 2000', value: 2002.15, change: -8.42, changePct: -0.42, ytdReturn: -2.1, region: 'US' },
  { symbol: 'FTSE', name: 'FTSE 100', value: 7632.45, change: 28.50, changePct: 0.37, ytdReturn: -0.8, region: 'Europe' },
  { symbol: 'DAX', name: 'DAX', value: 16928.35, change: 85.20, changePct: 0.51, ytdReturn: 1.2, region: 'Europe' },
  { symbol: 'N225', name: 'Nikkei 225', value: 36897.42, change: 452.80, changePct: 1.24, ytdReturn: 10.5, region: 'Asia' },
  { symbol: 'HSI', name: 'Hang Seng', value: 15946.82, change: -125.40, changePct: -0.78, ytdReturn: -8.2, region: 'Asia' },
  { symbol: 'SHCOMP', name: 'Shanghai Composite', value: 2865.90, change: 12.45, changePct: 0.44, ytdReturn: -3.5, region: 'Asia' },
  { symbol: 'VIX', name: 'CBOE Volatility', value: 13.85, change: -0.72, changePct: -4.94, ytdReturn: -12.8, region: 'Volatility' },
];

router.get('/', (_req: Request, res: Response) => {
  res.json({ success: true, data: INDICES });
});

router.get('/region/:region', (req: Request, res: Response) => {
  const region = req.params.region;
  const filtered = INDICES.filter((i) => i.region.toLowerCase() === region.toLowerCase());
  res.json({ success: true, data: filtered });
});

router.get('/:symbol', (req: Request, res: Response) => {
  const symbol = req.params.symbol.toUpperCase();
  const index = INDICES.find((i) => i.symbol === symbol);
  if (!index) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: `Index ${symbol} not found` } });
    return;
  }
  res.json({ success: true, data: index });
});

export default router;
