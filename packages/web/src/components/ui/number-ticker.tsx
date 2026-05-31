'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/formatters';

interface NumberTickerProps {
  value: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
}

export function NumberTicker({ value, format, duration = 500, className }: NumberTickerProps) {
  const [display, setDisplay] = useState(value);
  const prevValue = useRef(value);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const start = prevValue.current;
    const diff = value - start;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + diff * eased);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        prevValue.current = value;
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value, duration]);

  return (
    <span className={cn('tabular-nums', className)}>
      {format ? format(display) : display.toFixed(2)}
    </span>
  );
}
