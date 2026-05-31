'use client';

import { useCallback, useState } from 'react';

interface UseQueueReturn<T> {
  queue: T[];
  enqueue: (item: T) => void;
  dequeue: () => T | undefined;
  peek: () => T | undefined;
  clear: () => void;
  size: number;
  isEmpty: boolean;
}

export function useQueue<T>(initialItems: T[] = []): UseQueueReturn<T> {
  const [queue, setQueue] = useState<T[]>(initialItems);

  const enqueue = useCallback((item: T) => {
    setQueue((q) => [...q, item]);
  }, []);

  const dequeue = useCallback(() => {
    let removed: T | undefined;
    setQueue((q) => {
      if (q.length === 0) return q;
      removed = q[0];
      return q.slice(1);
    });
    return removed;
  }, []);

  const peek = useCallback(() => queue[0], [queue]);

  const clear = useCallback(() => setQueue([]), []);

  return {
    queue,
    enqueue,
    dequeue,
    peek,
    clear,
    size: queue.length,
    isEmpty: queue.length === 0,
  };
}
