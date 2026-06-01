import { useState, useCallback } from 'react';

interface UseClampedValueReturn {
  value: number;
  set: (v: number) => void;
  increment: (step?: number) => void;
  decrement: (step?: number) => void;
  reset: () => void;
}

export function useClampedValue(initial: number, min: number, max: number): UseClampedValueReturn {
  const clamp = useCallback((v: number) => Math.min(max, Math.max(min, v)), [min, max]);
  const [value, setValue] = useState(() => clamp(initial));

  const set = useCallback((v: number) => setValue(clamp(v)), [clamp]);
  const increment = useCallback((step = 1) => setValue((prev) => clamp(prev + step)), [clamp]);
  const decrement = useCallback((step = 1) => setValue((prev) => clamp(prev - step)), [clamp]);
  const reset = useCallback(() => setValue(clamp(initial)), [clamp, initial]);

  return { value, set, increment, decrement, reset };
}
