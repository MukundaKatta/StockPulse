import { useState, useEffect } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const BREAKPOINTS: { name: Breakpoint; minWidth: number }[] = [
  { name: '2xl', minWidth: 1536 },
  { name: 'xl', minWidth: 1280 },
  { name: 'lg', minWidth: 1024 },
  { name: 'md', minWidth: 768 },
  { name: 'sm', minWidth: 0 },
];

function getCurrentBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'md';
  const width = window.innerWidth;
  for (const bp of BREAKPOINTS) {
    if (width >= bp.minWidth) return bp.name;
  }
  return 'sm';
}

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(getCurrentBreakpoint);

  useEffect(() => {
    const queries = BREAKPOINTS.map(({ name, minWidth }) => ({
      name,
      mql: window.matchMedia(`(min-width: ${minWidth}px)`),
    }));

    const handler = () => {
      setBreakpoint(getCurrentBreakpoint());
    };

    for (const { mql } of queries) {
      mql.addEventListener('change', handler);
    }
    return () => {
      for (const { mql } of queries) {
        mql.removeEventListener('change', handler);
      }
    };
  }, []);

  return breakpoint;
}
