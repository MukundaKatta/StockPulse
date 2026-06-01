export function heatmapColor(value: number, min = -5, max = 5): string {
  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));
  if (normalized < 0.5) {
    const t = normalized * 2;
    const r = Math.round(239 * (1 - t));
    const g = Math.round(68 * (1 - t) + 68 * t);
    const b = Math.round(68 * (1 - t));
    return `rgb(${r}, ${g}, ${b})`;
  }
  const t = (normalized - 0.5) * 2;
  const r = Math.round(68 * (1 - t));
  const g = Math.round(68 * (1 - t) + 200 * t);
  const b = Math.round(68 * (1 - t) + 100 * t);
  return `rgb(${r}, ${g}, ${b})`;
}

export function alphaColor(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const CHART_COLORS = [
  '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#ef4444', '#f97316',
  '#eab308', '#22c55e', '#14b8a6', '#06b6d4',
] as const;

export function getChartColor(index: number): string {
  return CHART_COLORS[index % CHART_COLORS.length];
}

export function percentToColor(pct: number): string {
  if (pct >= 2) return '#4ade80';
  if (pct >= 0) return '#86efac';
  if (pct >= -2) return '#fca5a5';
  return '#f87171';
}

export function scoreToColor(score: number, max = 100): string {
  const pct = score / max;
  if (pct >= 0.8) return '#4ade80';
  if (pct >= 0.6) return '#a3e635';
  if (pct >= 0.4) return '#facc15';
  if (pct >= 0.2) return '#fb923c';
  return '#f87171';
}
