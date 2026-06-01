import { Router, Request, Response } from 'express';

const router = Router();

interface SentimentData {
  symbol: string;
  name: string;
  sentiment: number;
  mentions: number;
  change24h: number;
  bullish: number;
  bearish: number;
  neutral: number;
  trending: boolean;
  sources: { platform: string; mentions: number; sentiment: number }[];
}

const SENTIMENTS: SentimentData[] = [
  { symbol: 'NVDA', name: 'NVIDIA', sentiment: 0.82, mentions: 14520, change24h: 28.4, bullish: 72, bearish: 12, neutral: 16, trending: true, sources: [{ platform: 'Reddit', mentions: 8400, sentiment: 0.85 }, { platform: 'Twitter', mentions: 6120, sentiment: 0.78 }] },
  { symbol: 'TSLA', name: 'Tesla', sentiment: 0.38, mentions: 22800, change24h: -12.5, bullish: 35, bearish: 42, neutral: 23, trending: true, sources: [{ platform: 'Reddit', mentions: 12500, sentiment: 0.32 }, { platform: 'Twitter', mentions: 10300, sentiment: 0.44 }] },
  { symbol: 'AAPL', name: 'Apple', sentiment: 0.64, mentions: 8950, change24h: 5.2, bullish: 58, bearish: 18, neutral: 24, trending: false, sources: [{ platform: 'Reddit', mentions: 4200, sentiment: 0.68 }, { platform: 'Twitter', mentions: 4750, sentiment: 0.61 }] },
  { symbol: 'GME', name: 'GameStop', sentiment: 0.72, mentions: 6800, change24h: 45.2, bullish: 68, bearish: 15, neutral: 17, trending: true, sources: [{ platform: 'Reddit', mentions: 5800, sentiment: 0.78 }, { platform: 'Twitter', mentions: 1000, sentiment: 0.42 }] },
  { symbol: 'META', name: 'Meta', sentiment: 0.71, mentions: 5420, change24h: 8.8, bullish: 62, bearish: 20, neutral: 18, trending: false, sources: [{ platform: 'Reddit', mentions: 2800, sentiment: 0.74 }, { platform: 'Twitter', mentions: 2620, sentiment: 0.68 }] },
];

router.get('/', (req: Request, res: Response) => {
  const { trending } = req.query;
  let result = SENTIMENTS;
  if (trending === 'true') {
    result = SENTIMENTS.filter((s) => s.trending);
  }
  res.json({ sentiments: result.map(({ sources, ...rest }) => rest) });
});

router.get('/:symbol', (req: Request, res: Response) => {
  const data = SENTIMENTS.find((s) => s.symbol.toLowerCase() === req.params.symbol.toLowerCase());
  if (!data) {
    res.status(404).json({ error: 'Sentiment data not found' });
    return;
  }
  res.json({ sentiment: data });
});

export default router;
