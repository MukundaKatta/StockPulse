import { redis } from '../config/redis';

const TTL = {
  INTRADAY_PRICE: 60,
  DAILY_PRICE: 900,       // 15 minutes
  INDICATORS: 300,         // 5 minutes
  FUNDAMENTALS: 86400,     // 24 hours
  COMPANY_PROFILE: 604800, // 7 days
  NEWS: 900,               // 15 minutes
} as const;

export type CacheCategory = keyof typeof TTL;

function buildKey(category: string, symbol: string, extra?: string): string {
  const base = `sp:${category.toLowerCase()}:${symbol.toUpperCase()}`;
  return extra ? `${base}:${extra}` : base;
}

export async function getCached<T>(category: CacheCategory, symbol: string, extra?: string): Promise<T | null> {
  const key = buildKey(category, symbol, extra);
  const data = await redis.get(key);
  if (!data) return null;
  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

export async function setCache<T>(category: CacheCategory, symbol: string, data: T, extra?: string): Promise<void> {
  const key = buildKey(category, symbol, extra);
  const ttl = TTL[category];
  await redis.setex(key, ttl, JSON.stringify(data));
}

export async function invalidateCache(category: CacheCategory, symbol: string, extra?: string): Promise<void> {
  const key = buildKey(category, symbol, extra);
  await redis.del(key);
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
