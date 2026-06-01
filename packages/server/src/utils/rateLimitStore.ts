interface WindowEntry {
  timestamps: number[];
}

export class RateLimitStore {
  private store = new Map<string, WindowEntry>();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  check(key: string): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry) {
      return { allowed: true, remaining: this.maxRequests, resetIn: this.windowMs };
    }

    const validTimestamps = entry.timestamps.filter((t) => now - t < this.windowMs);
    entry.timestamps = validTimestamps;

    const remaining = Math.max(0, this.maxRequests - validTimestamps.length);
    const oldestValid = validTimestamps[0];
    const resetIn = oldestValid ? this.windowMs - (now - oldestValid) : this.windowMs;

    return {
      allowed: validTimestamps.length < this.maxRequests,
      remaining,
      resetIn,
    };
  }

  increment(key: string): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry) {
      this.store.set(key, { timestamps: [now] });
      return { allowed: true, remaining: this.maxRequests - 1, resetIn: this.windowMs };
    }

    const validTimestamps = entry.timestamps.filter((t) => now - t < this.windowMs);

    if (validTimestamps.length >= this.maxRequests) {
      entry.timestamps = validTimestamps;
      const oldestValid = validTimestamps[0];
      const resetIn = oldestValid ? this.windowMs - (now - oldestValid) : this.windowMs;
      return { allowed: false, remaining: 0, resetIn };
    }

    validTimestamps.push(now);
    entry.timestamps = validTimestamps;
    const remaining = this.maxRequests - validTimestamps.length;
    const oldestValid = validTimestamps[0];
    const resetIn = oldestValid ? this.windowMs - (now - oldestValid) : this.windowMs;

    return { allowed: true, remaining, resetIn };
  }

  reset(key: string): void {
    this.store.delete(key);
  }

  cleanup(): number {
    const now = Date.now();
    let removed = 0;
    for (const [key, entry] of this.store) {
      const valid = entry.timestamps.filter((t) => now - t < this.windowMs);
      if (valid.length === 0) {
        this.store.delete(key);
        removed++;
      } else {
        entry.timestamps = valid;
      }
    }
    return removed;
  }
}
