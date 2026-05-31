'use client';

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(options: UseIntersectionOptions = {}) {
  const { threshold = 0, rootMargin = '0px', root = null, freezeOnceVisible = false } = options;
  const ref = useRef<HTMLElement>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const frozen = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || frozen.current) return;

    const observer = new IntersectionObserver(
      ([e]) => {
        setEntry(e);
        if (freezeOnceVisible && e.isIntersecting) {
          frozen.current = true;
          observer.disconnect();
        }
      },
      { threshold, rootMargin, root }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, root, freezeOnceVisible]);

  return { ref, entry, isVisible: entry?.isIntersecting ?? false };
}
