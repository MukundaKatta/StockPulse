import { useState, useEffect, useRef, useCallback, type RefObject } from 'react';

interface Size {
  width: number;
  height: number;
}

export function useResizeObserver<T extends HTMLElement>(): [RefObject<T | null>, Size] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    const entry = entries[0];
    if (entry) {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    }
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(handleResize);
    observer.observe(element);
    return () => observer.disconnect();
  }, [handleResize]);

  return [ref, size];
}
