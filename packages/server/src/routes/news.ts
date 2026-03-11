import { Router, Request, Response } from 'express';
import { z } from 'zod';
import * as finnhub from '../services/finnhub';

const router = Router();

const symbolParam = z.object({ symbol: z.string().min(1).max(10).toUpperCase() });

router.get('/:symbol/news', async (req: Request, res: Response) => {
  const { symbol } = symbolParam.parse(req.params);
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const from = weekAgo.toISOString().split('T')[0];
  const to = now.toISOString().split('T')[0];

  const news = await finnhub.getCompanyNews(symbol, from, to);
  res.json({ symbol, news });
});

export default router;
