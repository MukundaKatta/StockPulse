import { Router, Request, Response } from 'express';

interface StockFundamentals {
  symbol: string;
  companyName: string;
  sector: string;
  industry: string;
  marketCap: number;
  enterpriseValue: number;
  peRatio: number;
  forwardPE: number;
  pbRatio: number;
  psRatio: number;
  pegRatio: number;
  evToEbitda: number;
  dividendYield: number;
  eps: number;
  epsGrowthYoY: number;
  revenueGrowthYoY: number;
  grossMargin: number;
  operatingMargin: number;
  netMargin: number;
  roe: number;
  roa: number;
  debtToEquity: number;
  currentRatio: number;
  quickRatio: number;
  freeCashFlow: number;
  sharesOutstanding: number;
  beta: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  lastUpdated: string;
}

const fundamentalsStore = new Map<string, StockFundamentals>([
  [
    'AAPL',
    {
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      sector: 'Technology',
      industry: 'Consumer Electronics',
      marketCap: 3_020_000_000_000,
      enterpriseValue: 3_050_000_000_000,
      peRatio: 31.2,
      forwardPE: 28.5,
      pbRatio: 48.7,
      psRatio: 8.1,
      pegRatio: 2.45,
      evToEbitda: 24.8,
      dividendYield: 0.52,
      eps: 6.35,
      epsGrowthYoY: 9.2,
      revenueGrowthYoY: 5.8,
      grossMargin: 46.2,
      operatingMargin: 31.5,
      netMargin: 25.3,
      roe: 157.8,
      roa: 28.3,
      debtToEquity: 1.87,
      currentRatio: 1.07,
      quickRatio: 0.84,
      freeCashFlow: 110_500_000_000,
      sharesOutstanding: 15_330_000_000,
      beta: 1.24,
      fiftyTwoWeekHigh: 210.5,
      fiftyTwoWeekLow: 164.08,
      lastUpdated: '2026-05-31T20:00:00Z',
    },
  ],
  [
    'MSFT',
    {
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      sector: 'Technology',
      industry: 'Software - Infrastructure',
      marketCap: 3_180_000_000_000,
      enterpriseValue: 3_200_000_000_000,
      peRatio: 35.8,
      forwardPE: 30.2,
      pbRatio: 13.1,
      psRatio: 13.9,
      pegRatio: 2.15,
      evToEbitda: 27.3,
      dividendYield: 0.71,
      eps: 11.95,
      epsGrowthYoY: 14.5,
      revenueGrowthYoY: 12.8,
      grossMargin: 69.4,
      operatingMargin: 44.7,
      netMargin: 36.2,
      roe: 39.2,
      roa: 19.8,
      debtToEquity: 0.42,
      currentRatio: 1.77,
      quickRatio: 1.54,
      freeCashFlow: 74_200_000_000,
      sharesOutstanding: 7_430_000_000,
      beta: 0.89,
      fiftyTwoWeekHigh: 445.3,
      fiftyTwoWeekLow: 362.9,
      lastUpdated: '2026-05-31T20:00:00Z',
    },
  ],
  [
    'GOOGL',
    {
      symbol: 'GOOGL',
      companyName: 'Alphabet Inc.',
      sector: 'Technology',
      industry: 'Internet Content & Information',
      marketCap: 2_200_000_000_000,
      enterpriseValue: 2_100_000_000_000,
      peRatio: 24.5,
      forwardPE: 21.8,
      pbRatio: 7.2,
      psRatio: 7.0,
      pegRatio: 1.32,
      evToEbitda: 17.5,
      dividendYield: 0.45,
      eps: 7.28,
      epsGrowthYoY: 22.3,
      revenueGrowthYoY: 14.1,
      grossMargin: 57.5,
      operatingMargin: 31.2,
      netMargin: 25.9,
      roe: 30.1,
      roa: 18.7,
      debtToEquity: 0.11,
      currentRatio: 2.14,
      quickRatio: 2.01,
      freeCashFlow: 69_800_000_000,
      sharesOutstanding: 12_340_000_000,
      beta: 1.06,
      fiftyTwoWeekHigh: 192.4,
      fiftyTwoWeekLow: 140.5,
      lastUpdated: '2026-05-31T20:00:00Z',
    },
  ],
  [
    'NVDA',
    {
      symbol: 'NVDA',
      companyName: 'NVIDIA Corporation',
      sector: 'Technology',
      industry: 'Semiconductors',
      marketCap: 2_350_000_000_000,
      enterpriseValue: 2_340_000_000_000,
      peRatio: 62.5,
      forwardPE: 38.2,
      pbRatio: 54.3,
      psRatio: 36.8,
      pegRatio: 1.05,
      evToEbitda: 52.1,
      dividendYield: 0.02,
      eps: 15.22,
      epsGrowthYoY: 122.5,
      revenueGrowthYoY: 94.3,
      grossMargin: 73.8,
      operatingMargin: 61.2,
      netMargin: 55.4,
      roe: 115.3,
      roa: 55.8,
      debtToEquity: 0.41,
      currentRatio: 4.17,
      quickRatio: 3.65,
      freeCashFlow: 32_400_000_000,
      sharesOutstanding: 24_600_000_000,
      beta: 1.68,
      fiftyTwoWeekHigh: 1020.0,
      fiftyTwoWeekLow: 470.5,
      lastUpdated: '2026-05-31T20:00:00Z',
    },
  ],
  [
    'TSLA',
    {
      symbol: 'TSLA',
      companyName: 'Tesla, Inc.',
      sector: 'Consumer Cyclical',
      industry: 'Auto Manufacturers',
      marketCap: 785_000_000_000,
      enterpriseValue: 790_000_000_000,
      peRatio: 72.3,
      forwardPE: 55.1,
      pbRatio: 14.8,
      psRatio: 8.2,
      pegRatio: 3.25,
      evToEbitda: 48.7,
      dividendYield: 0.0,
      eps: 3.39,
      epsGrowthYoY: -12.5,
      revenueGrowthYoY: 3.2,
      grossMargin: 18.2,
      operatingMargin: 8.4,
      netMargin: 7.1,
      roe: 21.5,
      roa: 8.3,
      debtToEquity: 0.17,
      currentRatio: 1.73,
      quickRatio: 1.25,
      freeCashFlow: 4_200_000_000,
      sharesOutstanding: 3_200_000_000,
      beta: 2.08,
      fiftyTwoWeekHigh: 302.5,
      fiftyTwoWeekLow: 138.8,
      lastUpdated: '2026-05-31T20:00:00Z',
    },
  ],
]);

const router = Router();

router.get('/:symbol', (req: Request, res: Response) => {
  const symbol = req.params.symbol.toUpperCase();

  const fundamentals = fundamentalsStore.get(symbol);

  if (!fundamentals) {
    res.status(404).json({
      success: false,
      error: `No fundamental data found for symbol '${symbol}'`,
      availableSymbols: Array.from(fundamentalsStore.keys()),
    });
    return;
  }

  res.json({
    success: true,
    data: fundamentals,
  });
});

export default router;
