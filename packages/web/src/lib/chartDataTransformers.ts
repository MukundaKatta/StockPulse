export interface TimeSeriesPoint {
  date: string;
  value: number;
}

export interface OHLCBar {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export function normalizeTimeSeries(data: TimeSeriesPoint[], baseValue = 100): TimeSeriesPoint[] {
  if (data.length === 0) return [];
  const base = data[0].value;
  return data.map((d) => ({ date: d.date, value: (d.value / base) * baseValue }));
}

export function cumulativeReturn(data: TimeSeriesPoint[]): TimeSeriesPoint[] {
  if (data.length === 0) return [];
  const base = data[0].value;
  return data.map((d) => ({ date: d.date, value: ((d.value - base) / base) * 100 }));
}

export function rollingAverage(data: TimeSeriesPoint[], window: number): TimeSeriesPoint[] {
  return data.map((d, i) => {
    const start = Math.max(0, i - window + 1);
    const slice = data.slice(start, i + 1);
    const avg = slice.reduce((s, p) => s + p.value, 0) / slice.length;
    return { date: d.date, value: avg };
  });
}

export function dailyReturns(data: TimeSeriesPoint[]): TimeSeriesPoint[] {
  return data.slice(1).map((d, i) => ({
    date: d.date,
    value: ((d.value - data[i].value) / data[i].value) * 100,
  }));
}

export function drawdownSeries(data: TimeSeriesPoint[]): TimeSeriesPoint[] {
  let peak = -Infinity;
  return data.map((d) => {
    if (d.value > peak) peak = d.value;
    return { date: d.date, value: ((d.value - peak) / peak) * 100 };
  });
}

export function resampleWeekly(data: OHLCBar[]): OHLCBar[] {
  const weeks: OHLCBar[][] = [];
  let current: OHLCBar[] = [];

  for (const bar of data) {
    const day = new Date(bar.date).getDay();
    if (day === 1 && current.length > 0) {
      weeks.push(current);
      current = [];
    }
    current.push(bar);
  }
  if (current.length > 0) weeks.push(current);

  return weeks.map((w) => ({
    date: w[0].date,
    open: w[0].open,
    high: Math.max(...w.map((b) => b.high)),
    low: Math.min(...w.map((b) => b.low)),
    close: w[w.length - 1].close,
    volume: w.reduce((s, b) => s + (b.volume ?? 0), 0),
  }));
}
