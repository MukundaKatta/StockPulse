/**
 * Memoization utility functions with various caching strategies.
 */

/** Memoize a function using a simple Map cache. */
export function memoize<Args extends unknown[], R>(
  fn: (...args: Args) => R,
  keyFn?: (...args: Args) => string
): (...args: Args) => R {
  const cache = new Map<string, R>();
  const getKey = keyFn ?? ((...args: Args) => JSON.stringify(args));

  return (...args: Args): R => {
    const key = getKey(...args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

/** Memoize an async function. */
export function memoizeAsync<Args extends unknown[], R>(
  fn: (...args: Args) => Promise<R>,
  keyFn?: (...args: Args) => string
): (...args: Args) => Promise<R> {
  const cache = new Map<string, Promise<R>>();
  const getKey = keyFn ?? ((...args: Args) => JSON.stringify(args));

  return (...args: Args): Promise<R> => {
    const key = getKey(...args);
    if (cache.has(key)) return cache.get(key)!;
    const promise = fn(...args).catch((error) => {
      cache.delete(key);
      throw error;
    });
    cache.set(key, promise);
    return promise;
  };
}

export interface CacheOptions {
  ttlMs: number;
  maxSize?: number;
}

export interface Cache<K, V> {
  get(key: K): V | undefined;
  set(key: K, value: V): void;
  has(key: K): boolean;
  delete(key: K): boolean;
  clear(): void;
  size: number;
}

/** Create a cache with TTL (time-to-live) support and optional max size. */
export function createCache<K, V>(options: CacheOptions): Cache<K, V> {
  const store = new Map<K, { value: V; expiresAt: number }>();
  const { ttlMs, maxSize } = options;

  function evictExpired(): void {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (entry.expiresAt <= now) {
        store.delete(key);
      }
    }
  }

  return {
    get(key: K): V | undefined {
      const entry = store.get(key);
      if (!entry) return undefined;
      if (entry.expiresAt <= Date.now()) {
        store.delete(key);
        return undefined;
      }
      return entry.value;
    },

    set(key: K, value: V): void {
      if (maxSize && store.size >= maxSize) {
        evictExpired();
        if (store.size >= maxSize) {
          const firstKey = store.keys().next().value;
          if (firstKey !== undefined) store.delete(firstKey);
        }
      }
      store.set(key, { value, expiresAt: Date.now() + ttlMs });
    },

    has(key: K): boolean {
      const entry = store.get(key);
      if (!entry) return false;
      if (entry.expiresAt <= Date.now()) {
        store.delete(key);
        return false;
      }
      return true;
    },

    delete(key: K): boolean {
      return store.delete(key);
    },

    clear(): void {
      store.clear();
    },

    get size(): number {
      evictExpired();
      return store.size;
    },
  };
}

/** Memoize a function using WeakMap (keys must be objects). */
export function weakMemoize<K extends object, R>(
  fn: (key: K) => R
): (key: K) => R {
  const cache = new WeakMap<K, R>();
  return (key: K): R => {
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(key);
    cache.set(key, result);
    return result;
  };
}
