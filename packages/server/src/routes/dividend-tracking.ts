import { Router, Request, Response } from 'express';

interface DividendPayment {
  id: string;
  symbol: string;
  companyName: string;
  amount: number;
  currency: string;
  exDate: string;
  recordDate: string;
  paymentDate: string;
  frequency: 'quarterly' | 'semi_annual' | 'annual' | 'monthly';
  yieldPercent: number;
  sharesOwned: number;
  totalPayout: number;
  status: 'upcoming' | 'pending' | 'paid';
}

const dividendPayments: DividendPayment[] = [
  {
    id: 'div-001',
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    amount: 0.25,
    currency: 'USD',
    exDate: '2026-05-09',
    recordDate: '2026-05-12',
    paymentDate: '2026-05-15',
    frequency: 'quarterly',
    yieldPercent: 0.52,
    sharesOwned: 100,
    totalPayout: 25.0,
    status: 'paid',
  },
  {
    id: 'div-002',
    symbol: 'MSFT',
    companyName: 'Microsoft Corporation',
    amount: 0.75,
    currency: 'USD',
    exDate: '2026-06-18',
    recordDate: '2026-06-19',
    paymentDate: '2026-06-25',
    frequency: 'quarterly',
    yieldPercent: 0.71,
    sharesOwned: 50,
    totalPayout: 37.5,
    status: 'upcoming',
  },
  {
    id: 'div-003',
    symbol: 'JNJ',
    companyName: 'Johnson & Johnson',
    amount: 1.24,
    currency: 'USD',
    exDate: '2026-06-22',
    recordDate: '2026-06-23',
    paymentDate: '2026-07-08',
    frequency: 'quarterly',
    yieldPercent: 3.05,
    sharesOwned: 75,
    totalPayout: 93.0,
    status: 'upcoming',
  },
  {
    id: 'div-004',
    symbol: 'JPM',
    companyName: 'JPMorgan Chase & Co.',
    amount: 1.15,
    currency: 'USD',
    exDate: '2026-07-06',
    recordDate: '2026-07-07',
    paymentDate: '2026-07-31',
    frequency: 'quarterly',
    yieldPercent: 2.25,
    sharesOwned: 40,
    totalPayout: 46.0,
    status: 'upcoming',
  },
];

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { symbol, status, frequency } = req.query;

  let filtered = [...dividendPayments];

  if (typeof symbol === 'string') {
    filtered = filtered.filter((d) => d.symbol.toUpperCase() === symbol.toUpperCase());
  }

  if (typeof status === 'string') {
    filtered = filtered.filter((d) => d.status === status);
  }

  if (typeof frequency === 'string') {
    filtered = filtered.filter((d) => d.frequency === frequency);
  }

  const totalAnnualIncome = filtered.reduce((sum, d) => {
    const multiplier = { quarterly: 4, semi_annual: 2, annual: 1, monthly: 12 }[d.frequency];
    return sum + d.totalPayout * multiplier;
  }, 0);

  res.json({
    success: true,
    data: filtered,
    summary: {
      totalTracked: filtered.length,
      totalAnnualIncome: parseFloat(totalAnnualIncome.toFixed(2)),
      nextPayment: filtered
        .filter((d) => d.status === 'upcoming')
        .sort((a, b) => a.paymentDate.localeCompare(b.paymentDate))[0] || null,
    },
  });
});

router.post('/', (req: Request, res: Response) => {
  const { symbol, companyName, amount, exDate, recordDate, paymentDate, frequency, yieldPercent, sharesOwned } = req.body;

  if (!symbol || !amount || !paymentDate) {
    res.status(400).json({
      success: false,
      error: 'symbol, amount, and paymentDate are required',
    });
    return;
  }

  const newDividend: DividendPayment = {
    id: `div-${String(dividendPayments.length + 1).padStart(3, '0')}`,
    symbol: symbol.toUpperCase(),
    companyName: companyName || symbol.toUpperCase(),
    amount,
    currency: 'USD',
    exDate: exDate || '',
    recordDate: recordDate || '',
    paymentDate,
    frequency: frequency || 'quarterly',
    yieldPercent: yieldPercent || 0,
    sharesOwned: sharesOwned || 0,
    totalPayout: parseFloat((amount * (sharesOwned || 0)).toFixed(2)),
    status: 'upcoming',
  };

  dividendPayments.push(newDividend);

  res.status(201).json({
    success: true,
    data: newDividend,
  });
});

export default router;
