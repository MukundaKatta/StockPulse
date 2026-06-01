'use client';

import { useEffect, useRef, type DependencyList, type EffectCallback } from 'react';

function useDeepCompareMemoize(deps: DependencyList): DependencyList {
  const ref = useRef<DependencyList>(deps);
  const signalRef = useRef<number>(0);

  const serialized = JSON.stringify(deps);
  const prevSerialized = JSON.stringify(ref.current);

  if (serialized !== prevSerialized) {
    ref.current = deps;
    signalRef.current += 1;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return [signalRef.current];
}

export function useDeepCompareEffect(effect: EffectCallback, deps: DependencyList): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, useDeepCompareMemoize(deps));
}
