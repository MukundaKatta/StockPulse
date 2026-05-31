interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export class SlidingWindowRateLimiter {
  private windows = new Map<string, RateLimitEntry>();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  attempt(key: string): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    const entry = this.windows.get(key);

    if (!entry || now > entry.resetAt) {
      this.windows.set(key, { count: 1, resetAt: now + this.windowMs });
      return { allowed: true, remaining: this.maxRequests - 1, resetIn: this.windowMs };
    }

    if (entry.count >= this.maxRequests) {
      return { allowed: false, remaining: 0, resetIn: entry.resetAt - now };
    }

    entry.count++;
    return { allowed: true, remaining: this.maxRequests - entry.count, resetIn: entry.resetAt - now };
  }

  reset(key: string): void {
    this.windows.delete(key);
  }

  cleanup(): number {
    const now = Date.now();
    let removed = 0;
    for (const [key, entry] of this.windows) {
      if (now > entry.resetAt) {
        this.windows.delete(key);
        removed++;
      }
    }
    return removed;
  }
}

export const apiLimiter = new SlidingWindowRateLimiter(100, 60 * 1000);
export const authLimiter = new SlidingWindowRateLimiter(5, 15 * 60 * 1000);
export const wsLimiter = new SlidingWindowRateLimiter(30, 1000);
