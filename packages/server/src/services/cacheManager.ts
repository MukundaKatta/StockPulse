import { redis } from '../config/redis';

const TTL = {
  INTRADAY_PRICE: 60,
  DAILY_PRICE: 900,
  INDICATORS: 300,
  FUNDAMENTALS: 86400,
  COMPANY_PROFILE: 604800,
  NEWS: 900,
} as const;

export type CacheCategory = keyof typeof TTL;

function buildKey(category: string, symbol: string, extra?: string): string {
  const sanitized = symbol.replace(/[^A-Z0-9.]/gi, '').toUpperCase();
  const base = `sp:${category.toLowerCase()}:${sanitized}`;
  return extra ? `${base}:${extra}` : base;
}

export async function getCached<T>(category: CacheCategory, symbol: string, extra?: string): Promise<T | null> {
  try {
    const key = buildKey(category, symbol, extra);
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  } catch (err) {
    console.warn(`Cache read error for ${category}:${symbol}:`, (err as Error).message);
    return null;
  }
}

export async function setCache<T>(category: CacheCategory, symbol: string, data: T, extra?: string, ttlOverride?: number): Promise<void> {
  try {
    const key = buildKey(category, symbol, extra);
    const ttl = ttlOverride ?? TTL[category];
    await redis.setex(key, ttl, JSON.stringify(data));
  } catch (err) {
    console.warn(`Cache write error for ${category}:${symbol}:`, (err as Error).message);
  }
}

export async function invalidateCache(category: CacheCategory, symbol: string, extra?: string): Promise<void> {
  try {
    const key = buildKey(category, symbol, extra);
    await redis.del(key);
  } catch (err) {
    console.warn(`Cache invalidation error:`, (err as Error).message);
  }
}

export async function getCacheStats(): Promise<{ keys: number; memory: string }> {
  const info = await redis.info('memory');
  const memMatch = info.match(/used_memory_human:(.+)/);
  const dbSize = await redis.dbsize();
  return {
    keys: dbSize,
    memory: memMatch ? memMatch[1].trim() : 'unknown',
  };
}
