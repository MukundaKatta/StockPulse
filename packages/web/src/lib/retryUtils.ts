/**
 * Retry utility functions with configurable backoff strategies.
 */

export interface RetryPolicy {
  maxRetries: number;
  baseDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
  jitter: boolean;
  retryableErrors?: (error: unknown) => boolean;
}

const DEFAULT_POLICY: RetryPolicy = {
  maxRetries: 3,
  baseDelayMs: 1000,
  maxDelayMs: 30000,
  backoffMultiplier: 2,
  jitter: false,
};

/** Retry an async function with exponential backoff. */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: Partial<RetryPolicy> = {}
): Promise<T> {
  const policy = { ...DEFAULT_POLICY, ...options };
  let lastError: unknown;

  for (let attempt = 0; attempt <= policy.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (policy.retryableErrors && !policy.retryableErrors(error)) {
        throw error;
      }

      if (attempt < policy.maxRetries) {
        const delay = Math.min(
          policy.baseDelayMs * Math.pow(policy.backoffMultiplier, attempt),
          policy.maxDelayMs
        );
        await sleep(delay);
      }
    }
  }

  throw lastError;
}

/** Retry an async function with exponential backoff and jitter. */
export async function retryWithJitter<T>(
  fn: () => Promise<T>,
  options: Partial<Omit<RetryPolicy, 'jitter'>> = {}
): Promise<T> {
  const policy = { ...DEFAULT_POLICY, ...options, jitter: true };
  let lastError: unknown;

  for (let attempt = 0; attempt <= policy.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (policy.retryableErrors && !policy.retryableErrors(error)) {
        throw error;
      }

      if (attempt < policy.maxRetries) {
        const baseDelay = Math.min(
          policy.baseDelayMs * Math.pow(policy.backoffMultiplier, attempt),
          policy.maxDelayMs
        );
        const jitteredDelay = baseDelay * (0.5 + Math.random() * 0.5);
        await sleep(jitteredDelay);
      }
    }
  }

  throw lastError;
}

/** Check if an error is retryable based on common HTTP status codes. */
export function isRetryable(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    if (message.includes('timeout') || message.includes('network')) return true;
  }

  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = (error as { status: number }).status;
    return status === 429 || status >= 500;
  }

  return false;
}

/** Create a reusable retry policy object. */
export function createRetryPolicy(
  overrides: Partial<RetryPolicy> = {}
): RetryPolicy {
  return { ...DEFAULT_POLICY, ...overrides };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
