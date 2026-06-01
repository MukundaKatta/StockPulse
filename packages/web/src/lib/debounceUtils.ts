export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = ((...args: unknown[]) => {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = undefined;
    }, delay);
  }) as T & { cancel: () => void };

  debounced.cancel = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  return debounced;
}

export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  interval: number
): T & { cancel: () => void } {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const throttled = ((...args: unknown[]) => {
    const now = Date.now();
    const remaining = interval - (now - lastCall);

    if (remaining <= 0) {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
      lastCall = now;
      fn(...args);
    } else if (timeoutId === undefined) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = undefined;
        fn(...args);
      }, remaining);
    }
  }) as T & { cancel: () => void };

  throttled.cancel = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  return throttled;
}

export function rafThrottle<T extends (...args: unknown[]) => void>(fn: T): T & { cancel: () => void } {
  let rafId: number | undefined;
  let lastArgs: unknown[] | undefined;

  const throttled = ((...args: unknown[]) => {
    lastArgs = args;
    if (rafId === undefined) {
      rafId = requestAnimationFrame(() => {
        rafId = undefined;
        if (lastArgs) {
          fn(...lastArgs);
        }
      });
    }
  }) as T & { cancel: () => void };

  throttled.cancel = () => {
    if (rafId !== undefined) {
      cancelAnimationFrame(rafId);
      rafId = undefined;
    }
  };

  return throttled;
}

export function debounceAsync<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let pendingReject: ((reason: unknown) => void) | undefined;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      if (pendingReject) {
        pendingReject(new Error('Debounced'));
        pendingReject = undefined;
      }
    }

    return new Promise<ReturnType<T>>((resolve, reject) => {
      pendingReject = reject;
      timeoutId = setTimeout(async () => {
        timeoutId = undefined;
        pendingReject = undefined;
        try {
          const result = await fn(...args);
          resolve(result as ReturnType<T>);
        } catch (err) {
          reject(err);
        }
      }, delay);
    });
  };
}
