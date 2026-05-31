import { useState, useEffect, useCallback, useRef } from 'react';

interface FetchState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

interface UseFetchResult<T> extends FetchState<T> {
  refetch: () => void;
}

export function useFetch<T>(url: string | null, options?: RequestInit): UseFetchResult<T> {
  const [state, setState] = useState<FetchState<T>>({ data: null, error: null, loading: !!url });
  const abortRef = useRef<AbortController>(undefined);

  const fetchData = useCallback(async () => {
    if (!url) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!controller.signal.aborted) {
        setState({ data, error: null, loading: false });
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setState({ data: null, error: err.message, loading: false });
      }
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
    return () => abortRef.current?.abort();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
