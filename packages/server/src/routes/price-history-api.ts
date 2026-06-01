import { Router, Request, Response } from 'express';

interface PricePoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjustedClose: number;
}

interface PriceHistoryEntry {
  symbol: string;
  currency: string;
  data: PricePoint[];
}

function generatePriceHistory(symbol: string, days: number): PricePoint[] {
  const basePrices: Record<string, number> = {
    AAPL: 195,
    MSFT: 425,
    GOOGL: 178,
    AMZN: 190,
    TSLA: 245,
    NVDA: 950,
    META: 510,
    JPM: 205,
  };

  const basePrice = basePrices[symbol.toUpperCase()] || 100;
  const points: PricePoint[] = [];
  let currentPrice = basePrice;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    const changePercent = (Math.random() - 0.48) * 0.04;
    currentPrice = currentPrice * (1 + changePercent);

    const dayHigh = currentPrice * (1 + Math.random() * 0.02);
    const dayLow = currentPrice * (1 - Math.random() * 0.02);
    const open = dayLow + Math.random() * (dayHigh - dayLow);

    points.push({
      date: dateStr,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(dayHigh.toFixed(2)),
      low: parseFloat(dayLow.toFixed(2)),
      close: parseFloat(currentPrice.toFixed(2)),
      volume: Math.floor(10_000_000 + Math.random() * 50_000_000),
      adjustedClose: parseFloat(currentPrice.toFixed(2)),
    });
  }

  return points;
}

const cache = new Map<string, PriceHistoryEntry>();

const router = Router();

router.get('/:symbol', (req: Request, res: Response) => {
  const { symbol } = req.params;
  const period = (req.query.period as string) || '1M';

  const periodDays: Record<string, number> = {
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '6M': 180,
    '1Y': 365,
    '2Y': 730,
    '5Y': 1825,
    YTD: Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24)
    ),
  };

  const days = periodDays[period.toUpperCase()];
  if (!days) {
    res.status(400).json({
      success: false,
      error: `Invalid period '${period}'. Valid periods: ${Object.keys(periodDays).join(', ')}`,
    });
    return;
  }

  const cacheKey = `${symbol.toUpperCase()}-${period}`;
  if (!cache.has(cacheKey)) {
    cache.set(cacheKey, {
      symbol: symbol.toUpperCase(),
      currency: 'USD',
      data: generatePriceHistory(symbol, days),
    });
  }

  const entry = cache.get(cacheKey)!;

  res.json({
    success: true,
    symbol: entry.symbol,
    period,
    currency: entry.currency,
    dataPoints: entry.data.length,
    data: entry.data,
  });
});

export default router;
