import { Router, Request, Response } from 'express';

const router = Router();

interface Webhook {
  id: string;
  url: string;
  events: string[];
  active: boolean;
  createdAt: string;
}

const webhooks: Webhook[] = [
  {
    id: 'wh_1',
    url: 'https://example.com/hook/trades',
    events: ['trade.executed', 'trade.cancelled'],
    active: true,
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'wh_2',
    url: 'https://example.com/hook/alerts',
    events: ['alert.triggered'],
    active: false,
    createdAt: '2026-02-20T14:30:00Z',
  },
];

let nextId = 3;

router.get('/', (req: Request, res: Response) => {
  res.json({ webhooks });
});

router.post('/', (req: Request, res: Response) => {
  const { url, events } = req.body as { url: string; events: string[] };
  const webhook: Webhook = {
    id: `wh_${nextId++}`,
    url,
    events: events || [],
    active: true,
    createdAt: new Date().toISOString(),
  };
  webhooks.push(webhook);
  res.status(201).json({ webhook });
});

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = webhooks.findIndex((w) => w.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Webhook not found' });
    return;
  }
  const removed = webhooks.splice(index, 1)[0];
  res.json({ deleted: removed });
});

export default router;
