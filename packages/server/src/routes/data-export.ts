import { Router, Request, Response } from 'express';

interface PortfolioHolding {
  symbol: string;
  companyName: string;
  shares: number;
  averageCost: number;
  currentPrice: number;
  marketValue: number;
  gainLoss: number;
  gainLossPercent: number;
  sector: string;
  lastUpdated: string;
}

interface TradeRecord {
  id: string;
  date: string;
  symbol: string;
  action: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  total: number;
  fees: number;
}

const holdings: PortfolioHolding[] = [
  {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    shares: 100,
    averageCost: 175.0,
    currentPrice: 198.5,
    marketValue: 19850,
    gainLoss: 2350,
    gainLossPercent: 13.43,
    sector: 'Technology',
    lastUpdated: '2026-05-31T20:00:00Z',
  },
  {
    symbol: 'MSFT',
    companyName: 'Microsoft Corporation',
    shares: 50,
    averageCost: 380.0,
    currentPrice: 428.0,
    marketValue: 21400,
    gainLoss: 2400,
    gainLossPercent: 12.63,
    sector: 'Technology',
    lastUpdated: '2026-05-31T20:00:00Z',
  },
  {
    symbol: 'GOOGL',
    companyName: 'Alphabet Inc.',
    shares: 75,
    averageCost: 155.0,
    currentPrice: 178.2,
    marketValue: 13365,
    gainLoss: 1740,
    gainLossPercent: 14.97,
    sector: 'Technology',
    lastUpdated: '2026-05-31T20:00:00Z',
  },
  {
    symbol: 'JPM',
    companyName: 'JPMorgan Chase & Co.',
    shares: 40,
    averageCost: 185.0,
    currentPrice: 205.3,
    marketValue: 8212,
    gainLoss: 812,
    gainLossPercent: 10.97,
    sector: 'Financials',
    lastUpdated: '2026-05-31T20:00:00Z',
  },
];

const trades: TradeRecord[] = [
  { id: 'T001', date: '2026-05-28', symbol: 'AAPL', action: 'BUY', quantity: 25, price: 196.0, total: 4900, fees: 4.95 },
  { id: 'T002', date: '2026-05-25', symbol: 'MSFT', action: 'BUY', quantity: 10, price: 422.5, total: 4225, fees: 4.95 },
  { id: 'T003', date: '2026-05-20', symbol: 'TSLA', action: 'SELL', quantity: 30, price: 248.0, total: 7440, fees: 4.95 },
  { id: 'T004', date: '2026-05-15', symbol: 'GOOGL', action: 'BUY', quantity: 50, price: 172.3, total: 8615, fees: 4.95 },
  { id: 'T005', date: '2026-05-10', symbol: 'JPM', action: 'BUY', quantity: 20, price: 200.1, total: 4002, fees: 4.95 },
];

function toCsvString(data: Record<string, unknown>[]): string {
  if (data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((h) => {
      const val = row[h];
      const str = String(val ?? '');
      return str.includes(',') || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str;
    }).join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}

const router = Router();

router.get('/csv', (req: Request, res: Response) => {
  const dataType = (req.query.type as string) || 'holdings';

  let csvContent: string;
  let filename: string;

  if (dataType === 'trades') {
    csvContent = toCsvString(trades as unknown as Record<string, unknown>[]);
    filename = 'trade_history.csv';
  } else {
    csvContent = toCsvString(holdings as unknown as Record<string, unknown>[]);
    filename = 'portfolio_holdings.csv';
  }

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send(csvContent);
});

router.get('/json', (req: Request, res: Response) => {
  const dataType = (req.query.type as string) || 'holdings';

  let data: unknown;
  let filename: string;

  if (dataType === 'trades') {
    data = trades;
    filename = 'trade_history.json';
  } else if (dataType === 'all') {
    data = { holdings, trades };
    filename = 'portfolio_full_export.json';
  } else {
    data = holdings;
    filename = 'portfolio_holdings.json';
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.json({
    success: true,
    exportedAt: new Date().toISOString(),
    recordCount: Array.isArray(data) ? data.length : undefined,
    data,
  });
});

export default router;
