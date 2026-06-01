import { Router, Request, Response } from 'express';

interface PortfolioSummary {
  id: string;
  name: string;
  totalValue: number;
  totalCost: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  holdings: number;
  sectors: Record<string, number>;
  topHoldings: { symbol: string; weight: number }[];
  annualizedReturn: number;
  volatility: number;
  sharpeRatio: number;
  beta: number;
  dividendYield: number;
  expenseRatio: number;
}

const portfolios = new Map<string, PortfolioSummary>([
  [
    'portfolio-1',
    {
      id: 'portfolio-1',
      name: 'Growth Portfolio',
      totalValue: 125000,
      totalCost: 100000,
      totalGainLoss: 25000,
      totalGainLossPercent: 25.0,
      holdings: 8,
      sectors: {
        Technology: 55,
        'Consumer Cyclical': 15,
        Healthcare: 12,
        Financials: 10,
        Energy: 8,
      },
      topHoldings: [
        { symbol: 'NVDA', weight: 18.5 },
        { symbol: 'AAPL', weight: 15.2 },
        { symbol: 'MSFT', weight: 12.8 },
        { symbol: 'TSLA', weight: 10.1 },
        { symbol: 'AMZN', weight: 8.4 },
      ],
      annualizedReturn: 18.5,
      volatility: 22.3,
      sharpeRatio: 1.42,
      beta: 1.35,
      dividendYield: 0.45,
      expenseRatio: 0,
    },
  ],
  [
    'portfolio-2',
    {
      id: 'portfolio-2',
      name: 'Balanced Income',
      totalValue: 98000,
      totalCost: 85000,
      totalGainLoss: 13000,
      totalGainLossPercent: 15.29,
      holdings: 12,
      sectors: {
        Financials: 25,
        Healthcare: 20,
        'Consumer Staples': 18,
        Utilities: 15,
        Technology: 12,
        'Real Estate': 10,
      },
      topHoldings: [
        { symbol: 'JPM', weight: 12.0 },
        { symbol: 'JNJ', weight: 10.5 },
        { symbol: 'PG', weight: 9.8 },
        { symbol: 'KO', weight: 8.2 },
        { symbol: 'VZ', weight: 7.5 },
      ],
      annualizedReturn: 10.2,
      volatility: 12.5,
      sharpeRatio: 1.15,
      beta: 0.78,
      dividendYield: 3.2,
      expenseRatio: 0,
    },
  ],
  [
    'portfolio-3',
    {
      id: 'portfolio-3',
      name: 'Index Tracker',
      totalValue: 150000,
      totalCost: 130000,
      totalGainLoss: 20000,
      totalGainLossPercent: 15.38,
      holdings: 3,
      sectors: {
        'Broad Market': 60,
        International: 25,
        'Fixed Income': 15,
      },
      topHoldings: [
        { symbol: 'VOO', weight: 60 },
        { symbol: 'VXUS', weight: 25 },
        { symbol: 'BND', weight: 15 },
      ],
      annualizedReturn: 12.1,
      volatility: 14.8,
      sharpeRatio: 1.28,
      beta: 0.95,
      dividendYield: 1.8,
      expenseRatio: 0.04,
    },
  ],
]);

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { ids } = req.query;

  if (!ids || typeof ids !== 'string') {
    res.status(400).json({
      success: false,
      error: 'Provide comma-separated portfolio ids via ?ids=portfolio-1,portfolio-2',
      availablePortfolios: Array.from(portfolios.entries()).map(([id, p]) => ({
        id,
        name: p.name,
      })),
    });
    return;
  }

  const requestedIds = ids.split(',').map((s) => s.trim());
  const found: PortfolioSummary[] = [];
  const notFound: string[] = [];

  for (const id of requestedIds) {
    const p = portfolios.get(id);
    if (p) {
      found.push(p);
    } else {
      notFound.push(id);
    }
  }

  if (found.length < 2) {
    res.status(400).json({
      success: false,
      error: 'At least two valid portfolio IDs are required for comparison',
      notFound,
    });
    return;
  }

  const comparison = {
    portfolios: found,
    metrics: found.map((p) => ({
      id: p.id,
      name: p.name,
      annualizedReturn: p.annualizedReturn,
      volatility: p.volatility,
      sharpeRatio: p.sharpeRatio,
      beta: p.beta,
      dividendYield: p.dividendYield,
    })),
    bestReturn: found.reduce((best, p) =>
      p.annualizedReturn > best.annualizedReturn ? p : best
    ),
    lowestRisk: found.reduce((best, p) =>
      p.volatility < best.volatility ? p : best
    ),
    bestRiskAdjusted: found.reduce((best, p) =>
      p.sharpeRatio > best.sharpeRatio ? p : best
    ),
    sectorOverlap: calculateSectorOverlap(found),
  };

  res.json({
    success: true,
    data: comparison,
  });
});

function calculateSectorOverlap(portfolioList: PortfolioSummary[]): Record<string, number[]> {
  const allSectors = new Set<string>();
  for (const p of portfolioList) {
    Object.keys(p.sectors).forEach((s) => allSectors.add(s));
  }

  const overlap: Record<string, number[]> = {};
  for (const sector of allSectors) {
    overlap[sector] = portfolioList.map((p) => p.sectors[sector] || 0);
  }

  return overlap;
}

export default router;
