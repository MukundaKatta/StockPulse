import { useState, useMemo, useCallback } from 'react';

interface UsePaginationOptions {
  totalItems: number;
  pageSize: number;
}

interface UsePaginationReturn<T = number> {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  next: () => void;
  prev: () => void;
  items: T[];
}

export function usePagination({ totalItems, pageSize }: UsePaginationOptions): UsePaginationReturn {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const [page, setPageRaw] = useState(1);

  const setPage = useCallback(
    (p: number) => {
      setPageRaw(Math.max(1, Math.min(p, totalPages)));
    },
    [totalPages]
  );

  const next = useCallback(() => {
    setPageRaw((p) => Math.min(p + 1, totalPages));
  }, [totalPages]);

  const prev = useCallback(() => {
    setPageRaw((p) => Math.max(p - 1, 1));
  }, []);

  const items = useMemo(() => {
    const start = (page - 1) * pageSize;
    return Array.from({ length: Math.min(pageSize, totalItems - start) }, (_, i) => start + i);
  }, [page, pageSize, totalItems]);

  return { page, totalPages, setPage, next, prev, items };
}
