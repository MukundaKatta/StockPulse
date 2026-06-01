import { useState, useMemo } from 'react';

interface UseSearchFilterReturn<T> {
  query: string;
  setQuery: (query: string) => void;
  filtered: T[];
}

export function useSearchFilter<T>(items: T[], key: keyof T): UseSearchFilterReturn<T> {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter((item) => {
      const value = item[key];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerQuery);
      }
      return String(value).toLowerCase().includes(lowerQuery);
    });
  }, [items, key, query]);

  return { query, setQuery, filtered };
}
