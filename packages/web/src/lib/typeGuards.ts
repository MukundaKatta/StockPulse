/**
 * Runtime type guard utility functions for safe type narrowing.
 */

/** Check if a value is a string. */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/** Check if a value is a number (and not NaN). */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

/** Check if a value is an array. */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/** Check if a value is a plain object (not null, not array). */
export function isObject(
  value: unknown
): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Check if a value is null or undefined. */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/** Check if a value is defined (not null and not undefined). */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/** Check if a value is a function. */
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

/** Assert that a code path is unreachable (exhaustive check helper). */
export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}
