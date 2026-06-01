'use client';

import { useCallback, type Ref } from 'react';

type PossibleRef<T> = Ref<T> | undefined | null;

function setRef<T>(ref: PossibleRef<T>, value: T): void {
  if (!ref) return;

  if (typeof ref === 'function') {
    ref(value);
  } else {
    (ref as { current: T }).current = value;
  }
}

export function useMergedRef<T>(...refs: PossibleRef<T>[]): (node: T | null) => void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback((node: T | null) => {
    refs.forEach((ref) => setRef(ref, node as T));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
