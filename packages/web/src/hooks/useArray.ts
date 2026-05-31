import { useState, useCallback } from 'react';

export function useArray<T>(initial: T[] = []) {
  const [array, setArray] = useState<T[]>(initial);

  const push = useCallback((item: T) => {
    setArray((prev) => [...prev, item]);
  }, []);

  const removeAt = useCallback((index: number) => {
    setArray((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateAt = useCallback((index: number, item: T) => {
    setArray((prev) => prev.map((v, i) => (i === index ? item : v)));
  }, []);

  const filter = useCallback((predicate: (item: T, index: number) => boolean) => {
    setArray((prev) => prev.filter(predicate));
  }, []);

  const clear = useCallback(() => setArray([]), []);

  const move = useCallback((from: number, to: number) => {
    setArray((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }, []);

  return { array, set: setArray, push, removeAt, updateAt, filter, clear, move, length: array.length };
}
