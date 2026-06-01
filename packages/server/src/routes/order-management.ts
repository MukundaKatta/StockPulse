import { Router, Request, Response } from 'express';

const router = Router();

interface Order {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit' | 'stop';
  quantity: number;
  price: number | null;
  status: 'pending' | 'filled' | 'cancelled';
  createdAt: string;
}

const orders: Order[] = [
  {
    id: 'ord_1',
    symbol: 'AAPL',
    side: 'buy',
    type: 'limit',
    quantity: 50,
    price: 180.00,
    status: 'pending',
    createdAt: '2026-05-31T09:30:00Z',
  },
  {
    id: 'ord_2',
    symbol: 'GOOGL',
    side: 'sell',
    type: 'market',
    quantity: 30,
    price: null,
    status: 'filled',
    createdAt: '2026-05-31T10:00:00Z',
  },
  {
    id: 'ord_3',
    symbol: 'MSFT',
    side: 'buy',
    type: 'stop',
    quantity: 20,
    price: 400.00,
    status: 'pending',
    createdAt: '2026-05-31T11:15:00Z',
  },
];

let nextId = 4;

router.get('/', (req: Request, res: Response) => {
  res.json({ orders, total: orders.length });
});

router.post('/', (req: Request, res: Response) => {
  const { symbol, side, type, quantity, price } = req.body as {
    symbol: string;
    side: 'buy' | 'sell';
    type: 'market' | 'limit' | 'stop';
    quantity: number;
    price: number | null;
  };
  const order: Order = {
    id: `ord_${nextId++}`,
    symbol,
    side,
    type,
    quantity,
    price: price ?? null,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  res.status(201).json({ order });
});

router.patch('/:id/cancel', (req: Request, res: Response) => {
  const { id } = req.params;
  const order = orders.find((o) => o.id === id);
  if (!order) {
    res.status(404).json({ error: 'Order not found' });
    return;
  }
  if (order.status !== 'pending') {
    res.status(400).json({ error: 'Only pending orders can be cancelled' });
    return;
  }
  order.status = 'cancelled';
  res.json({ order });
});

export default router;
