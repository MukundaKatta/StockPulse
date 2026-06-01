import { Router, Request, Response } from 'express';

const router = Router();

interface TradeExecution {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  status: 'filled' | 'partial' | 'rejected';
  executedAt: string;
}

const tradeExecutions: TradeExecution[] = [
  {
    id: 'te_1',
    symbol: 'AAPL',
    side: 'buy',
    quantity: 100,
    price: 182.50,
    status: 'filled',
    executedAt: '2026-05-30T14:30:00Z',
  },
  {
    id: 'te_2',
    symbol: 'GOOGL',
    side: 'sell',
    quantity: 50,
    price: 151.20,
    status: 'filled',
    executedAt: '2026-05-30T15:00:00Z',
  },
  {
    id: 'te_3',
    symbol: 'TSLA',
    side: 'buy',
    quantity: 25,
    price: 245.80,
    status: 'partial',
    executedAt: '2026-05-31T10:15:00Z',
  },
  {
    id: 'te_4',
    symbol: 'MSFT',
    side: 'buy',
    quantity: 75,
    price: 410.00,
    status: 'rejected',
    executedAt: '2026-05-31T11:00:00Z',
  },
];

router.get('/', (req: Request, res: Response) => {
  const { status } = req.query;
  let filtered = tradeExecutions;
  if (status && typeof status === 'string') {
    filtered = tradeExecutions.filter((t) => t.status === status);
  }
  res.json({ executions: filtered, total: filtered.length });
});

export default router;
