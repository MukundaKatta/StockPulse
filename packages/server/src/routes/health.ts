import { Router, Request, Response } from 'express';

const router = Router();

const startTime = Date.now();

router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    uptime: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

export default router;
