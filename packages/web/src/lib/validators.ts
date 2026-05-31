export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidTicker(ticker: string): boolean {
  return /^[A-Z]{1,5}(\.[A-Z])?$/.test(ticker.toUpperCase());
}

export function isPositiveNumber(val: unknown): val is number {
  return typeof val === 'number' && val > 0 && isFinite(val);
}

export function isValidDate(dateStr: string): boolean {
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}

export function isWithinRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>&"']/g, (char) => {
    const map: Record<string, string> = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' };
    return map[char] || char;
  });
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

export function isNonEmptyString(val: unknown): val is string {
  return typeof val === 'string' && val.trim().length > 0;
}

export function parseNumber(val: string | number | undefined, fallback: number): number {
  if (val === undefined) return fallback;
  const n = typeof val === 'string' ? parseFloat(val) : val;
  return isNaN(n) ? fallback : n;
}
