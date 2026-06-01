import { useState, useEffect } from 'react';

interface Orientation {
  angle: number;
  type: string;
}

export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(() => {
    if (typeof screen === 'undefined' || !screen.orientation) return { angle: 0, type: 'landscape-primary' };
    return { angle: screen.orientation.angle, type: screen.orientation.type };
  });

  useEffect(() => {
    const handler = () => {
      if (screen.orientation) {
        setOrientation({ angle: screen.orientation.angle, type: screen.orientation.type });
      }
    };
    screen.orientation?.addEventListener('change', handler);
    return () => screen.orientation?.removeEventListener('change', handler);
  }, []);

  return orientation;
}
