import { useState, useEffect } from 'react';

export function useScrollLock(initialLocked = false): [boolean, (locked: boolean) => void] {
  const [locked, setLocked] = useState(initialLocked);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const originalOverflow = document.body.style.overflow;

    if (locked) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [locked]);

  return [locked, setLocked];
}
