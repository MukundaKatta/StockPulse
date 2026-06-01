import { Router, Request, Response } from 'express';

const router = Router();

interface FeatureFlag {
  key: string;
  enabled: boolean;
  description: string;
  updatedAt: string;
}

const flags: Map<string, FeatureFlag> = new Map([
  ['dark_mode', { key: 'dark_mode', enabled: true, description: 'Enable dark mode UI', updatedAt: '2026-04-01T00:00:00Z' }],
  ['real_time_streaming', { key: 'real_time_streaming', enabled: true, description: 'Enable real-time price streaming via WebSocket', updatedAt: '2026-03-15T00:00:00Z' }],
  ['ai_insights', { key: 'ai_insights', enabled: false, description: 'AI-powered market insights', updatedAt: '2026-05-01T00:00:00Z' }],
  ['paper_trading', { key: 'paper_trading', enabled: true, description: 'Paper trading sandbox mode', updatedAt: '2026-04-20T00:00:00Z' }],
  ['beta_screener', { key: 'beta_screener', enabled: false, description: 'Beta stock screener with advanced filters', updatedAt: '2026-05-10T00:00:00Z' }],
]);

router.get('/', (req: Request, res: Response) => {
  res.json({ flags: Array.from(flags.values()) });
});

router.get('/:key', (req: Request, res: Response) => {
  const flag = flags.get(req.params.key);
  if (!flag) {
    res.status(404).json({ error: 'Feature flag not found' });
    return;
  }
  res.json({ flag });
});

router.put('/:key', (req: Request, res: Response) => {
  const { key } = req.params;
  const { enabled, description } = req.body as { enabled?: boolean; description?: string };
  const existing = flags.get(key);
  const flag: FeatureFlag = {
    key,
    enabled: enabled ?? existing?.enabled ?? false,
    description: description ?? existing?.description ?? '',
    updatedAt: new Date().toISOString(),
  };
  flags.set(key, flag);
  res.json({ flag });
});

export default router;
