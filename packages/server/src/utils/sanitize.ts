export function sanitizeString(input: string, maxLength = 1000): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
    .slice(0, maxLength);
}

export function sanitizeSymbol(symbol: string): string {
  return symbol.replace(/[^A-Z0-9.\-]/gi, '').toUpperCase().slice(0, 10);
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim().slice(0, 255);
}

export function sanitizeNumber(value: unknown, min?: number, max?: number): number | null {
  const num = typeof value === 'string' ? parseFloat(value) : typeof value === 'number' ? value : NaN;
  if (isNaN(num) || !isFinite(num)) return null;
  if (min !== undefined && num < min) return min;
  if (max !== undefined && num > max) return max;
  return num;
}

export function sanitizeInteger(value: unknown, min?: number, max?: number): number | null {
  const num = sanitizeNumber(value, min, max);
  if (num === null) return null;
  return Math.round(num);
}

export function escapeSQL(input: string): string {
  return input.replace(/['\\]/g, '\\$&');
}
