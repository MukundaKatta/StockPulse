/**
 * Text manipulation utility functions.
 */

/** Truncate a string to a maximum length, appending an ellipsis if truncated. */
export function truncate(
  text: string,
  maxLength: number,
  suffix: string = '...'
): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/** Capitalize the first letter of a string. */
export function capitalize(text: string): string {
  if (text.length === 0) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Convert a string to a URL-friendly slug. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Convert camelCase to kebab-case. */
export function camelToKebab(text: string): string {
  return text
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/** Convert kebab-case to camelCase. */
export function kebabToCamel(text: string): string {
  return text.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

/** Simple pluralization: add 's' or use a custom plural form. */
export function pluralize(
  count: number,
  singular: string,
  plural?: string
): string {
  if (count === 1) return singular;
  return plural ?? `${singular}s`;
}

/** Highlight matching portions of text by wrapping them in a delimiter. */
export function highlightMatch(
  text: string,
  query: string,
  options: { open?: string; close?: string } = {}
): string {
  if (!query) return text;
  const { open = '<mark>', close = '</mark>' } = options;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.replace(regex, `${open}$1${close}`);
}
