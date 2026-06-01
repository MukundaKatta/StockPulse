export function formatCompact(value: number): string {
  if (Math.abs(value) >= 1e12) return `${(value / 1e12).toFixed(1)}T`;
  if (Math.abs(value) >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
  if (Math.abs(value) >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
  if (Math.abs(value) >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
  return value.toFixed(0);
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

export function formatBasisPoints(value: number): string {
  return `${(value * 100).toFixed(0)}bps`;
}

export function formatMultiple(value: number): string {
  return `${value.toFixed(1)}x`;
}

export function formatRatio(num: number, den: number): string {
  if (den === 0) return 'N/A';
  return (num / den).toFixed(2);
}

export function formatOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function formatSignedCurrency(value: number): string {
  const abs = Math.abs(value);
  const formatted = abs >= 1e9 ? `$${(abs / 1e9).toFixed(2)}B` : abs >= 1e6 ? `$${(abs / 1e6).toFixed(2)}M` : `$${abs.toFixed(2)}`;
  return value >= 0 ? `+${formatted}` : `-${formatted}`;
}

export function clampDecimals(value: number, min: number, max: number): string {
  const abs = Math.abs(value);
  const decimals = abs >= 1000 ? min : abs >= 1 ? Math.min(min + 1, max) : max;
  return value.toFixed(decimals);
}
