'use client';

import { useRef, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useStableCallback<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef<T>(callback);
  callbackRef.current = callback;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableCallback = useCallback(
    ((...args: Parameters<T>) => callbackRef.current(...args)) as T,
    []
  );

  return stableCallback;
}
