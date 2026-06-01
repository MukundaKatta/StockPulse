'use client';

import { useEffect, type DependencyList, type EffectCallback } from 'react';

export function useConditionalEffect(
  effect: EffectCallback,
  condition: boolean,
  deps?: DependencyList
): void {
  useEffect(() => {
    if (condition) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition, ...(deps ?? [])]);
}
