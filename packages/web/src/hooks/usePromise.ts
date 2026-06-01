'use client';

import { useState, useEffect, useRef } from 'react';

interface PromiseState<T> {
  pending: boolean;
  value: T | null;
  error: Error | null;
}

export function usePromise<T>(promise: Promise<T> | null | undefined): PromiseState<T> {
  const [state, setState] = useState<PromiseState<T>>({
    pending: !!promise,
    value: null,
    error: null,
  });

  const mountedRef = useRef<boolean>(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!promise) {
      setState({ pending: false, value: null, error: null });
      return;
    }

    setState({ pending: true, value: null, error: null });

    promise
      .then((value) => {
        if (mountedRef.current) {
          setState({ pending: false, value, error: null });
        }
      })
      .catch((err) => {
        if (mountedRef.current) {
          const error = err instanceof Error ? err : new Error(String(err));
          setState({ pending: false, value: null, error });
        }
      });
  }, [promise]);

  return state;
}
