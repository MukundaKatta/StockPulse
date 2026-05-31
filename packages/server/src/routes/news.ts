import { Router, Request, Response } from 'express';
import { z } from 'zod';
import * as finnhub from '../services/finnhub';

const router = Router();

const symbolParam = z.object({ symbol: z.string().min(1).max(10).toUpperCase() });

const newsQuery = z.object({
  days: z.coerce.number().int().min(1).max(30).default(7),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

router.get('/:symbol/news', async (req: Request, res: Response) => {
  const { symbol } = symbolParam.parse(req.params);
  const { days, limit } = newsQuery.parse(req.query);

  const now = new Date();
  const fromDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  const from = fromDate.toISOString().split('T')[0];
  const to = now.toISOString().split('T')[0];

  const news = await finnhub.getCompanyNews(symbol, from, to);
  res.json({ symbol, news: news.slice(0, limit) });
});

export default router;
