import { Router, Request, Response } from 'express';

const router = Router();

interface Commodity {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePct: number;
  unit: string;
  category: 'Energy' | 'Metals' | 'Agriculture' | 'Livestock';
}

const COMMODITIES: Commodity[] = [
  { name: 'Crude Oil (WTI)', symbol: 'CL', price: 76.84, change: -1.22, changePct: -1.56, unit: '$/bbl', category: 'Energy' },
  { name: 'Natural Gas', symbol: 'NG', price: 2.18, change: 0.08, changePct: 3.81, unit: '$/MMBtu', category: 'Energy' },
  { name: 'Gold', symbol: 'GC', price: 2042.50, change: 12.80, changePct: 0.63, unit: '$/oz', category: 'Metals' },
  { name: 'Silver', symbol: 'SI', price: 22.85, change: 0.42, changePct: 1.87, unit: '$/oz', category: 'Metals' },
  { name: 'Copper', symbol: 'HG', price: 3.82, change: -0.04, changePct: -1.04, unit: '$/lb', category: 'Metals' },
  { name: 'Platinum', symbol: 'PL', price: 905.20, change: -8.40, changePct: -0.92, unit: '$/oz', category: 'Metals' },
  { name: 'Corn', symbol: 'ZC', price: 4.52, change: 0.06, changePct: 1.34, unit: '$/bu', category: 'Agriculture' },
  { name: 'Soybeans', symbol: 'ZS', price: 12.28, change: -0.14, changePct: -1.13, unit: '$/bu', category: 'Agriculture' },
  { name: 'Wheat', symbol: 'ZW', price: 5.98, change: 0.12, changePct: 2.05, unit: '$/bu', category: 'Agriculture' },
  { name: 'Live Cattle', symbol: 'LE', price: 178.45, change: 1.20, changePct: 0.68, unit: '$/cwt', category: 'Livestock' },
];

router.get('/', (req: Request, res: Response) => {
  const { category } = req.query;
  let result = COMMODITIES;
  if (category && typeof category === 'string') {
    result = COMMODITIES.filter((c) => c.category.toLowerCase() === category.toLowerCase());
  }
  res.json({ commodities: result });
});

router.get('/:symbol', (req: Request, res: Response) => {
  const commodity = COMMODITIES.find((c) => c.symbol.toLowerCase() === req.params.symbol.toLowerCase());
  if (!commodity) {
    res.status(404).json({ error: 'Commodity not found' });
    return;
  }
  res.json({ commodity });
});

export default router;
