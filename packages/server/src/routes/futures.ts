import { Router, Request, Response } from 'express';

const router = Router();

interface FuturesContract {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
  volume: number;
  openInterest: number;
  category: string;
}

const FUTURES: FuturesContract[] = [
  { symbol: 'ES', name: 'E-mini S&P 500', price: 5028.50, change: 18.25, changePct: 0.36, volume: 1245000, openInterest: 2850000, category: 'Index' },
  { symbol: 'NQ', name: 'E-mini Nasdaq', price: 17825.00, change: 95.50, changePct: 0.54, volume: 685000, openInterest: 1420000, category: 'Index' },
  { symbol: 'YM', name: 'E-mini Dow', price: 38750, change: 85, changePct: 0.22, volume: 245000, openInterest: 480000, category: 'Index' },
  { symbol: 'CL', name: 'Crude Oil', price: 76.84, change: 1.12, changePct: 1.48, volume: 892000, openInterest: 1680000, category: 'Energy' },
  { symbol: 'NG', name: 'Natural Gas', price: 2.18, change: -0.08, changePct: -3.54, volume: 425000, openInterest: 1150000, category: 'Energy' },
  { symbol: 'GC', name: 'Gold', price: 2038.50, change: -6.40, changePct: -0.31, volume: 312000, openInterest: 520000, category: 'Metals' },
  { symbol: 'SI', name: 'Silver', price: 22.85, change: 0.28, changePct: 1.24, volume: 148000, openInterest: 185000, category: 'Metals' },
  { symbol: 'ZB', name: '30Y Treasury', price: 120.28, change: -0.12, changePct: -0.10, volume: 385000, openInterest: 725000, category: 'Rates' },
  { symbol: 'ZN', name: '10Y Treasury', price: 110.45, change: -0.06, changePct: -0.05, volume: 625000, openInterest: 1480000, category: 'Rates' },
  { symbol: 'ZC', name: 'Corn', price: 452.25, change: 3.50, changePct: 0.78, volume: 285000, openInterest: 680000, category: 'Agriculture' },
  { symbol: 'ZS', name: 'Soybeans', price: 1218.50, change: -8.75, changePct: -0.71, volume: 195000, openInterest: 420000, category: 'Agriculture' },
];

router.get('/', (_req: Request, res: Response) => {
  res.json({ success: true, data: FUTURES });
});

router.get('/category/:category', (req: Request, res: Response) => {
  const category = req.params.category.toLowerCase();
  const filtered = FUTURES.filter((f) => f.category.toLowerCase() === category);
  res.json({ success: true, data: filtered });
});

router.get('/:symbol', (req: Request, res: Response) => {
  const symbol = req.params.symbol.toUpperCase();
  const contract = FUTURES.find((f) => f.symbol === symbol);
  if (!contract) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: `Futures contract ${symbol} not found` } });
    return;
  }
  res.json({ success: true, data: contract });
});

export default router;
