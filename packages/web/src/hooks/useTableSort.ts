import { useState, useMemo, useCallback } from 'react';

type SortDirection = 'asc' | 'desc';

interface UseTableSortReturn<T> {
  sortKey: keyof T | null;
  sortDirection: SortDirection;
  toggleSort: (key: keyof T) => void;
  sortedItems: T[];
}

export function useTableSort<T extends Record<string, unknown>>(
  items: T[],
  defaultKey?: keyof T,
  defaultDirection: SortDirection = 'asc'
): UseTableSortReturn<T> {
  const [sortKey, setSortKey] = useState<keyof T | null>(defaultKey ?? null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(defaultDirection);

  const toggleSort = useCallback((key: keyof T) => {
    setSortKey((prevKey) => {
      if (prevKey === key) {
        setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortDirection('asc');
      }
      return key;
    });
  }, []);

  const sortedItems = useMemo(() => {
    if (sortKey === null) return items;
    return [...items].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDirection === 'asc' ? cmp : -cmp;
    });
  }, [items, sortKey, sortDirection]);

  return { sortKey, sortDirection, toggleSort, sortedItems };
}
