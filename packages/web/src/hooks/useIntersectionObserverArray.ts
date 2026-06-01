import { useState, useEffect, useRef, useCallback } from 'react';

interface UseIntersectionObserverArrayOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export function useIntersectionObserverArray(
  options: UseIntersectionObserverArrayOptions = {}
): {
  observe: (element: Element) => void;
  unobserve: (element: Element) => void;
  entries: Map<Element, boolean>;
} {
  const [entries, setEntries] = useState<Map<Element, boolean>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Set<Element>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver((observedEntries) => {
      setEntries((prev) => {
        const next = new Map(prev);
        for (const entry of observedEntries) {
          next.set(entry.target, entry.isIntersecting);
        }
        return next;
      });
    }, {
      root: options.root,
      rootMargin: options.rootMargin,
      threshold: options.threshold,
    });

    observerRef.current = observer;

    for (const el of elementsRef.current) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [options.root, options.rootMargin, options.threshold]);

  const observe = useCallback((element: Element) => {
    elementsRef.current.add(element);
    observerRef.current?.observe(element);
  }, []);

  const unobserve = useCallback((element: Element) => {
    elementsRef.current.delete(element);
    observerRef.current?.unobserve(element);
    setEntries((prev) => {
      const next = new Map(prev);
      next.delete(element);
      return next;
    });
  }, []);

  return { observe, unobserve, entries };
}
