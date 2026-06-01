import { useState, useCallback } from 'react';

interface CounterActions {
  increment: () => void;
  decrement: () => void;
  set: (value: number) => void;
  reset: () => void;
}

export function useCounter(initial = 0, { min, max, step = 1 }: { min?: number; max?: number; step?: number } = {}): [number, CounterActions] {
  const [count, setCount] = useState(initial);

  const clamp = useCallback((v: number) => {
    if (min !== undefined && v < min) return min;
    if (max !== undefined && v > max) return max;
    return v;
  }, [min, max]);

  const increment = useCallback(() => setCount((c) => clamp(c + step)), [clamp, step]);
  const decrement = useCallback(() => setCount((c) => clamp(c - step)), [clamp, step]);
  const set = useCallback((v: number) => setCount(clamp(v)), [clamp]);
  const reset = useCallback(() => setCount(initial), [initial]);

  return [count, { increment, decrement, set, reset }];
}
