import { Router, Request, Response } from 'express';

interface TaxLot {
  symbol: string;
  shares: number;
  purchaseDate: string;
  saleDate: string;
  costBasis: number;
  proceeds: number;
  gainLoss: number;
  holdingPeriod: 'short_term' | 'long_term';
  washSale: boolean;
}

interface DividendIncome {
  symbol: string;
  ordinaryDividends: number;
  qualifiedDividends: number;
  year: number;
}

interface TaxReport {
  reportId: string;
  userId: string;
  taxYear: number;
  generatedAt: string;
  realizedGains: TaxLot[];
  dividendIncome: DividendIncome[];
  summary: {
    totalShortTermGains: number;
    totalLongTermGains: number;
    totalDividendIncome: number;
    totalQualifiedDividends: number;
    netRealizedGainLoss: number;
    estimatedTaxLiability: number;
  };
}

function generateMockReport(year: number): TaxReport {
  const realizedGains: TaxLot[] = [
    {
      symbol: 'AAPL',
      shares: 50,
      purchaseDate: `${year - 1}-03-15`,
      saleDate: `${year}-06-20`,
      costBasis: 8500,
      proceeds: 9900,
      gainLoss: 1400,
      holdingPeriod: 'long_term',
      washSale: false,
    },
    {
      symbol: 'TSLA',
      shares: 20,
      purchaseDate: `${year}-01-10`,
      saleDate: `${year}-04-05`,
      costBasis: 5000,
      proceeds: 4200,
      gainLoss: -800,
      holdingPeriod: 'short_term',
      washSale: false,
    },
    {
      symbol: 'NVDA',
      shares: 30,
      purchaseDate: `${year - 2}-07-22`,
      saleDate: `${year}-02-14`,
      costBasis: 12000,
      proceeds: 28500,
      gainLoss: 16500,
      holdingPeriod: 'long_term',
      washSale: false,
    },
    {
      symbol: 'META',
      shares: 25,
      purchaseDate: `${year}-02-01`,
      saleDate: `${year}-02-28`,
      costBasis: 12000,
      proceeds: 12750,
      gainLoss: 750,
      holdingPeriod: 'short_term',
      washSale: true,
    },
  ];

  const dividendIncome: DividendIncome[] = [
    { symbol: 'AAPL', ordinaryDividends: 100, qualifiedDividends: 100, year },
    { symbol: 'MSFT', ordinaryDividends: 150, qualifiedDividends: 150, year },
    { symbol: 'JNJ', ordinaryDividends: 372, qualifiedDividends: 372, year },
    { symbol: 'KO', ordinaryDividends: 88, qualifiedDividends: 88, year },
  ];

  const totalShortTermGains = realizedGains
    .filter((g) => g.holdingPeriod === 'short_term')
    .reduce((sum, g) => sum + g.gainLoss, 0);

  const totalLongTermGains = realizedGains
    .filter((g) => g.holdingPeriod === 'long_term')
    .reduce((sum, g) => sum + g.gainLoss, 0);

  const totalDividendIncome = dividendIncome.reduce((sum, d) => sum + d.ordinaryDividends, 0);
  const totalQualifiedDividends = dividendIncome.reduce((sum, d) => sum + d.qualifiedDividends, 0);
  const netRealizedGainLoss = totalShortTermGains + totalLongTermGains;

  const estimatedTaxLiability =
    Math.max(0, totalShortTermGains) * 0.32 +
    Math.max(0, totalLongTermGains) * 0.15 +
    totalQualifiedDividends * 0.15 +
    (totalDividendIncome - totalQualifiedDividends) * 0.32;

  return {
    reportId: `tax-${year}-${Date.now()}`,
    userId: 'user-1',
    taxYear: year,
    generatedAt: new Date().toISOString(),
    realizedGains,
    dividendIncome,
    summary: {
      totalShortTermGains,
      totalLongTermGains,
      totalDividendIncome,
      totalQualifiedDividends,
      netRealizedGainLoss,
      estimatedTaxLiability: parseFloat(estimatedTaxLiability.toFixed(2)),
    },
  };
}

const router = Router();

router.get('/generate', (req: Request, res: Response) => {
  const year = parseInt(req.query.year as string, 10) || new Date().getFullYear();

  const report = generateMockReport(year);

  res.json({
    success: true,
    data: report,
  });
});

router.get('/summary', (req: Request, res: Response) => {
  const year = parseInt(req.query.year as string, 10) || new Date().getFullYear();

  const report = generateMockReport(year);

  res.json({
    success: true,
    data: {
      taxYear: report.taxYear,
      summary: report.summary,
      totalTransactions: report.realizedGains.length,
      dividendSources: report.dividendIncome.length,
      washSalesCount: report.realizedGains.filter((g) => g.washSale).length,
    },
  });
});

export default router;
