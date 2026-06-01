import { Router, Request, Response } from 'express';

interface OHLCVCandle {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface ChartDataResponse {
  symbol: string;
  interval: string;
  currency: string;
  candles: OHLCVCandle[];
  meta: {
    totalCandles: number;
    startTime: string;
    endTime: string;
    previousClose: number;
  };
}

function generateCandles(
  symbol: string,
  intervalMinutes: number,
  count: number
): OHLCVCandle[] {
  const basePrices: Record<string, number> = {
    AAPL: 198,
    MSFT: 428,
    GOOGL: 178,
    AMZN: 192,
    TSLA: 245,
    NVDA: 950,
    META: 510,
    AMD: 179,
    JPM: 205,
    NFLX: 640,
  };

  const basePrice = basePrices[symbol.toUpperCase()] || 100;
  const candles: OHLCVCandle[] = [];
  let price = basePrice * (1 - Math.random() * 0.05);

  const endTime = new Date();
  const startTime = new Date(endTime.getTime() - count * intervalMinutes * 60 * 1000);

  for (let i = 0; i < count; i++) {
    const candleTime = new Date(startTime.getTime() + i * intervalMinutes * 60 * 1000);

    const volatility = 0.002 * Math.sqrt(intervalMinutes / 5);
    const change = price * (Math.random() - 0.48) * volatility * 2;
    const open = price;
    price = price + change;
    const close = price;

    const wickUp = Math.abs(change) * (0.5 + Math.random());
    const wickDown = Math.abs(change) * (0.5 + Math.random());
    const high = Math.max(open, close) + wickUp;
    const low = Math.min(open, close) - wickDown;

    const baseVolume = intervalMinutes >= 1440 ? 50_000_000 : intervalMinutes >= 60 ? 5_000_000 : 500_000;

    candles.push({
      timestamp: candleTime.toISOString(),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: Math.floor(baseVolume * (0.5 + Math.random())),
    });
  }

  return candles;
}

const validIntervals: Record<string, { minutes: number; defaultCount: number }> = {
  '1m': { minutes: 1, defaultCount: 390 },
  '5m': { minutes: 5, defaultCount: 78 },
  '15m': { minutes: 15, defaultCount: 78 },
  '30m': { minutes: 30, defaultCount: 60 },
  '1h': { minutes: 60, defaultCount: 120 },
  '4h': { minutes: 240, defaultCount: 90 },
  '1d': { minutes: 1440, defaultCount: 180 },
  '1w': { minutes: 10080, defaultCount: 104 },
};

const router = Router();

router.get('/:symbol', (req: Request, res: Response) => {
  const symbol = req.params.symbol.toUpperCase();
  const interval = (req.query.interval as string) || '1d';
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

  const intervalConfig = validIntervals[interval];
  if (!intervalConfig) {
    res.status(400).json({
      success: false,
      error: `Invalid interval '${interval}'. Valid intervals: ${Object.keys(validIntervals).join(', ')}`,
    });
    return;
  }

  const count = Math.min(limit || intervalConfig.defaultCount, 1000);
  const candles = generateCandles(symbol, intervalConfig.minutes, count);

  const response: ChartDataResponse = {
    symbol,
    interval,
    currency: 'USD',
    candles,
    meta: {
      totalCandles: candles.length,
      startTime: candles[0]?.timestamp || '',
      endTime: candles[candles.length - 1]?.timestamp || '',
      previousClose: candles.length > 0 ? candles[0].open : 0,
    },
  };

  res.json({
    success: true,
    data: response,
  });
});

export default router;
