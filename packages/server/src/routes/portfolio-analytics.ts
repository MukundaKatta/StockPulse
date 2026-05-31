import { Router, Request, Response } from 'express';

const router = Router();

interface PortfolioMetrics {
  totalReturn: number;
  annualizedReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  beta: number;
  alpha: number;
  volatility: number;
  sortino: number;
  calmarRatio: number;
  treynorRatio: number;
}

interface SectorExposure {
  sector: string;
  weight: number;
  return: number;
  contribution: number;
}

router.get('/metrics', (_req: Request, res: Response) => {
  const metrics: PortfolioMetrics = {
    totalReturn: 28.5,
    annualizedReturn: 14.2,
    sharpeRatio: 1.45,
    maxDrawdown: -12.8,
    beta: 1.12,
    alpha: 3.2,
    volatility: 16.5,
    sortino: 2.1,
    calmarRatio: 1.11,
    treynorRatio: 0.13,
  };

  res.json({ success: true, data: metrics });
});

router.get('/sector-exposure', (_req: Request, res: Response) => {
  const sectors: SectorExposure[] = [
    { sector: 'Technology', weight: 35.2, return: 48.5, contribution: 17.1 },
    { sector: 'Healthcare', weight: 15.8, return: 12.3, contribution: 1.9 },
    { sector: 'Financials', weight: 12.5, return: 18.7, contribution: 2.3 },
    { sector: 'Consumer Discretionary', weight: 10.2, return: 22.1, contribution: 2.3 },
    { sector: 'Industrials', weight: 8.5, return: 15.8, contribution: 1.3 },
    { sector: 'Communication', weight: 7.3, return: 45.2, contribution: 3.3 },
    { sector: 'Energy', weight: 5.0, return: -5.2, contribution: -0.3 },
    { sector: 'Materials', weight: 3.2, return: 8.1, contribution: 0.3 },
    { sector: 'Utilities', weight: 1.5, return: -2.1, contribution: -0.03 },
    { sector: 'Real Estate', weight: 0.8, return: 5.5, contribution: 0.04 },
  ];

  res.json({ success: true, data: sectors });
});

router.get('/risk-decomposition', (_req: Request, res: Response) => {
  const riskFactors = [
    { factor: 'Market Risk', contribution: 68.5, value: 11.3 },
    { factor: 'Size Factor', contribution: 8.2, value: 1.4 },
    { factor: 'Value Factor', contribution: 5.1, value: 0.8 },
    { factor: 'Momentum', contribution: 7.8, value: 1.3 },
    { factor: 'Quality', contribution: 4.2, value: 0.7 },
    { factor: 'Idiosyncratic', contribution: 6.2, value: 1.0 },
  ];

  res.json({ success: true, data: riskFactors });
});

router.get('/correlation-matrix', (_req: Request, res: Response) => {
  const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA'];
  const matrix = [
    [1.0, 0.72, 0.65, 0.58, 0.55],
    [0.72, 1.0, 0.68, 0.62, 0.60],
    [0.65, 0.68, 1.0, 0.70, 0.52],
    [0.58, 0.62, 0.70, 1.0, 0.48],
    [0.55, 0.60, 0.52, 0.48, 1.0],
  ];

  res.json({ success: true, data: { symbols, matrix } });
});

export default router;
