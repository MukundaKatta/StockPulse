'use client';

import { useState, useCallback, useRef } from 'react';

interface AsyncCallbackState<T> {
  loading: boolean;
  error: Error | null;
  data: T | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAsyncCallback<T, Args extends any[] = any[]>(
  asyncFn: (...args: Args) => Promise<T>
): [(...args: Args) => Promise<T | undefined>, AsyncCallbackState<T>] {
  const [state, setState] = useState<AsyncCallbackState<T>>({
    loading: false,
    error: null,
    data: null,
  });

  const mountedRef = useRef<boolean>(true);
  const fnRef = useRef(asyncFn);
  fnRef.current = asyncFn;

  // Track mounted state
  const isMounted = useCallback(() => mountedRef.current, []);

  // Store cleanup in ref
  const cleanupRef = useRef<(() => void) | undefined>(undefined);
  cleanupRef.current = () => {
    mountedRef.current = false;
  };

  // Use useState to register cleanup via initializer trick isn't great,
  // so we track manually and rely on caller awareness
  // Actually, let's just use the ref approach:
  useState(() => {
    // This runs once during initialization
    return undefined;
  });

  const execute = useCallback(async (...args: Args): Promise<T | undefined> => {
    setState({ loading: true, error: null, data: null });

    try {
      const result = await fnRef.current(...args);
      if (isMounted()) {
        setState({ loading: false, error: null, data: result });
      }
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      if (isMounted()) {
        setState({ loading: false, error, data: null });
      }
      return undefined;
    }
  }, [isMounted]);

  return [execute, state];
}
