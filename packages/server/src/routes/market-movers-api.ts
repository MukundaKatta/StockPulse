import { Router, Request, Response } from 'express';

interface MarketMover {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  averageVolume: number;
  marketCap: number;
  sector: string;
}

const gainers: MarketMover[] = [
  {
    symbol: 'SMCI',
    companyName: 'Super Micro Computer',
    price: 892.5,
    change: 78.4,
    changePercent: 9.63,
    volume: 42_500_000,
    averageVolume: 18_200_000,
    marketCap: 52_000_000_000,
    sector: 'Technology',
  },
  {
    symbol: 'MSTR',
    companyName: 'MicroStrategy Inc.',
    price: 1725.0,
    change: 128.5,
    changePercent: 8.05,
    volume: 15_800_000,
    averageVolume: 8_500_000,
    marketCap: 34_000_000_000,
    sector: 'Technology',
  },
  {
    symbol: 'PLTR',
    companyName: 'Palantir Technologies',
    price: 28.45,
    change: 1.92,
    changePercent: 7.24,
    volume: 88_200_000,
    averageVolume: 52_000_000,
    marketCap: 62_000_000_000,
    sector: 'Technology',
  },
  {
    symbol: 'RIVN',
    companyName: 'Rivian Automotive',
    price: 18.92,
    change: 1.15,
    changePercent: 6.48,
    volume: 35_200_000,
    averageVolume: 22_100_000,
    marketCap: 19_000_000_000,
    sector: 'Consumer Cyclical',
  },
  {
    symbol: 'COIN',
    companyName: 'Coinbase Global',
    price: 245.8,
    change: 14.3,
    changePercent: 6.17,
    volume: 22_000_000,
    averageVolume: 12_500_000,
    marketCap: 58_000_000_000,
    sector: 'Financials',
  },
];

const losers: MarketMover[] = [
  {
    symbol: 'NKLA',
    companyName: 'Nikola Corporation',
    price: 0.82,
    change: -0.15,
    changePercent: -15.46,
    volume: 95_000_000,
    averageVolume: 42_000_000,
    marketCap: 640_000_000,
    sector: 'Consumer Cyclical',
  },
  {
    symbol: 'SNAP',
    companyName: 'Snap Inc.',
    price: 11.45,
    change: -1.28,
    changePercent: -10.05,
    volume: 48_500_000,
    averageVolume: 25_000_000,
    marketCap: 18_500_000_000,
    sector: 'Technology',
  },
  {
    symbol: 'BYND',
    companyName: 'Beyond Meat',
    price: 5.82,
    change: -0.55,
    changePercent: -8.63,
    volume: 12_800_000,
    averageVolume: 6_200_000,
    marketCap: 375_000_000,
    sector: 'Consumer Staples',
  },
  {
    symbol: 'LCID',
    companyName: 'Lucid Group',
    price: 3.15,
    change: -0.27,
    changePercent: -7.89,
    volume: 55_000_000,
    averageVolume: 30_000_000,
    marketCap: 7_200_000_000,
    sector: 'Consumer Cyclical',
  },
  {
    symbol: 'HOOD',
    companyName: 'Robinhood Markets',
    price: 18.22,
    change: -1.35,
    changePercent: -6.90,
    volume: 28_000_000,
    averageVolume: 14_500_000,
    marketCap: 16_000_000_000,
    sector: 'Financials',
  },
];

const mostActive: MarketMover[] = [
  {
    symbol: 'NVDA',
    companyName: 'NVIDIA Corporation',
    price: 952.8,
    change: 15.4,
    changePercent: 1.64,
    volume: 285_000_000,
    averageVolume: 195_000_000,
    marketCap: 2_350_000_000_000,
    sector: 'Technology',
  },
  {
    symbol: 'TSLA',
    companyName: 'Tesla, Inc.',
    price: 245.3,
    change: -3.2,
    changePercent: -1.29,
    volume: 182_000_000,
    averageVolume: 125_000_000,
    marketCap: 785_000_000_000,
    sector: 'Consumer Cyclical',
  },
  {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    price: 198.5,
    change: 2.85,
    changePercent: 1.46,
    volume: 145_000_000,
    averageVolume: 85_000_000,
    marketCap: 3_020_000_000_000,
    sector: 'Technology',
  },
  {
    symbol: 'AMD',
    companyName: 'Advanced Micro Devices',
    price: 178.9,
    change: 5.6,
    changePercent: 3.23,
    volume: 125_000_000,
    averageVolume: 72_000_000,
    marketCap: 289_000_000_000,
    sector: 'Technology',
  },
  {
    symbol: 'AMZN',
    companyName: 'Amazon.com, Inc.',
    price: 192.4,
    change: 1.15,
    changePercent: 0.60,
    volume: 112_000_000,
    averageVolume: 62_000_000,
    marketCap: 2_000_000_000_000,
    sector: 'Consumer Cyclical',
  },
];

const router = Router();

router.get('/gainers', (req: Request, res: Response) => {
  const limit = Math.min(parseInt(req.query.limit as string, 10) || 10, 50);

  res.json({
    success: true,
    data: gainers.slice(0, limit),
    total: gainers.length,
    asOf: '2026-05-31T20:00:00Z',
  });
});

router.get('/losers', (req: Request, res: Response) => {
  const limit = Math.min(parseInt(req.query.limit as string, 10) || 10, 50);

  res.json({
    success: true,
    data: losers.slice(0, limit),
    total: losers.length,
    asOf: '2026-05-31T20:00:00Z',
  });
});

router.get('/most-active', (req: Request, res: Response) => {
  const limit = Math.min(parseInt(req.query.limit as string, 10) || 10, 50);

  res.json({
    success: true,
    data: mostActive.slice(0, limit),
    total: mostActive.length,
    asOf: '2026-05-31T20:00:00Z',
  });
});

export default router;
