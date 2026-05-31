import { Router, Request, Response } from 'express';

const router = Router();

interface Bond {
  cusip: string;
  issuer: string;
  coupon: number;
  maturity: string;
  yield: number;
  price: number;
  rating: string;
  type: string;
}

const BONDS: Bond[] = [
  { cusip: '912810TT', issuer: 'US Treasury', coupon: 4.75, maturity: '2043-11-15', yield: 4.38, price: 104.25, rating: 'AAA', type: 'Government' },
  { cusip: '912810SV', issuer: 'US Treasury', coupon: 3.875, maturity: '2033-08-15', yield: 4.18, price: 97.85, rating: 'AAA', type: 'Government' },
  { cusip: '594918BW', issuer: 'Microsoft Corp', coupon: 3.50, maturity: '2042-02-12', yield: 4.45, price: 88.50, rating: 'AAA', type: 'Corporate' },
  { cusip: '037833DX', issuer: 'Apple Inc', coupon: 4.10, maturity: '2062-08-08', yield: 4.85, price: 85.20, rating: 'AA+', type: 'Corporate' },
  { cusip: '459200KH', issuer: 'IBM Corp', coupon: 4.25, maturity: '2034-01-21', yield: 4.62, price: 96.40, rating: 'A-', type: 'Corporate' },
  { cusip: '369604BQ', issuer: 'GE Capital', coupon: 5.875, maturity: '2038-01-14', yield: 5.25, price: 105.80, rating: 'BBB+', type: 'Corporate' },
  { cusip: '13063DAL', issuer: 'State of CA', coupon: 3.25, maturity: '2038-10-01', yield: 3.85, price: 92.15, rating: 'AA-', type: 'Municipal' },
  { cusip: '64971MAK', issuer: 'NYC GO', coupon: 4.00, maturity: '2035-08-01', yield: 3.65, price: 103.50, rating: 'AA', type: 'Municipal' },
];

router.get('/', (_req: Request, res: Response) => {
  res.json({ success: true, data: BONDS });
});

router.get('/type/:type', (req: Request, res: Response) => {
  const type = req.params.type.toLowerCase();
  const filtered = BONDS.filter((b) => b.type.toLowerCase() === type);
  res.json({ success: true, data: filtered });
});

router.get('/:cusip', (req: Request, res: Response) => {
  const cusip = req.params.cusip.toUpperCase();
  const bond = BONDS.find((b) => b.cusip === cusip);
  if (!bond) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: `Bond ${cusip} not found` } });
    return;
  }
  res.json({ success: true, data: bond });
});

export default router;
