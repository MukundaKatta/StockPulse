/**
 * Object utility functions for safe manipulation and transformation.
 */

/** Pick specific keys from an object. */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/** Omit specific keys from an object. */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}

/** Deep merge two objects, with source values overriding target. */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target } as Record<string, unknown>;

  for (const key of Object.keys(source)) {
    const sourceVal = (source as Record<string, unknown>)[key];
    const targetVal = result[key];

    if (
      isPlainObject(sourceVal) &&
      isPlainObject(targetVal)
    ) {
      result[key] = deepMerge(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>
      );
    } else {
      result[key] = sourceVal;
    }
  }

  return result as T;
}

/** Map over the values of an object, preserving keys. */
export function mapValues<T extends Record<string, unknown>, U>(
  obj: T,
  fn: (value: T[keyof T], key: string) => U
): Record<keyof T, U> {
  const result = {} as Record<keyof T, U>;
  for (const [key, value] of Object.entries(obj)) {
    result[key as keyof T] = fn(value as T[keyof T], key);
  }
  return result;
}

/** Filter entries of an object by a predicate. */
export function filterEntries<T extends Record<string, unknown>>(
  obj: T,
  predicate: (key: string, value: unknown) => boolean
): Partial<T> {
  const result = {} as Partial<T>;
  for (const [key, value] of Object.entries(obj)) {
    if (predicate(key, value)) {
      (result as Record<string, unknown>)[key] = value;
    }
  }
  return result;
}

/** Deep clone an object using structured cloning semantics. */
export function deepClone<T>(value: T): T {
  if (value === null || typeof value !== 'object') return value;
  if (value instanceof Date) return new Date(value.getTime()) as T;
  if (Array.isArray(value)) return value.map((item) => deepClone(item)) as T;

  const result = {} as Record<string, unknown>;
  for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
    result[key] = deepClone(val);
  }
  return result as T;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
