import { Router, Request, Response } from 'express';
import { z } from 'zod';
import * as alphaVantage from '../services/alphaVantage';
import * as finnhub from '../services/finnhub';

const router = Router();

const symbolParam = z.object({ symbol: z.string().min(1).max(10).toUpperCase() });
const historyQuery = z.object({
  interval: z.enum(['1min', '5min', '15min', '30min', '60min', 'daily']).default('daily'),
  outputSize: z.enum(['compact', 'full']).default('compact'),
});

router.get('/search', async (req: Request, res: Response) => {
  const { q } = z.object({ q: z.string().min(1) }).parse(req.query);
  const [avResults, fhResults] = await Promise.allSettled([
    alphaVantage.searchSymbol(q),
    finnhub.searchSymbol(q),
  ]);

  const results = avResults.status === 'fulfilled' ? avResults.value : [];
  const fhExtra = fhResults.status === 'fulfilled' ? fhResults.value : [];

  // Merge and deduplicate
  const seen = new Set(results.map((r) => r.symbol));
  for (const r of fhExtra) {
    if (!seen.has(r.symbol)) {
      results.push({ symbol: r.symbol, name: r.description, type: r.type, region: 'US' });
    }
  }

  res.json({ results: results.slice(0, 10) });
});

router.get('/:symbol/quote', async (req: Request, res: Response) => {
  const { symbol } = symbolParam.parse(req.params);
  const quote = await alphaVantage.getQuote(symbol);
  res.json({ quote });
});

router.get('/:symbol/history', async (req: Request, res: Response) => {
  const { symbol } = symbolParam.parse(req.params);
  const { interval, outputSize } = historyQuery.parse(req.query);

  let prices;
  if (interval === 'daily') {
    prices = await alphaVantage.getDailyPrices(symbol, outputSize);
  } else {
    prices = await alphaVantage.getIntradayPrices(symbol, interval);
  }

  res.json({ symbol, interval, data: prices });
});

router.get('/:symbol/overview', async (req: Request, res: Response) => {
  const { symbol } = symbolParam.parse(req.params);
  const overview = await alphaVantage.getCompanyOverview(symbol);
  res.json({ overview });
});

// Batch quote endpoint - fetches multiple symbols at once
router.post('/batch/quotes', async (req: Request, res: Response) => {
  const { symbols } = z.object({
    symbols: z.array(z.string().min(1).max(10).toUpperCase()).min(1).max(20),
  }).parse(req.body);

  const results = await Promise.allSettled(
    symbols.map((symbol) => alphaVantage.getQuote(symbol))
  );

  const quotes: Record<string, unknown> = {};
  const errors: string[] = [];

  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      quotes[symbols[i]] = result.value;
    } else {
      errors.push(symbols[i]);
    }
  });

  res.json({ quotes, errors });
});

export default router;
