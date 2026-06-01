'use client';

import { useState, useRef, useCallback, useEffect, type Dispatch, type SetStateAction } from 'react';

export function useRafState<T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(initialState);
  const rafRef = useRef<number | undefined>(undefined);
  const mountedRef = useRef<boolean>(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const setRafState: Dispatch<SetStateAction<T>> = useCallback((value) => {
    if (rafRef.current !== undefined) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (mountedRef.current) {
        setState(value);
      }
    });
  }, []);

  return [state, setRafState];
}
