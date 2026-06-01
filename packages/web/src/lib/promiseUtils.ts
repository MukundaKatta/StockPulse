/**
 * Promise utility functions for async flow control.
 */

/** Delay execution for a given number of milliseconds. */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Retry an async function up to `maxRetries` times with optional delay between attempts. */
export async function retry<T>(
  fn: () => Promise<T>,
  options: { maxRetries?: number; delayMs?: number } = {}
): Promise<T> {
  const { maxRetries = 3, delayMs = 0 } = options;
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries && delayMs > 0) {
        await delay(delayMs);
      }
    }
  }

  throw lastError;
}

/** Wrap a promise with a timeout. Rejects if the promise doesn't resolve in time. */
export function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timed out after ${ms}ms`));
    }, ms);

    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

/** Like Promise.allSettled but returns a typed result with separated values and errors. */
export async function allSettledWithErrors<T>(
  promises: Promise<T>[]
): Promise<{ values: T[]; errors: Error[] }> {
  const results = await Promise.allSettled(promises);
  const values: T[] = [];
  const errors: Error[] = [];

  for (const result of results) {
    if (result.status === 'fulfilled') {
      values.push(result.value);
    } else {
      errors.push(
        result.reason instanceof Error
          ? result.reason
          : new Error(String(result.reason))
      );
    }
  }

  return { values, errors };
}

/** Execute async functions sequentially, returning an array of results. */
export async function sequential<T>(
  fns: (() => Promise<T>)[]
): Promise<T[]> {
  const results: T[] = [];
  for (const fn of fns) {
    results.push(await fn());
  }
  return results;
}
