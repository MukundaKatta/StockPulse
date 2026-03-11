import { getDailyPrices, getIntradayPrices } from './alphaVantage';
import { getCached, setCache } from './cacheManager';
import {
  calculateSMA,
  calculateEMA,
  calculateRSI,
  calculateMACD,
  calculateBollingerBands,
  calculateVWAP,
  generateSignalSummary,
  OHLCV,
} from '../utils/indicators';

export interface TechnicalIndicators {
  rsi: { values: (number | null)[]; current: number | null };
  macd: {
    macd: (number | null)[];
    signal: (number | null)[];
    histogram: (number | null)[];
    current: { macd: number | null; signal: number | null; histogram: number | null };
  };
  sma: {
    sma20: (number | null)[];
    sma50: (number | null)[];
    sma200: (number | null)[];
  };
  ema: {
    ema12: (number | null)[];
    ema26: (number | null)[];
  };
  bollingerBands: {
    upper: (number | null)[];
    middle: (number | null)[];
    lower: (number | null)[];
  };
  vwap: (number | null)[];
  signal: { signal: 'BUY' | 'HOLD' | 'SELL'; confidence: number; reasons: string[] };
  timestamps: string[];
}

export async function calculateIndicators(symbol: string, timeframe: string = 'daily'): Promise<TechnicalIndicators> {
  const cacheKey = `indicators-${timeframe}`;
  const cached = await getCached<TechnicalIndicators>('INDICATORS', symbol, cacheKey);
  if (cached) return cached;

  let data: OHLCV[];
  if (timeframe === 'daily') {
    data = await getDailyPrices(symbol, 'full');
  } else {
    data = await getIntradayPrices(symbol, timeframe);
  }

  const closes = data.map((d) => d.close);
  const timestamps = data.map((d) => d.timestamp);

  const rsiValues = calculateRSI(closes, 14);
  const macdValues = calculateMACD(closes, 12, 26, 9);
  const sma20 = calculateSMA(closes, 20);
  const sma50 = calculateSMA(closes, 50);
  const sma200 = calculateSMA(closes, 200);
  const ema12 = calculateEMA(closes, 12);
  const ema26 = calculateEMA(closes, 26);
  const bb = calculateBollingerBands(closes, 20, 2);
  const vwap = calculateVWAP(data);

  const lastRSI = rsiValues.filter((v): v is number => v !== null).pop() ?? null;
  const lastMACD = macdValues[macdValues.length - 1] ?? { macd: null, signal: null, histogram: null };
  const lastSMA200 = sma200.filter((v): v is number => v !== null).pop() ?? null;
  const lastPrice = closes[closes.length - 1];

  const signal = generateSignalSummary(lastRSI, lastMACD, lastPrice, lastSMA200);

  const result: TechnicalIndicators = {
    rsi: { values: rsiValues, current: lastRSI },
    macd: {
      macd: macdValues.map((m) => m.macd),
      signal: macdValues.map((m) => m.signal),
      histogram: macdValues.map((m) => m.histogram),
      current: lastMACD,
    },
    sma: { sma20, sma50, sma200 },
    ema: { ema12, ema26 },
    bollingerBands: {
      upper: bb.map((b) => b.upper),
      middle: bb.map((b) => b.middle),
      lower: bb.map((b) => b.lower),
    },
    vwap,
    signal,
    timestamps,
  };

  await setCache('INDICATORS', symbol, result, cacheKey);
  return result;
}
