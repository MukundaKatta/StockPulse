import { Router, Request, Response } from 'express';

interface RiskMetrics {
  portfolioId: string;
  portfolioName: string;
  analysisDate: string;
  valueAtRisk: {
    confidence95: number;
    confidence99: number;
    timeHorizon: string;
    portfolioValue: number;
  };
  conditionalVaR: {
    confidence95: number;
    confidence99: number;
  };
  maxDrawdown: {
    amount: number;
    percent: number;
    peakDate: string;
    troughDate: string;
    recoveryDate: string | null;
    duration: number;
  };
  volatility: {
    daily: number;
    annualized: number;
    rolling30Day: number;
  };
  beta: number;
  alpha: number;
  sharpeRatio: number;
  sortinoRatio: number;
  treynorRatio: number;
  informationRatio: number;
  trackingError: number;
  correlationToMarket: number;
  concentrationRisk: {
    topHoldingWeight: number;
    top5Weight: number;
    herfindahlIndex: number;
    sectorConcentration: Record<string, number>;
  };
  stressTests: {
    scenario: string;
    impact: number;
    impactPercent: number;
  }[];
}

const riskDataStore = new Map<string, RiskMetrics>([
  [
    'portfolio-1',
    {
      portfolioId: 'portfolio-1',
      portfolioName: 'Growth Portfolio',
      analysisDate: '2026-05-31',
      valueAtRisk: {
        confidence95: -4250,
        confidence99: -7125,
        timeHorizon: '1 day',
        portfolioValue: 125000,
      },
      conditionalVaR: {
        confidence95: -5800,
        confidence99: -9400,
      },
      maxDrawdown: {
        amount: -18750,
        percent: -15.0,
        peakDate: '2026-02-19',
        troughDate: '2026-03-14',
        recoveryDate: '2026-04-28',
        duration: 68,
      },
      volatility: {
        daily: 1.42,
        annualized: 22.5,
        rolling30Day: 19.8,
      },
      beta: 1.35,
      alpha: 3.2,
      sharpeRatio: 1.42,
      sortinoRatio: 1.85,
      treynorRatio: 13.7,
      informationRatio: 0.65,
      trackingError: 8.2,
      correlationToMarket: 0.88,
      concentrationRisk: {
        topHoldingWeight: 18.5,
        top5Weight: 65.0,
        herfindahlIndex: 0.112,
        sectorConcentration: {
          Technology: 55,
          'Consumer Cyclical': 15,
          Healthcare: 12,
          Financials: 10,
          Energy: 8,
        },
      },
      stressTests: [
        { scenario: '2008 Financial Crisis', impact: -46250, impactPercent: -37.0 },
        { scenario: 'COVID-19 Crash (Mar 2020)', impact: -41250, impactPercent: -33.0 },
        { scenario: 'Interest Rate +200bps', impact: -15000, impactPercent: -12.0 },
        { scenario: 'Tech Sector -20%', impact: -13750, impactPercent: -11.0 },
        { scenario: 'Moderate Recession', impact: -25000, impactPercent: -20.0 },
      ],
    },
  ],
  [
    'portfolio-2',
    {
      portfolioId: 'portfolio-2',
      portfolioName: 'Balanced Income',
      analysisDate: '2026-05-31',
      valueAtRisk: {
        confidence95: -1960,
        confidence99: -3234,
        timeHorizon: '1 day',
        portfolioValue: 98000,
      },
      conditionalVaR: {
        confidence95: -2744,
        confidence99: -4312,
      },
      maxDrawdown: {
        amount: -8820,
        percent: -9.0,
        peakDate: '2026-02-19',
        troughDate: '2026-03-08',
        recoveryDate: '2026-04-10',
        duration: 50,
      },
      volatility: {
        daily: 0.79,
        annualized: 12.5,
        rolling30Day: 11.2,
      },
      beta: 0.78,
      alpha: 1.5,
      sharpeRatio: 1.15,
      sortinoRatio: 1.52,
      treynorRatio: 13.1,
      informationRatio: 0.42,
      trackingError: 5.8,
      correlationToMarket: 0.82,
      concentrationRisk: {
        topHoldingWeight: 12.0,
        top5Weight: 48.0,
        herfindahlIndex: 0.065,
        sectorConcentration: {
          Financials: 25,
          Healthcare: 20,
          'Consumer Staples': 18,
          Utilities: 15,
          Technology: 12,
          'Real Estate': 10,
        },
      },
      stressTests: [
        { scenario: '2008 Financial Crisis', impact: -25480, impactPercent: -26.0 },
        { scenario: 'COVID-19 Crash (Mar 2020)', impact: -20580, impactPercent: -21.0 },
        { scenario: 'Interest Rate +200bps', impact: -7840, impactPercent: -8.0 },
        { scenario: 'Tech Sector -20%', impact: -2352, impactPercent: -2.4 },
        { scenario: 'Moderate Recession', impact: -14700, impactPercent: -15.0 },
      ],
    },
  ],
]);

const router = Router();

router.get('/:portfolioId', (req: Request, res: Response) => {
  const { portfolioId } = req.params;

  const riskData = riskDataStore.get(portfolioId);

  if (!riskData) {
    res.status(404).json({
      success: false,
      error: `No risk analysis data found for portfolio '${portfolioId}'`,
      availablePortfolios: Array.from(riskDataStore.keys()),
    });
    return;
  }

  res.json({
    success: true,
    data: riskData,
  });
});

export default router;
