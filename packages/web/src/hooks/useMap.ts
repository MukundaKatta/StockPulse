import { useState, useCallback } from 'react';

export function useMap<K, V>(initialEntries?: Iterable<[K, V]>) {
  const [map, setMap] = useState(() => new Map<K, V>(initialEntries));

  const set = useCallback((key: K, value: V) => {
    setMap((prev) => {
      const next = new Map(prev);
      next.set(key, value);
      return next;
    });
  }, []);

  const remove = useCallback((key: K) => {
    setMap((prev) => {
      const next = new Map(prev);
      next.delete(key);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setMap(new Map());
  }, []);

  const has = useCallback((key: K) => map.has(key), [map]);
  const get = useCallback((key: K) => map.get(key), [map]);

  return { map, set, get, has, remove, clear, size: map.size, entries: [...map.entries()] };
}
