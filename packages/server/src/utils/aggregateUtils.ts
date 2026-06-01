export function sum(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((acc, val) => acc + val, 0);
}

export function average(values: number[]): number {
  if (values.length === 0) return 0;
  return sum(values) / values.length;
}

export function weightedAverage(
  values: number[],
  weights: number[]
): number {
  if (values.length === 0 || values.length !== weights.length) return 0;

  const totalWeight = sum(weights);
  if (totalWeight === 0) return 0;

  const weightedSum = values.reduce((acc, val, i) => acc + val * weights[i], 0);
  return weightedSum / totalWeight;
}

export function percentChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return newValue === 0 ? 0 : Infinity;
  return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
}

export function compoundReturn(returns: number[]): number {
  if (returns.length === 0) return 0;

  const compounded = returns.reduce((acc, r) => acc * (1 + r / 100), 1);
  return (compounded - 1) * 100;
}

export function median(values: number[]): number {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function standardDeviation(values: number[]): number {
  if (values.length < 2) return 0;

  const avg = average(values);
  const squaredDiffs = values.map((val) => (val - avg) ** 2);
  return Math.sqrt(sum(squaredDiffs) / (values.length - 1));
}

export function variance(values: number[]): number {
  const stdDev = standardDeviation(values);
  return stdDev ** 2;
}

export function min(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.min(...values);
}

export function max(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.max(...values);
}

export function range(values: number[]): number {
  if (values.length === 0) return 0;
  return max(values) - min(values);
}

export function cumulativeReturn(prices: number[]): number {
  if (prices.length < 2) return 0;
  return percentChange(prices[0], prices[prices.length - 1]);
}

export function annualizedReturn(totalReturn: number, years: number): number {
  if (years <= 0) return 0;
  return (Math.pow(1 + totalReturn / 100, 1 / years) - 1) * 100;
}

export function sharpeRatio(
  portfolioReturn: number,
  riskFreeRate: number,
  portfolioStdDev: number
): number {
  if (portfolioStdDev === 0) return 0;
  return (portfolioReturn - riskFreeRate) / portfolioStdDev;
}
