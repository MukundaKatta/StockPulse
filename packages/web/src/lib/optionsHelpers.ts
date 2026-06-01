function normalCDF(x: number): number {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x) / Math.sqrt(2);
  const t = 1.0 / (1.0 + p * ax);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
  return 0.5 * (1.0 + sign * y);
}

export function blackScholes(S: number, K: number, T: number, r: number, sigma: number, type: 'call' | 'put'): number {
  if (T <= 0) return Math.max(type === 'call' ? S - K : K - S, 0);
  const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  if (type === 'call') return S * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
  return K * Math.exp(-r * T) * normalCDF(-d2) - S * normalCDF(-d1);
}

export function impliedVolatility(marketPrice: number, S: number, K: number, T: number, r: number, type: 'call' | 'put'): number {
  let sigma = 0.3;
  for (let i = 0; i < 100; i++) {
    const price = blackScholes(S, K, T, r, sigma, type);
    const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
    const vega = S * Math.exp(-d1 * d1 / 2) / Math.sqrt(2 * Math.PI) * Math.sqrt(T);
    if (vega < 1e-10) break;
    const diff = price - marketPrice;
    if (Math.abs(diff) < 0.001) break;
    sigma -= diff / vega;
    if (sigma <= 0) sigma = 0.001;
  }
  return sigma;
}

export function putCallParity(callPrice: number, S: number, K: number, T: number, r: number): number {
  return callPrice - S + K * Math.exp(-r * T);
}

export function intrinsicValue(S: number, K: number, type: 'call' | 'put'): number {
  return Math.max(type === 'call' ? S - K : K - S, 0);
}

export function timeValue(optionPrice: number, S: number, K: number, type: 'call' | 'put'): number {
  return optionPrice - intrinsicValue(S, K, type);
}

export function breakeven(strike: number, premium: number, type: 'call' | 'put'): number {
  return type === 'call' ? strike + premium : strike - premium;
}

export function maxLoss(premium: number, contracts = 1): number {
  return premium * 100 * contracts;
}

export function maxProfit(strike: number, premium: number, type: 'call' | 'put', contracts = 1): number | null {
  if (type === 'call') return null; // unlimited
  return (strike - premium) * 100 * contracts;
}
