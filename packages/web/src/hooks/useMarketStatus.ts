'use client';

import { useState, useEffect } from 'react';

export type MarketPhase = 'pre-market' | 'open' | 'after-hours' | 'closed';

interface MarketStatus {
  phase: MarketPhase;
  label: string;
  color: string;
  nextEvent: string;
}

function getETTime(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
}

export function useMarketStatus(): MarketStatus {
  const [status, setStatus] = useState<MarketStatus>(computeStatus);

  useEffect(() => {
    const interval = setInterval(() => setStatus(computeStatus()), 30000);
    return () => clearInterval(interval);
  }, []);

  return status;
}

function computeStatus(): MarketStatus {
  const et = getETTime();
  const day = et.getDay();
  const hour = et.getHours();
  const minute = et.getMinutes();
  const time = hour * 60 + minute;

  if (day === 0 || day === 6) {
    return { phase: 'closed', label: 'Weekend', color: 'text-gray-500', nextEvent: 'Opens Monday 9:30 AM ET' };
  }

  if (time < 4 * 60) {
    return { phase: 'closed', label: 'Closed', color: 'text-gray-500', nextEvent: 'Pre-market at 4:00 AM ET' };
  }

  if (time < 9 * 60 + 30) {
    return { phase: 'pre-market', label: 'Pre-Market', color: 'text-amber-400', nextEvent: 'Opens at 9:30 AM ET' };
  }

  if (time < 16 * 60) {
    return { phase: 'open', label: 'Market Open', color: 'text-green-400', nextEvent: 'Closes at 4:00 PM ET' };
  }

  if (time < 20 * 60) {
    return { phase: 'after-hours', label: 'After Hours', color: 'text-blue-400', nextEvent: 'Closes at 8:00 PM ET' };
  }

  return { phase: 'closed', label: 'Closed', color: 'text-gray-500', nextEvent: 'Pre-market at 4:00 AM ET' };
}
