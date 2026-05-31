import { Router, Request, Response } from 'express';

const router = Router();

interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  volume: number;
}

interface MarketMover {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

const INDICES: MarketIndex[] = [
  { symbol: '^GSPC', name: 'S&P 500', value: 4783.83, change: 26.64, changePercent: 0.56, volume: 3200000000 },
  { symbol: '^DJI', name: 'Dow Jones', value: 37468.61, change: 115.80, changePercent: 0.31, volume: 285000000 },
  { symbol: '^IXIC', name: 'Nasdaq', value: 15055.65, change: 110.50, changePercent: 0.74, volume: 4500000000 },
  { symbol: '^RUT', name: 'Russell 2000', value: 2012.75, change: -8.50, changePercent: -0.42, volume: 1800000000 },
  { symbol: '^VIX', name: 'VIX', value: 13.45, change: -0.32, changePercent: -2.33, volume: 0 },
];

router.get('/indices', (_req: Request, res: Response) => {
  res.json({ success: true, data: INDICES });
});

router.get('/gainers', (_req: Request, res: Response) => {
  const gainers: MarketMover[] = [
    { symbol: 'SMCI', name: 'Super Micro', price: 284.50, change: 32.15, changePercent: 12.74, volume: 45000000 },
    { symbol: 'MARA', name: 'Marathon Digital', price: 22.85, change: 2.10, changePercent: 10.12, volume: 32000000 },
    { symbol: 'COIN', name: 'Coinbase', price: 174.20, change: 14.30, changePercent: 8.95, volume: 28000000 },
    { symbol: 'PLTR', name: 'Palantir', price: 18.90, change: 1.45, changePercent: 8.31, volume: 55000000 },
    { symbol: 'RIVN', name: 'Rivian', price: 18.45, change: 1.25, changePercent: 7.27, volume: 38000000 },
  ];
  res.json({ success: true, data: gainers });
});

router.get('/losers', (_req: Request, res: Response) => {
  const losers: MarketMover[] = [
    { symbol: 'WBA', name: 'Walgreens', price: 25.80, change: -3.20, changePercent: -11.03, volume: 42000000 },
    { symbol: 'PARA', name: 'Paramount', price: 14.50, change: -1.45, changePercent: -9.09, volume: 18000000 },
    { symbol: 'AAL', name: 'American Airlines', price: 13.20, change: -1.05, changePercent: -7.37, volume: 25000000 },
    { symbol: 'SNAP', name: 'Snap Inc', price: 16.80, change: -1.15, changePercent: -6.41, volume: 22000000 },
    { symbol: 'NIO', name: 'NIO Inc', price: 7.85, change: -0.50, changePercent: -5.99, volume: 48000000 },
  ];
  res.json({ success: true, data: losers });
});

router.get('/most-active', (_req: Request, res: Response) => {
  const active: MarketMover[] = [
    { symbol: 'TSLA', name: 'Tesla', price: 248.50, change: 5.80, changePercent: 2.39, volume: 125000000 },
    { symbol: 'AAPL', name: 'Apple', price: 185.92, change: 1.20, changePercent: 0.65, volume: 68000000 },
    { symbol: 'AMD', name: 'AMD', price: 141.80, change: 3.45, changePercent: 2.49, volume: 62000000 },
    { symbol: 'NVDA', name: 'NVIDIA', price: 547.10, change: 12.80, changePercent: 2.40, volume: 58000000 },
    { symbol: 'PLTR', name: 'Palantir', price: 18.90, change: 1.45, changePercent: 8.31, volume: 55000000 },
  ];
  res.json({ success: true, data: active });
});

router.get('/quote/:symbol', (req: Request, res: Response) => {
  const symbol = req.params.symbol.toUpperCase();
  const quotes: Record<string, object> = {
    AAPL: { symbol: 'AAPL', name: 'Apple Inc.', price: 185.92, change: 1.20, changePercent: 0.65, open: 184.50, high: 186.80, low: 184.10, volume: 68000000, marketCap: 2890000000000, pe: 30.2, eps: 6.16 },
    MSFT: { symbol: 'MSFT', name: 'Microsoft Corp', price: 388.47, change: 4.20, changePercent: 1.09, open: 385.00, high: 389.50, low: 384.20, volume: 22000000, marketCap: 2890000000000, pe: 36.5, eps: 10.64 },
    GOOGL: { symbol: 'GOOGL', name: 'Alphabet Inc', price: 141.80, change: 1.50, changePercent: 1.07, open: 140.50, high: 142.30, low: 140.10, volume: 25000000, marketCap: 1780000000000, pe: 24.8, eps: 5.72 },
  };

  const quote = quotes[symbol];
  if (!quote) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: `Quote not found for ${symbol}` } });
    return;
  }

  res.json({ success: true, data: quote });
});

export default router;
