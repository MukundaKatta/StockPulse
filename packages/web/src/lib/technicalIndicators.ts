export function sma(data: number[], period: number): (number | null)[] {
  return data.map((_, i) => {
    if (i < period - 1) return null;
    const slice = data.slice(i - period + 1, i + 1);
    return slice.reduce((s, v) => s + v, 0) / period;
  });
}

export function ema(data: number[], period: number): (number | null)[] {
  const k = 2 / (period + 1);
  const result: (number | null)[] = new Array(data.length).fill(null);
  const first = data.slice(0, period).reduce((s, v) => s + v, 0) / period;
  result[period - 1] = first;
  for (let i = period; i < data.length; i++) {
    result[i] = data[i] * k + (result[i - 1] as number) * (1 - k);
  }
  return result;
}

export function rsi(data: number[], period = 14): (number | null)[] {
  const result: (number | null)[] = new Array(data.length).fill(null);
  if (data.length < period + 1) return result;

  let avgGain = 0;
  let avgLoss = 0;
  for (let i = 1; i <= period; i++) {
    const change = data[i] - data[i - 1];
    if (change > 0) avgGain += change;
    else avgLoss += Math.abs(change);
  }
  avgGain /= period;
  avgLoss /= period;

  result[period] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);

  for (let i = period + 1; i < data.length; i++) {
    const change = data[i] - data[i - 1];
    avgGain = (avgGain * (period - 1) + (change > 0 ? change : 0)) / period;
    avgLoss = (avgLoss * (period - 1) + (change < 0 ? Math.abs(change) : 0)) / period;
    result[i] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
  }
  return result;
}

export function bollingerBands(data: number[], period = 20, multiplier = 2): { upper: number | null; middle: number | null; lower: number | null }[] {
  const mid = sma(data, period);
  return data.map((_, i) => {
    if (mid[i] === null) return { upper: null, middle: null, lower: null };
    const slice = data.slice(i - period + 1, i + 1);
    const avg = mid[i] as number;
    const variance = slice.reduce((s, v) => s + (v - avg) ** 2, 0) / period;
    const sd = Math.sqrt(variance);
    return { upper: avg + multiplier * sd, middle: avg, lower: avg - multiplier * sd };
  });
}

export function macd(data: number[], fast = 12, slow = 26, signalPeriod = 9): { macd: number | null; signal: number | null; histogram: number | null }[] {
  const fastEma = ema(data, fast);
  const slowEma = ema(data, slow);
  const macdLine = data.map((_, i) => (fastEma[i] !== null && slowEma[i] !== null ? (fastEma[i] as number) - (slowEma[i] as number) : null));
  const validMacd = macdLine.filter((v): v is number => v !== null);
  const signalLine = ema(validMacd, signalPeriod);

  let signalIdx = 0;
  return macdLine.map((m) => {
    if (m === null) return { macd: null, signal: null, histogram: null };
    const sig = signalLine[signalIdx] ?? null;
    signalIdx++;
    return { macd: m, signal: sig, histogram: sig !== null ? m - sig : null };
  });
}

export function atr(highs: number[], lows: number[], closes: number[], period = 14): (number | null)[] {
  const result: (number | null)[] = new Array(highs.length).fill(null);
  if (highs.length < period + 1) return result;

  const trueRanges: number[] = [];
  for (let i = 1; i < highs.length; i++) {
    const tr = Math.max(highs[i] - lows[i], Math.abs(highs[i] - closes[i - 1]), Math.abs(lows[i] - closes[i - 1]));
    trueRanges.push(tr);
  }

  let sum = trueRanges.slice(0, period).reduce((s, v) => s + v, 0);
  result[period] = sum / period;
  for (let i = period; i < trueRanges.length; i++) {
    result[i + 1] = ((result[i] as number) * (period - 1) + trueRanges[i]) / period;
  }
  return result;
}
