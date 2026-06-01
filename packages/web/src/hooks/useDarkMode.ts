import { useState, useEffect } from 'react';

export function useDarkMode(defaultValue = false): [boolean, (value: boolean) => void] {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return defaultValue;
    const stored = localStorage.getItem('dark-mode');
    return stored !== null ? stored === 'true' : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem('dark-mode', String(dark));
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return [dark, setDark];
}
