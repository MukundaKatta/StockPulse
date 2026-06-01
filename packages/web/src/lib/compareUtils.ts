/**
 * Comparison and equality utility functions.
 */

/** Deep equality check for two values. */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== typeof b) return false;

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEqual(item, b[index]));
  }

  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a as Record<string, unknown>);
    const keysB = Object.keys(b as Record<string, unknown>);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((key) =>
      deepEqual(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key]
      )
    );
  }

  return false;
}

/** Shallow equality check for two objects (compares own properties by reference). */
export function shallowEqual(
  a: Record<string, unknown>,
  b: Record<string, unknown>
): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((key) => a[key] === b[key]);
}

export type SortDirection = 'asc' | 'desc';

/** Create a comparator function for sorting by a key. */
export function createComparator<T>(
  keyFn: (item: T) => string | number,
  direction: SortDirection = 'asc'
): (a: T, b: T) => number {
  return (a: T, b: T): number => {
    const valA = keyFn(a);
    const valB = keyFn(b);

    let result: number;
    if (typeof valA === 'string' && typeof valB === 'string') {
      result = valA.localeCompare(valB);
    } else {
      result = (valA as number) - (valB as number);
    }

    return direction === 'desc' ? -result : result;
  };
}

export interface SortCriteria<T> {
  key: (item: T) => string | number;
  direction?: SortDirection;
}

/** Sort an array by multiple criteria. */
export function sortByMultiple<T>(
  items: T[],
  criteria: SortCriteria<T>[]
): T[] {
  return [...items].sort((a, b) => {
    for (const { key, direction = 'asc' } of criteria) {
      const valA = key(a);
      const valB = key(b);

      let result: number;
      if (typeof valA === 'string' && typeof valB === 'string') {
        result = valA.localeCompare(valB);
      } else {
        result = (valA as number) - (valB as number);
      }

      if (result !== 0) {
        return direction === 'desc' ? -result : result;
      }
    }
    return 0;
  });
}
