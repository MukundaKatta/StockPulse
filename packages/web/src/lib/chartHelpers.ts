export function generateSparklinePoints(data: number[], width: number, height: number, padding = 2): string {
  if (data.length < 2) return '';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  return data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
      const y = height - ((val - min) / range) * (height - padding * 2) - padding;
      return `${x},${y}`;
    })
    .join(' ');
}

export function generateBarData(data: number[], width: number, height: number, gap = 2) {
  const max = Math.max(...data, 1);
  const barWidth = (width - gap * (data.length - 1)) / data.length;

  return data.map((val, i) => ({
    x: i * (barWidth + gap),
    y: height - (val / max) * height,
    width: barWidth,
    height: (val / max) * height,
    value: val,
  }));
}

export function getHeatmapColor(value: number, min: number, max: number): string {
  const normalized = max === min ? 0.5 : (value - min) / (max - min);
  if (normalized > 0.5) {
    const intensity = (normalized - 0.5) * 2;
    return `rgba(34, 197, 94, ${intensity * 0.6})`;
  } else {
    const intensity = (0.5 - normalized) * 2;
    return `rgba(239, 68, 68, ${intensity * 0.6})`;
  }
}

export function percentChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export function movingAverage(data: number[], period: number): (number | null)[] {
  return data.map((_, i) => {
    if (i < period - 1) return null;
    const slice = data.slice(i - period + 1, i + 1);
    return slice.reduce((s, v) => s + v, 0) / period;
  });
}

export function normalizeData(data: number[]): number[] {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  return data.map((v) => (v - min) / range);
}

export function cumulativeSum(data: number[]): number[] {
  let sum = 0;
  return data.map((v) => (sum += v));
}

export function drawdowns(values: number[]): number[] {
  let peak = values[0] || 0;
  return values.map((val) => {
    if (val > peak) peak = val;
    return peak > 0 ? ((val - peak) / peak) * 100 : 0;
  });
}
