import { Router, Request, Response } from 'express';

const router = Router();

interface ScreenerCriteria {
  marketCapMin?: number;
  marketCapMax?: number;
  peMin?: number;
  peMax?: number;
  divYieldMin?: number;
  sector?: string;
  exchange?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

interface StockResult {
  symbol: string;
  name: string;
  sector: string;
  exchange: string;
  price: number;
  change: number;
  marketCap: number;
  pe: number;
  eps: number;
  divYield: number;
  volume: number;
  beta: number;
}

const UNIVERSE: StockResult[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', exchange: 'NASDAQ', price: 185.92, change: 0.65, marketCap: 2890e9, pe: 30.2, eps: 6.16, divYield: 0.52, volume: 68e6, beta: 1.28 },
  { symbol: 'MSFT', name: 'Microsoft Corp', sector: 'Technology', exchange: 'NASDAQ', price: 388.47, change: 1.09, marketCap: 2890e9, pe: 36.5, eps: 10.64, divYield: 0.72, volume: 22e6, beta: 0.91 },
  { symbol: 'GOOGL', name: 'Alphabet Inc', sector: 'Communication', exchange: 'NASDAQ', price: 141.80, change: 1.07, marketCap: 1780e9, pe: 24.8, eps: 5.72, divYield: 0, volume: 25e6, beta: 1.05 },
  { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Financials', exchange: 'NYSE', price: 172.30, change: 0.28, marketCap: 490e9, pe: 10.6, eps: 16.23, divYield: 2.35, volume: 12e6, beta: 1.12 },
  { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', exchange: 'NYSE', price: 158.50, change: -0.32, marketCap: 382e9, pe: 16.0, eps: 9.92, divYield: 2.95, volume: 8e6, beta: 0.55 },
  { symbol: 'XOM', name: 'Exxon Mobil', sector: 'Energy', exchange: 'NYSE', price: 101.20, change: -0.95, marketCap: 420e9, pe: 10.6, eps: 9.52, divYield: 3.65, volume: 15e6, beta: 0.82 },
  { symbol: 'PG', name: 'Procter & Gamble', sector: 'Consumer Staples', exchange: 'NYSE', price: 155.80, change: 0.12, marketCap: 365e9, pe: 24.5, eps: 6.36, divYield: 2.42, volume: 6e6, beta: 0.42 },
  { symbol: 'NVDA', name: 'NVIDIA Corp', sector: 'Technology', exchange: 'NASDAQ', price: 547.10, change: 2.40, marketCap: 1350e9, pe: 42.2, eps: 12.96, divYield: 0.03, volume: 58e6, beta: 1.68 },
  { symbol: 'V', name: 'Visa Inc', sector: 'Financials', exchange: 'NYSE', price: 268.40, change: 0.55, marketCap: 550e9, pe: 30.6, eps: 8.77, divYield: 0.76, volume: 8e6, beta: 0.95 },
  { symbol: 'UNH', name: 'UnitedHealth Group', sector: 'Healthcare', exchange: 'NYSE', price: 528.50, change: -0.42, marketCap: 480e9, pe: 22.5, eps: 23.49, divYield: 1.35, volume: 3e6, beta: 0.68 },
];

router.get('/', (req: Request, res: Response) => {
  const { marketCapMin, marketCapMax, peMin, peMax, divYieldMin, sector, sort, order } = req.query;

  let results = [...UNIVERSE];

  if (marketCapMin) results = results.filter((s) => s.marketCap >= Number(marketCapMin));
  if (marketCapMax) results = results.filter((s) => s.marketCap <= Number(marketCapMax));
  if (peMin) results = results.filter((s) => s.pe >= Number(peMin));
  if (peMax) results = results.filter((s) => s.pe <= Number(peMax));
  if (divYieldMin) results = results.filter((s) => s.divYield >= Number(divYieldMin));
  if (sector) results = results.filter((s) => s.sector.toLowerCase() === (sector as string).toLowerCase());

  if (sort) {
    const key = sort as keyof StockResult;
    const dir = order === 'asc' ? 1 : -1;
    results.sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (typeof aVal === 'number' && typeof bVal === 'number') return (aVal - bVal) * dir;
      return String(aVal).localeCompare(String(bVal)) * dir;
    });
  }

  res.json({ success: true, data: results, total: results.length });
});

router.get('/sectors', (_req: Request, res: Response) => {
  const sectors = [...new Set(UNIVERSE.map((s) => s.sector))].sort();
  res.json({ success: true, data: sectors });
});

export default router;
