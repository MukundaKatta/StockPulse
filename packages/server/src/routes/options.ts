import { Router, Request, Response } from 'express';

const router = Router();

interface OptionContract {
  symbol: string;
  expiry: string;
  strike: number;
  type: 'call' | 'put';
  bid: number;
  ask: number;
  last: number;
  volume: number;
  openInterest: number;
  iv: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
}

const CHAIN: OptionContract[] = [
  { symbol: 'AAPL', expiry: '2024-03-15', strike: 175, type: 'call', bid: 12.20, ask: 12.40, last: 12.30, volume: 8500, openInterest: 42500, iv: 0.245, delta: 0.82, gamma: 0.018, theta: -0.08, vega: 0.18 },
  { symbol: 'AAPL', expiry: '2024-03-15', strike: 180, type: 'call', bid: 8.10, ask: 8.30, last: 8.20, volume: 12200, openInterest: 58400, iv: 0.235, delta: 0.72, gamma: 0.025, theta: -0.10, vega: 0.22 },
  { symbol: 'AAPL', expiry: '2024-03-15', strike: 185, type: 'call', bid: 4.40, ask: 4.60, last: 4.50, volume: 18500, openInterest: 72100, iv: 0.224, delta: 0.55, gamma: 0.032, theta: -0.12, vega: 0.24 },
  { symbol: 'AAPL', expiry: '2024-03-15', strike: 190, type: 'call', bid: 1.75, ask: 1.85, last: 1.80, volume: 22400, openInterest: 85200, iv: 0.218, delta: 0.35, gamma: 0.035, theta: -0.11, vega: 0.22 },
  { symbol: 'AAPL', expiry: '2024-03-15', strike: 195, type: 'call', bid: 0.55, ask: 0.60, last: 0.58, volume: 15800, openInterest: 62400, iv: 0.215, delta: 0.18, gamma: 0.028, theta: -0.08, vega: 0.16 },
  { symbol: 'AAPL', expiry: '2024-03-15', strike: 175, type: 'put', bid: 0.85, ask: 0.95, last: 0.90, volume: 5200, openInterest: 28500, iv: 0.248, delta: -0.18, gamma: 0.018, theta: -0.06, vega: 0.18 },
  { symbol: 'AAPL', expiry: '2024-03-15', strike: 180, type: 'put', bid: 1.80, ask: 1.95, last: 1.88, volume: 8800, openInterest: 38200, iv: 0.238, delta: -0.28, gamma: 0.025, theta: -0.08, vega: 0.22 },
  { symbol: 'AAPL', expiry: '2024-03-15', strike: 185, type: 'put', bid: 3.10, ask: 3.25, last: 3.18, volume: 14500, openInterest: 52800, iv: 0.228, delta: -0.45, gamma: 0.032, theta: -0.10, vega: 0.24 },
  { symbol: 'AAPL', expiry: '2024-03-15', strike: 190, type: 'put', bid: 5.45, ask: 5.60, last: 5.52, volume: 10200, openInterest: 45600, iv: 0.222, delta: -0.65, gamma: 0.035, theta: -0.09, vega: 0.22 },
  { symbol: 'AAPL', expiry: '2024-03-15', strike: 195, type: 'put', bid: 9.20, ask: 9.40, last: 9.30, volume: 6500, openInterest: 32100, iv: 0.220, delta: -0.82, gamma: 0.028, theta: -0.06, vega: 0.16 },
];

router.get('/chain/:symbol', (req: Request, res: Response) => {
  const symbol = req.params.symbol.toUpperCase();
  const type = req.query.type as string | undefined;
  let filtered = CHAIN.filter((o) => o.symbol === symbol);
  if (type === 'call' || type === 'put') filtered = filtered.filter((o) => o.type === type);
  if (filtered.length === 0) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: `No options data for ${symbol}` } });
    return;
  }
  res.json({ success: true, data: filtered });
});

router.get('/expirations/:symbol', (req: Request, res: Response) => {
  const symbol = req.params.symbol.toUpperCase();
  const expirations = [...new Set(CHAIN.filter((o) => o.symbol === symbol).map((o) => o.expiry))];
  res.json({ success: true, data: expirations });
});

export default router;
