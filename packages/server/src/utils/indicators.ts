export interface OHLCV {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: string;
}

export function calculateSMA(prices: number[], period: number): (number | null)[] {
  const result: (number | null)[] = [];
  for (let i = 0; i < prices.length; i++) {
    if (i < period - 1) {
      result.push(null);
    } else {
      const slice = prices.slice(i - period + 1, i + 1);
      const sum = slice.reduce((a, b) => a + b, 0);
      result.push(sum / period);
    }
  }
  return result;
}

export function calculateEMA(prices: number[], period: number): (number | null)[] {
  const result: (number | null)[] = [];
  const k = 2 / (period + 1);

  // First EMA value is SMA
  let ema: number | null = null;
  for (let i = 0; i < prices.length; i++) {
    if (i < period - 1) {
      result.push(null);
    } else if (i === period - 1) {
      const slice = prices.slice(0, period);
      ema = slice.reduce((a, b) => a + b, 0) / period;
      result.push(ema);
    } else {
      ema = prices[i] * k + ema! * (1 - k);
      result.push(ema);
    }
  }
  return result;
}

export function calculateRSI(prices: number[], period: number = 14): (number | null)[] {
  const result: (number | null)[] = [];
  const changes: number[] = [];

  for (let i = 1; i < prices.length; i++) {
    changes.push(prices[i] - prices[i - 1]);
  }

  // First RSI uses SMA of gains/losses
  let avgGain = 0;
  let avgLoss = 0;

  for (let i = 0; i < changes.length; i++) {
    if (i < period) {
      result.push(null);
      if (i === period - 1) {
        let totalGain = 0;
        let totalLoss = 0;
        for (let j = 0; j <= i; j++) {
          if (changes[j] > 0) totalGain += changes[j];
          else totalLoss += Math.abs(changes[j]);
        }
        avgGain = totalGain / period;
        avgLoss = totalLoss / period;
        const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        result.push(100 - 100 / (1 + rs));
      }
    } else {
      const change = changes[i];
      const gain = change > 0 ? change : 0;
      const loss = change < 0 ? Math.abs(change) : 0;
      avgGain = (avgGain * (period - 1) + gain) / period;
      avgLoss = (avgLoss * (period - 1) + loss) / period;
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      result.push(100 - 100 / (1 + rs));
    }
  }

  // Pad the start with null since we need price[0] as baseline
  result.unshift(null);
  return result;
}

export interface MACDResult {
  macd: number | null;
  signal: number | null;
  histogram: number | null;
}

export function calculateMACD(
  prices: number[],
  fastPeriod: number = 12,
  slowPeriod: number = 26,
  signalPeriod: number = 9
): MACDResult[] {
  const fastEMA = calculateEMA(prices, fastPeriod);
  const slowEMA = calculateEMA(prices, slowPeriod);

  const macdLine: (number | null)[] = [];
  for (let i = 0; i < prices.length; i++) {
    if (fastEMA[i] !== null && slowEMA[i] !== null) {
      macdLine.push(fastEMA[i]! - slowEMA[i]!);
    } else {
      macdLine.push(null);
    }
  }

  // Calculate signal line (EMA of MACD values)
  const validMacd = macdLine.filter((v): v is number => v !== null);
  const signalEMA = calculateEMA(validMacd, signalPeriod);

  const result: MACDResult[] = [];
  let validIndex = 0;
  for (let i = 0; i < prices.length; i++) {
    if (macdLine[i] === null) {
      result.push({ macd: null, signal: null, histogram: null });
    } else {
      const signal = signalEMA[validIndex] ?? null;
      const histogram = signal !== null ? macdLine[i]! - signal : null;
      result.push({ macd: macdLine[i], signal, histogram });
      validIndex++;
    }
  }

  return result;
}

export interface BollingerBand {
  upper: number | null;
  middle: number | null;
  lower: number | null;
}

export function calculateBollingerBands(
  prices: number[],
  period: number = 20,
  multiplier: number = 2
): BollingerBand[] {
  const sma = calculateSMA(prices, period);
  const result: BollingerBand[] = [];

  for (let i = 0; i < prices.length; i++) {
    if (sma[i] === null) {
      result.push({ upper: null, middle: null, lower: null });
    } else {
      const slice = prices.slice(i - period + 1, i + 1);
      const mean = sma[i]!;
      const variance = slice.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / period;
      const stdDev = Math.sqrt(variance);
      result.push({
        upper: mean + multiplier * stdDev,
        middle: mean,
        lower: mean - multiplier * stdDev,
      });
    }
  }

  return result;
}

export function calculateVWAP(data: OHLCV[]): (number | null)[] {
  const result: (number | null)[] = [];
  let cumulativeTPV = 0;
  let cumulativeVolume = 0;

  for (const bar of data) {
    const typicalPrice = (bar.high + bar.low + bar.close) / 3;
    cumulativeTPV += typicalPrice * bar.volume;
    cumulativeVolume += bar.volume;
    result.push(cumulativeVolume > 0 ? cumulativeTPV / cumulativeVolume : null);
  }

  return result;
}

export function generateSignalSummary(
  rsi: number | null,
  macd: MACDResult | null,
  price: number,
  sma200: number | null
): { signal: 'BUY' | 'HOLD' | 'SELL'; confidence: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  if (rsi !== null) {
    if (rsi < 30) {
      score += 2;
      reasons.push('RSI oversold');
    } else if (rsi > 70) {
      score -= 2;
      reasons.push('RSI overbought');
    } else if (rsi < 50) {
      score += 1;
      reasons.push('RSI below midpoint');
    } else {
      score -= 1;
      reasons.push('RSI above midpoint');
    }
  }

  if (macd?.histogram !== null && macd?.histogram !== undefined) {
    if (macd.histogram > 0) {
      score += 1;
      reasons.push('MACD bullish');
    } else {
      score -= 1;
      reasons.push('MACD bearish');
    }
  }

  if (sma200 !== null) {
    if (price > sma200) {
      score += 1;
      reasons.push('Price above SMA200');
    } else {
      score -= 1;
      reasons.push('Price below SMA200');
    }
  }

  const maxScore = 4;
  const normalizedScore = score / maxScore;
  const confidence = Math.min(Math.abs(normalizedScore) * 100, 100);

  let signal: 'BUY' | 'HOLD' | 'SELL';
  if (score >= 2) signal = 'BUY';
  else if (score <= -2) signal = 'SELL';
  else signal = 'HOLD';

  return { signal, confidence: Math.round(confidence), reasons };
}
