'use client';

import { useRef, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const eventCallback = useCallback(
    ((...args: Parameters<T>) => fnRef.current(...args)) as T,
    []
  );

  return eventCallback;
}
