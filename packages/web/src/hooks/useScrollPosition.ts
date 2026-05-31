import { useState, useEffect } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'none';
  atTop: boolean;
  atBottom: boolean;
}

export function useScrollPosition(threshold = 0): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: 'none',
    atTop: true,
    atBottom: false,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const x = window.scrollX;
        const diff = y - lastY;
        const direction = Math.abs(diff) < threshold ? position.direction : diff > 0 ? 'down' : 'up';
        const atTop = y <= 0;
        const atBottom = y + window.innerHeight >= document.documentElement.scrollHeight - 1;
        lastY = y;
        setPosition({ x, y, direction: direction as ScrollPosition['direction'], atTop, atBottom });
        ticking = false;
      });
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);

  return position;
}
