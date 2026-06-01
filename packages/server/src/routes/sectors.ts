import { Router, Request, Response } from 'express';

const router = Router();

interface Sector {
  name: string;
  ticker: string;
  performance1d: number;
  performance1w: number;
  performance1m: number;
  performanceYtd: number;
  marketCap: string;
  peRatio: number;
  dividendYield: number;
}

const SECTORS: Sector[] = [
  { name: 'Technology', ticker: 'XLK', performance1d: 1.24, performance1w: 3.18, performance1m: 5.42, performanceYtd: 18.3, marketCap: '14.2T', peRatio: 31.5, dividendYield: 0.72 },
  { name: 'Healthcare', ticker: 'XLV', performance1d: -0.31, performance1w: 0.85, performance1m: 2.10, performanceYtd: 4.8, marketCap: '6.8T', peRatio: 18.2, dividendYield: 1.54 },
  { name: 'Financials', ticker: 'XLF', performance1d: 0.62, performance1w: 1.45, performance1m: 3.21, performanceYtd: 12.1, marketCap: '5.4T', peRatio: 14.8, dividendYield: 1.82 },
  { name: 'Consumer Discretionary', ticker: 'XLY', performance1d: 0.88, performance1w: 2.12, performance1m: 4.05, performanceYtd: 8.7, marketCap: '4.1T', peRatio: 26.4, dividendYield: 0.95 },
  { name: 'Communication Services', ticker: 'XLC', performance1d: 1.05, performance1w: 2.84, performance1m: 6.12, performanceYtd: 22.3, marketCap: '3.8T', peRatio: 19.6, dividendYield: 0.85 },
  { name: 'Industrials', ticker: 'XLI', performance1d: 0.42, performance1w: 1.20, performance1m: 2.85, performanceYtd: 6.8, marketCap: '4.5T', peRatio: 22.1, dividendYield: 1.45 },
  { name: 'Consumer Staples', ticker: 'XLP', performance1d: -0.15, performance1w: 0.32, performance1m: 1.05, performanceYtd: 2.1, marketCap: '3.2T', peRatio: 21.8, dividendYield: 2.65 },
  { name: 'Energy', ticker: 'XLE', performance1d: -0.85, performance1w: -1.42, performance1m: -3.21, performanceYtd: -3.4, marketCap: '1.8T', peRatio: 11.2, dividendYield: 3.42 },
  { name: 'Utilities', ticker: 'XLU', performance1d: 0.12, performance1w: 0.65, performance1m: 1.82, performanceYtd: 4.1, marketCap: '1.2T', peRatio: 17.5, dividendYield: 3.12 },
  { name: 'Real Estate', ticker: 'XLRE', performance1d: -0.28, performance1w: 0.42, performance1m: 0.95, performanceYtd: 1.9, marketCap: '1.1T', peRatio: 36.2, dividendYield: 3.85 },
  { name: 'Materials', ticker: 'XLB', performance1d: 0.35, performance1w: 0.92, performance1m: 1.45, performanceYtd: -1.2, marketCap: '0.9T', peRatio: 16.8, dividendYield: 1.95 },
];

router.get('/', (_req: Request, res: Response) => {
  res.json({ sectors: SECTORS });
});

router.get('/:ticker', (req: Request, res: Response) => {
  const sector = SECTORS.find((s) => s.ticker.toLowerCase() === req.params.ticker.toLowerCase());
  if (!sector) {
    res.status(404).json({ error: 'Sector not found' });
    return;
  }
  res.json({ sector });
});

export default router;
