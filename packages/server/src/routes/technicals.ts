import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { calculateIndicators } from '../services/technicalCalc';

const router = Router();

const symbolParam = z.object({ symbol: z.string().min(1).max(10).toUpperCase() });
const query = z.object({
  timeframe: z.enum(['1min', '5min', '15min', '30min', '60min', 'daily']).default('daily'),
});

router.get('/:symbol/indicators', async (req: Request, res: Response) => {
  const { symbol } = symbolParam.parse(req.params);
  const { timeframe } = query.parse(req.query);
  const indicators = await calculateIndicators(symbol, timeframe);
  res.json({ symbol, timeframe, indicators });
});

export default router;
