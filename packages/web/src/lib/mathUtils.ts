/**
 * Math utility functions for numerical computations.
 */

/** Clamp a number between a minimum and maximum value. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation between two values. */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/** Round a number to a given number of decimal places. */
export function round(value: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/** Calculate the arithmetic mean of an array of numbers. */
export function mean(values: number[]): number {
  if (values.length === 0) throw new Error('Cannot compute mean of empty array');
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/** Calculate the median of an array of numbers. */
export function median(values: number[]): number {
  if (values.length === 0) throw new Error('Cannot compute median of empty array');
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

/** Calculate the standard deviation of an array of numbers. */
export function standardDeviation(values: number[]): number {
  if (values.length < 2)
    throw new Error('Need at least 2 values for standard deviation');
  const avg = mean(values);
  const squaredDiffs = values.map((v) => Math.pow(v - avg, 2));
  return Math.sqrt(squaredDiffs.reduce((sum, v) => sum + v, 0) / (values.length - 1));
}

/** Calculate the nth percentile of an array of numbers. */
export function percentile(values: number[], p: number): number {
  if (values.length === 0)
    throw new Error('Cannot compute percentile of empty array');
  if (p < 0 || p > 100) throw new Error('Percentile must be between 0 and 100');

  const sorted = [...values].sort((a, b) => a - b);
  const index = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);

  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
}

/** Normalize a value from one range to [0, 1]. */
export function normalize(
  value: number,
  min: number,
  max: number
): number {
  if (min === max) return 0;
  return (value - min) / (max - min);
}
