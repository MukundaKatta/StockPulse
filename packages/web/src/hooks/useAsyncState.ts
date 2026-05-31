'use client';

import { useCallback, useRef, useState } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsyncState<T>() {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: false, error: null });
  const mountedRef = useRef(true);

  const execute = useCallback(async (asyncFn: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null });
    try {
      const result = await asyncFn();
      if (mountedRef.current) {
        setState({ data: result, loading: false, error: null });
      }
      return result;
    } catch (err) {
      if (mountedRef.current) {
        setState({ data: null, loading: false, error: err instanceof Error ? err : new Error(String(err)) });
      }
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}
