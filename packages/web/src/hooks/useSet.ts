import { useState, useCallback } from 'react';

export function useSet<T>(initialValues?: Iterable<T>) {
  const [set, setSet] = useState(() => new Set<T>(initialValues));

  const add = useCallback((value: T) => {
    setSet((prev) => {
      const next = new Set(prev);
      next.add(value);
      return next;
    });
  }, []);

  const remove = useCallback((value: T) => {
    setSet((prev) => {
      const next = new Set(prev);
      next.delete(value);
      return next;
    });
  }, []);

  const toggle = useCallback((value: T) => {
    setSet((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setSet(new Set());
  }, []);

  const has = useCallback((value: T) => set.has(value), [set]);

  return { set, add, remove, toggle, clear, has, size: set.size, values: [...set] };
}
