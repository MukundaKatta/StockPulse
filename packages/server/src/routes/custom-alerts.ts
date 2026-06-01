import { Router, Request, Response } from 'express';

interface AlertCondition {
  field: 'price' | 'volume' | 'percentChange' | 'marketCap' | 'pe_ratio';
  operator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq' | 'crosses_above' | 'crosses_below';
  value: number;
}

interface CustomAlert {
  id: string;
  userId: string;
  name: string;
  symbol: string;
  conditions: AlertCondition[];
  conditionLogic: 'AND' | 'OR';
  notifyVia: ('email' | 'push' | 'sms')[];
  frequency: 'once' | 'every_time' | 'daily_digest';
  enabled: boolean;
  triggeredCount: number;
  lastTriggered: string | null;
  createdAt: string;
  updatedAt: string;
}

const alertsStore = new Map<string, CustomAlert>([
  [
    'alert-001',
    {
      id: 'alert-001',
      userId: 'user-1',
      name: 'AAPL Price Drop',
      symbol: 'AAPL',
      conditions: [
        { field: 'price', operator: 'lt', value: 180 },
      ],
      conditionLogic: 'AND',
      notifyVia: ['email', 'push'],
      frequency: 'once',
      enabled: true,
      triggeredCount: 0,
      lastTriggered: null,
      createdAt: '2026-05-15T10:00:00Z',
      updatedAt: '2026-05-15T10:00:00Z',
    },
  ],
  [
    'alert-002',
    {
      id: 'alert-002',
      userId: 'user-1',
      name: 'TSLA Volume Spike',
      symbol: 'TSLA',
      conditions: [
        { field: 'volume', operator: 'gt', value: 100_000_000 },
        { field: 'percentChange', operator: 'gt', value: 5 },
      ],
      conditionLogic: 'OR',
      notifyVia: ['push'],
      frequency: 'every_time',
      enabled: true,
      triggeredCount: 3,
      lastTriggered: '2026-05-30T14:22:00Z',
      createdAt: '2026-05-01T08:00:00Z',
      updatedAt: '2026-05-20T12:00:00Z',
    },
  ],
  [
    'alert-003',
    {
      id: 'alert-003',
      userId: 'user-2',
      name: 'NVDA PE Threshold',
      symbol: 'NVDA',
      conditions: [
        { field: 'pe_ratio', operator: 'lte', value: 40 },
      ],
      conditionLogic: 'AND',
      notifyVia: ['email'],
      frequency: 'daily_digest',
      enabled: false,
      triggeredCount: 0,
      lastTriggered: null,
      createdAt: '2026-04-20T15:30:00Z',
      updatedAt: '2026-04-20T15:30:00Z',
    },
  ],
]);

let nextIdNum = 4;

const router = Router();

// List all alerts
router.get('/', (req: Request, res: Response) => {
  const { userId, symbol, enabled } = req.query;

  let alerts = Array.from(alertsStore.values());

  if (typeof userId === 'string') {
    alerts = alerts.filter((a) => a.userId === userId);
  }

  if (typeof symbol === 'string') {
    alerts = alerts.filter((a) => a.symbol.toUpperCase() === symbol.toUpperCase());
  }

  if (typeof enabled === 'string') {
    alerts = alerts.filter((a) => a.enabled === (enabled === 'true'));
  }

  res.json({
    success: true,
    data: alerts,
    total: alerts.length,
  });
});

// Get single alert
router.get('/:id', (req: Request, res: Response) => {
  const alert = alertsStore.get(req.params.id);

  if (!alert) {
    res.status(404).json({
      success: false,
      error: `Alert '${req.params.id}' not found`,
    });
    return;
  }

  res.json({ success: true, data: alert });
});

// Create alert
router.post('/', (req: Request, res: Response) => {
  const { userId, name, symbol, conditions, conditionLogic, notifyVia, frequency } = req.body;

  if (!name || !symbol || !conditions || !Array.isArray(conditions) || conditions.length === 0) {
    res.status(400).json({
      success: false,
      error: 'name, symbol, and at least one condition are required',
    });
    return;
  }

  const id = `alert-${String(nextIdNum++).padStart(3, '0')}`;
  const now = new Date().toISOString();

  const newAlert: CustomAlert = {
    id,
    userId: userId || 'user-1',
    name,
    symbol: symbol.toUpperCase(),
    conditions,
    conditionLogic: conditionLogic || 'AND',
    notifyVia: notifyVia || ['email'],
    frequency: frequency || 'once',
    enabled: true,
    triggeredCount: 0,
    lastTriggered: null,
    createdAt: now,
    updatedAt: now,
  };

  alertsStore.set(id, newAlert);

  res.status(201).json({ success: true, data: newAlert });
});

// Update alert
router.put('/:id', (req: Request, res: Response) => {
  const alert = alertsStore.get(req.params.id);

  if (!alert) {
    res.status(404).json({
      success: false,
      error: `Alert '${req.params.id}' not found`,
    });
    return;
  }

  const updatable = ['name', 'symbol', 'conditions', 'conditionLogic', 'notifyVia', 'frequency', 'enabled'] as const;

  for (const field of updatable) {
    if (req.body[field] !== undefined) {
      (alert as any)[field] = req.body[field];
    }
  }

  alert.updatedAt = new Date().toISOString();
  alertsStore.set(alert.id, alert);

  res.json({ success: true, data: alert });
});

// Delete alert
router.delete('/:id', (req: Request, res: Response) => {
  if (!alertsStore.has(req.params.id)) {
    res.status(404).json({
      success: false,
      error: `Alert '${req.params.id}' not found`,
    });
    return;
  }

  alertsStore.delete(req.params.id);

  res.json({ success: true, message: `Alert '${req.params.id}' deleted` });
});

export default router;
