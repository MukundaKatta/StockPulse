import { Router, Request, Response } from 'express';
import crypto from 'crypto';

const router = Router();

interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  keyHash: string;
  createdAt: string;
  lastUsedAt: string | null;
}

const keysStore = new Map<string, ApiKey[]>();

// List API keys
router.get('/', (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string || 'default';
  const keys = keysStore.get(userId) || [];
  res.json({
    keys: keys.map(({ keyHash: _h, ...rest }) => rest),
  });
});

// Create API key
router.post('/', (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string || 'default';
  const name: string = req.body.name || 'Untitled Key';
  const rawKey = `sp_${crypto.randomBytes(24).toString('base64url')}`;
  const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');
  const keyPrefix = rawKey.slice(0, 8);

  const apiKey: ApiKey = {
    id: crypto.randomUUID(),
    name,
    keyPrefix,
    keyHash,
    createdAt: new Date().toISOString(),
    lastUsedAt: null,
  };

  const keys = keysStore.get(userId) || [];
  keys.push(apiKey);
  keysStore.set(userId, keys);

  res.status(201).json({ key: rawKey, id: apiKey.id, name: apiKey.name });
});

// Delete API key
router.delete('/:id', (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string || 'default';
  const keys = keysStore.get(userId) || [];
  const index = keys.findIndex((k) => k.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ error: 'API key not found' });
    return;
  }

  keys.splice(index, 1);
  keysStore.set(userId, keys);
  res.json({ success: true });
});

export default router;
