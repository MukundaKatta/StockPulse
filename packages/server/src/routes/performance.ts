import { Router, Request, Response } from 'express';

const router = Router();

interface PerformanceData {
  symbol: string;
  name: string;
  returns: {
    '1d': number;
    '1w': number;
    '1m': number;
    '3m': number;
    '6m': number;
    ytd: number;
    '1y': number;
  };
  volatility: number;
  sharpe: number;
  maxDrawdown: number;
}

const PERFORMANCE: PerformanceData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', returns: { '1d': 4.2, '1w': 8.5, '1m': 22.4, '3m': 45.2, '6m': 68.4, ytd: 42.8, '1y': 218.5 }, volatility: 48.2, sharpe: 2.85, maxDrawdown: -18.4 },
  { symbol: 'META', name: 'Meta', returns: { '1d': 1.9, '1w': 5.2, '1m': 12.8, '3m': 28.4, '6m': 42.1, ytd: 35.2, '1y': 168.4 }, volatility: 32.5, sharpe: 2.42, maxDrawdown: -14.2 },
  { symbol: 'AAPL', name: 'Apple', returns: { '1d': 0.82, '1w': 2.1, '1m': 4.5, '3m': 8.2, '6m': 12.4, ytd: 8.5, '1y': 28.4 }, volatility: 22.4, sharpe: 1.24, maxDrawdown: -12.8 },
  { symbol: 'MSFT', name: 'Microsoft', returns: { '1d': 0.5, '1w': 1.8, '1m': 5.2, '3m': 12.1, '6m': 18.5, ytd: 14.2, '1y': 52.8 }, volatility: 18.2, sharpe: 1.82, maxDrawdown: -10.5 },
  { symbol: 'TSLA', name: 'Tesla', returns: { '1d': -2.1, '1w': -5.4, '1m': -12.8, '3m': -22.4, '6m': -28.5, ytd: -24.2, '1y': -18.5 }, volatility: 62.8, sharpe: -0.42, maxDrawdown: -42.5 },
];

router.get('/', (_req: Request, res: Response) => {
  res.json({ performance: PERFORMANCE });
});

router.get('/:symbol', (req: Request, res: Response) => {
  const data = PERFORMANCE.find((p) => p.symbol.toLowerCase() === req.params.symbol.toLowerCase());
  if (!data) {
    res.status(404).json({ error: 'Performance data not found' });
    return;
  }
  res.json({ performance: data });
});

export default router;
