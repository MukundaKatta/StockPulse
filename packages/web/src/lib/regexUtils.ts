/**
 * Regex-based validation utility functions.
 */

/** Check if a string is a valid email address. */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Check if a string is a valid URL. */
export function isUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/** Check if a string is a valid phone number (international format supported). */
export function isPhoneNumber(value: string): boolean {
  return /^\+?[\d\s\-().]{7,15}$/.test(value);
}

/** Check if a string is a valid hex color (3, 4, 6, or 8 digit). */
export function isHexColor(value: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(
    value
  );
}

/** Check if a string is a valid stock ticker symbol (1-5 uppercase letters). */
export function isTicker(value: string): boolean {
  return /^[A-Z]{1,5}$/.test(value);
}

/** Escape special regex characters in a string. */
export function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
