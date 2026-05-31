export function calculateCAGR(beginValue: number, endValue: number, years: number): number {
  if (beginValue <= 0 || years <= 0) return 0;
  return (Math.pow(endValue / beginValue, 1 / years) - 1) * 100;
}

export function calculateSharpeRatio(returns: number[], riskFreeRate: number): number {
  const n = returns.length;
  if (n < 2) return 0;
  const avgReturn = returns.reduce((s, r) => s + r, 0) / n;
  const variance = returns.reduce((s, r) => s + Math.pow(r - avgReturn, 2), 0) / (n - 1);
  const stdDev = Math.sqrt(variance);
  if (stdDev === 0) return 0;
  return (avgReturn - riskFreeRate) / stdDev;
}

export function calculateMaxDrawdown(values: number[]): number {
  let maxDD = 0;
  let peak = values[0] || 0;
  for (const val of values) {
    if (val > peak) peak = val;
    const dd = (peak - val) / peak;
    if (dd > maxDD) maxDD = dd;
  }
  return maxDD * 100;
}

export function calculateRSI(prices: number[], period = 14): number {
  if (prices.length < period + 1) return 50;
  let gains = 0;
  let losses = 0;
  for (let i = prices.length - period; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    if (change > 0) gains += change;
    else losses += Math.abs(change);
  }
  const avgGain = gains / period;
  const avgLoss = losses / period;
  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return 100 - 100 / (1 + rs);
}

export function calculateSMA(prices: number[], period: number): number | null {
  if (prices.length < period) return null;
  const slice = prices.slice(-period);
  return slice.reduce((s, p) => s + p, 0) / period;
}

export function calculateEMA(prices: number[], period: number): number | null {
  if (prices.length < period) return null;
  const multiplier = 2 / (period + 1);
  let ema = prices.slice(0, period).reduce((s, p) => s + p, 0) / period;
  for (let i = period; i < prices.length; i++) {
    ema = (prices[i] - ema) * multiplier + ema;
  }
  return ema;
}

export function calculateBollingerBands(prices: number[], period = 20, stdDevMultiplier = 2) {
  const sma = calculateSMA(prices, period);
  if (sma === null) return null;
  const slice = prices.slice(-period);
  const variance = slice.reduce((s, p) => s + Math.pow(p - sma, 2), 0) / period;
  const stdDev = Math.sqrt(variance);
  return {
    upper: sma + stdDev * stdDevMultiplier,
    middle: sma,
    lower: sma - stdDev * stdDevMultiplier,
  };
}

export function calculateCompoundInterest(principal: number, rate: number, years: number, monthlyContribution = 0): number {
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  let total = principal;
  for (let i = 0; i < months; i++) {
    total = total * (1 + monthlyRate) + monthlyContribution;
  }
  return total;
}

export function calculatePositionSize(accountSize: number, riskPercent: number, entryPrice: number, stopLoss: number): number {
  const riskAmount = accountSize * (riskPercent / 100);
  const riskPerShare = Math.abs(entryPrice - stopLoss);
  if (riskPerShare === 0) return 0;
  return Math.floor(riskAmount / riskPerShare);
}
